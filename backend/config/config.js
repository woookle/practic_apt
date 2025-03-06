import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export default {
  mongodbUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3000,

  email_user: process.env.EMAIL_USER,
  email_app_password: process.env.EMAIL_APP_PASSWORD,
  email_company_name: process.env.EMAIL_COMPANY_NAME,

  company_logo_image: process.env.COMPANY_LOGO_IMAGE
};