import express from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import UserController from '../controllers/userController.js';
import upload from '../config/multerConfig.js';
import AdminController from '../controllers/adminController.js';

const router = express.Router();
router.use(checkAuth);

// УПРАВЛЕНИЕ СВОИМИ ДОКУМЕНТАМИ
router.get('/documents', UserController.getMyDocuments);
router.get("/documents/download/:id", UserController.downloadDocument);
router.post('/documents', UserController.createDocument);
router.delete('/documents/:id', UserController.deleteDocument);

// ВЫДАТЬ СТУДЕНТОВ, ГРУППЫ, КОМПАНИИ и НАВЗАНИЯ УЧЕБНЫХ ПРАКТИК
router.get('/student', AdminController.getStudents);
router.get('/student/:id', AdminController.getStudentsByGroup);
router.get('/group', AdminController.getGroups);
router.get('/company', AdminController.getCompanyes);
router.get('/practic', AdminController.getPractics);


// УПРАВЛЕНИЕ СВОИМ АККАУНТОМ
router.patch('/account/avatar', upload.fields([{ name: "avatar", maxCount: 1 }]), UserController.changeAvatar);
router.patch('/account/name', UserController.changeAccount);

export default router;