import express from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import { checkAdmin } from '../middleware/checkAdmin.js';
import { groupValidator, studentValidator } from '../validators/validators.js';
import handleValidationErrors from '../middleware/handleValidationErrors.js';
import AdminController from '../controllers/adminController.js';

const router = express.Router();
router.use(checkAuth, checkAdmin);

// УПРАВЛЕНИЕ ГРУППАМИ
router.get('/group', AdminController.getGroups);
router.post('/group', groupValidator, handleValidationErrors, AdminController.createGroup);
router.patch('/group/:id', groupValidator, handleValidationErrors, AdminController.changeGroup);
router.delete('/group/:id', AdminController.deleteGroup);

// УПРАВЛЕНИЕ СТУДЕНТАМИ
router.get('/student', AdminController.getStudents);
router.get('/student/:id', AdminController.getStudentsByGroup);
router.post('/student', studentValidator, handleValidationErrors, AdminController.createStudent);
router.patch('/student/:id', studentValidator, handleValidationErrors, AdminController.changeStudent);
router.delete('/student/:id', AdminController.deleteStudent);

// УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ
router.get('/user', AdminController.getUsers)
router.patch('/user/:id', AdminController.changeUser);
router.delete('/user/:id', AdminController.deleteUser);

// УПРАВЛЕНИЕ КОМПАНИЯМИ
router.get('/company', AdminController.getCompanyes);
router.post('/company', AdminController.createCompany);
router.patch('/company/:id', AdminController.changeCompany);
router.delete('/company/:id', AdminController.deleteCompany);

// УПРАВЛЕНИЕ ПРАКТИКАМИ
router.get('/practic', AdminController.getPractics);
router.post('/practic', AdminController.createPractic);
router.patch('/practic/:id', AdminController.changePractic);
router.delete('/practic/:id', AdminController.deletePractic)

export default router;