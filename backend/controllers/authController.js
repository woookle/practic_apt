import User from "../models/User.js";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config/config.js";
import {
  startRegistration,
  completeRegistration,
} from "../services/authService.js";

class AuthController {
  // НАЧАЛО РЕГИСТРАЦИИ
  static startRegistrationHandler = async (req, res) => {
    const { email } = req.body;

    try {
      await startRegistration(email);
      res.status(200).json({
        message: "Отлично! Код подтверждения отправлен на вашу почту.",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // КОНЕЦ РЕГИСТРАЦИИ ( С УЧЕТОМ ВАЛИДАЦИИ ПОЧТЫ )
  static completeRegistrationHandler = async (req, res) => {
    const { email, username, code, role, password } = req.body;
    const hashed_password = await bcrypt.hash(password, 10);
    try {
      const user = await completeRegistration(
        email,
        username,
        code,
        hashed_password,
        role
      );
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        config.jwtSecret,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ user, message: "Вы успешно зарегистрированы!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // ЛОГИРОВАНИЕ
  static login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json({ message: "Заполните обе строки!" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res
          .status(401)
          .json({ message: "Неправильный логин или пароль!" });
      }

      if (user.is2FAEnabled) {
        return res.status(200).json({
          is2FA: true,
          message: "Отлично! Пожалуйста, введите код из Google Authenticator",
        });
      }

      const token = jwt.sign(
        { _id: user._id, email: user.email },
        config.jwtSecret,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, { httpOnly: true });
      return res.status(200).json({ user, message: "Вход успешно выполнен!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка при входе!" });
    }
  };

  // ВКЛЮЧИТЬ 2FA ВАЛИДАЦИЮ
  static enable2FA = async (req, res) => {
    const id = req.user._id;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send("Пользователь не найден");
      }

      const secret = speakeasy.generateSecret({
        name: `${config.email_company_name} (${user.email})`,
      });
      user.secret = secret.base32;
      user.is2FAEnabled = true;
      await user.save();

      QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Ошибка при генерации QR-кода" });
        }
        return res.status(200).json({
          message:
            "Двухэтапная аутентификация успешно включена! Можете отсканировать qr-code или ввести код самостоятельно.",
          qr_code: data_url,
          code: secret.base32,
        });
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Ошибка при включении двухэтапной аутентификации" });
    }
  };

  // ВЫКЛЮЧИТЬ 2FA ВАЛИДАЦИЮ
  static disable2FA = async (req, res) => {
    const id = req.user._id;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден!" });
      }

      user.secret = undefined;
      user.is2FAEnabled = false;
      await user.save();
      return res
        .status(200)
        .json({ message: "Двухэтапная аутентификация отключена" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Ошибка при отключении двухэтапной аутентификации" });
    }
  };

  // Верификация OTP
  static verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      // Проверка OTP
      const verified = speakeasy.totp.verify({
        secret: user.secret,
        encoding: "base32",
        token: otp,
        window: 1,
      });

      if (verified) {
        const token = jwt.sign(
          { _id: user._id, email: user.email },
          config.jwtSecret,
          { expiresIn: "1h" }
        );

        res.cookie("token", token, { httpOnly: true });
        return res.status(200).json({
          user,
          message:
            "Двухэтапная аутентификация подтверждена, вход выполнен успешно!",
        });
      } else {
        return res.status(401).json({ message: "Неверный код" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Ошибка при проверке кода" });
    }
  };

  // ВЫХОД ИЗ АККАУНТА
  static logout = async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      });
      res.status(200).json({ message: "Вы успешно вышли с аккаунта!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // ВЫДАТЬ ИНФОРМАЦИЮ О СВОЕМ ПРОФИЛЕ
  static getMe = async (req, res) => {
    try {
      const user = req.user;
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export default AuthController;
