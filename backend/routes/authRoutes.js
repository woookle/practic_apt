import express from 'express';
import AuthController from '../controllers/authController.js';
import { checkAuth } from '../middleware/checkAuth.js';
import { registerValidator, loginValidator } from '../validators/validators.js';
import handleValidationErrors from '../middleware/handleValidationErrors.js';

const router = express.Router();

// РЕГСТРАЦИЯ
router.post('/register', registerValidator, handleValidationErrors, AuthController.startRegistrationHandler);
router.post('/send-code', registerValidator, handleValidationErrors, AuthController.completeRegistrationHandler);

// АВТОРИЗАЦИЯ ВЫХОД
router.post('/login', loginValidator, handleValidationErrors, AuthController.login);
router.post('/logout', AuthController.logout);

// 2FA НАСТРОЙКИ
router.post('/verify-otp', AuthController.verifyOTP);
router.patch('/enable-2fa', checkAuth, AuthController.enable2FA);
router.patch('/disable-2fa', checkAuth, AuthController.disable2FA);

// ВЫДАТЬ ИНФОМАЦИЮ О СВОЕМ ПРФОИЛЕ
router.get('/me', checkAuth, AuthController.getMe)

export default router;