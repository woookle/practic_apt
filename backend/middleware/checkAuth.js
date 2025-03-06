import jwt from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/User.js";

export const checkAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Вы не зарегистрированы!" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = await User.findById(decoded._id);
    if(!req.user) {
      return res.status(401).json({ message: "Пользователь не найден!" })
    }
    next();
  } catch (error) {
    res.status(400).json({ message: "Вы не зарегистрированы!" });
  }
};
