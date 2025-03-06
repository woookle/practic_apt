import { body } from "express-validator";

export const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Неверный формат почты")
    .notEmpty()
    .withMessage("Почта обязательна к заполнению!"),
  body("password")
    .isLength({
      min: 8,
    })
    .withMessage("Пароль должен быть минимум 8 символов")
    .notEmpty()
    .withMessage("Пароль обязателен к заполнению!"),
  body("username")
    .isLength({ min: 3 })
    .withMessage("Ник от 3 символов")
    .notEmpty()
    .withMessage("Ник обязателен к заполнению!"),
];

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Неверный формат почты")
    .notEmpty()
    .withMessage("Почта обязательна к заполнению!"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Пароль должен быть минимум 8 символов")
    .notEmpty()
    .withMessage("Пароль обязателен к заполнению!"),
];

export const groupValidator = [
  body("name").notEmpty().withMessage("Название группы не введено!")
]

export const studentValidator = [
  body("name").notEmpty().withMessage("Имя студента не введено!"),
  body("group").notEmpty().withMessage("Группа не введена!"),
];
