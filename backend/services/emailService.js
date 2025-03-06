import nodemailer from "nodemailer";
import config from "../config/config.js";

// Настройка транспорта
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email_user,
    pass: config.email_app_password,
  },
});

export const sendVerificationEmail = (email, code) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Код подтверждения</title>
    </head>
    <body style="margin: 0; padding: 20px 0; background-color: #000; color: #fff; font-family: sans-serif;">
      <div style="max-width: 600px; width: 100%; margin: 0 auto; padding: 10px;">
        <!-- Header -->
        ${
          config.company_logo_image && (
            `<div style="text-align: center; padding-bottom: 20px;">
              <img
                src={${config.company_logo_image}}
                alt="Logo"
                style="width: 250px; max-width: 100%; height: auto;"
              />
            </div>`
          )
        }

        <!-- Заголовок -->
        <h1 style="text-align: center; margin: 20px 0;">Подтверждение регистрации</h1>

        <!-- Текст -->
        <p style="text-align: center; margin: 10px 0;">Спасибо за регистрацию! Для завершения процесса, пожалуйста, введите следующий код подтверждения:</p>

        <!-- Код -->
        <div style="text-align: center; margin: 20px 0;">
          <p style="display: inline-block; padding: 10px 20px; background-color: #fff; color: #000; font-weight: bold; font-size: 24px;">${code}</p>
        </div>

        <!-- Дополнительный текст -->
        <p style="text-align: center; margin: 10px 0;">Если вы не регистрировались на нашем сайте, просто проигнорируйте это письмо.</p>

        <!-- Footer -->
        <div style="margin-top: 50px; text-align: center;">
          <div>С уважением, <b>${config.email_company_name}</b></div>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `${config.email_company_name} <${config.email_user}>`,
    to: email,
    subject: "Код подтверждения",
    html: htmlTemplate,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const sendRegistrationSuccessEmail = (email, username) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Успешная регистрация</title>
    </head>
    <body style="margin: 0; padding: 20px 0; background-color: #000; color: #fff; font-family: sans-serif;">
      <div style="max-width: 600px; width: 100%; margin: 0 auto; padding: 10px;">
        <!-- Header -->
                ${
          config.company_logo_image && (
            `<div style="text-align: center; padding-bottom: 20px;">
              <img
                src={${config.company_logo_image}}
                alt="Logo"
                style="width: 250px; max-width: 100%; height: auto;"
              />
            </div>`
          )
        }

        <!-- Заголовок -->
        <h1 style="text-align: center; margin: 20px 0;">Добро пожаловать, ${username}!</h1>

        <!-- Текст -->
        <p style="text-align: center; margin: 10px 0;">Вы успешно зарегистрировались на нашем сайте. Теперь вы можете войти в свою учетную запись и начать пользоваться всеми возможностями!</p>

        <!-- Кнопка входа -->
        <div style="text-align: center; margin: 20px 0;">
          <a href="${config.website_url}/login" style="display: inline-block; padding: 10px 20px; background-color: #fff; color: #000; font-weight: bold; text-decoration: none;">Войти в аккаунт</a>
        </div>

        <!-- Дополнительный текст -->
        <p style="text-align: center; margin: 10px 0;">Если у вас возникнут вопросы, не стесняйтесь обращаться в нашу поддержку.</p>

        <!-- Footer -->
        <div style="margin-top: 50px; text-align: center;">
          <div>С уважением, <b>${config.email_company_name}</b></div>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `${config.email_company_name} <${config.email_user}>`,
    to: email,
    subject: "Успешная регистрация",
    html: htmlTemplate,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
