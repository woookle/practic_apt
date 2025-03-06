import User from "../models/User.js";
import {
  sendVerificationEmail,
  sendRegistrationSuccessEmail,
} from "./emailService.js";
import generateVerificationCode from "../utils/generateCode.js";

const verificationCodes = new Map();

export const startRegistration = (email) => {
  const verificationCode = generateVerificationCode();
  const expirationTime = Date.now() + 10 * 60 * 1000;

  verificationCodes.set(email, {
    code: verificationCode,
    expires: expirationTime,
  });

  sendVerificationEmail(email, verificationCode);
};

export const completeRegistration = async (
  email,
  username,
  code,
  hashed_password,
  role
) => {
  const storedData = verificationCodes.get(email);

  if (!storedData) {
    throw new Error("Код не найден или срок его действия истек.");
  }

  const { code: storedCode, expires } = storedData;

  if (expires < Date.now()) {
    verificationCodes.delete(email);
    throw new Error("Срок действия кода истек.");
  }

  if (storedCode !== code) {
    throw new Error("Неверный код подтверждения.");
  }

  const user = new User({
    email,
    username,
    password: hashed_password,
    role: role ? role : "user",
  });
  await user.save();

  sendRegistrationSuccessEmail(email, username);
  verificationCodes.delete(email);

  return user;
};
