import express from 'express';
import { getAllUsers, getUserById, updateUserRole } from '../controllers/usersController.js';
import { isAdmin, isAuthenticated } from '../middleware/authMiddleware.js'; 
const router = express.Router();

router.get('/', isAuthenticated, isAdmin, getAllUsers);

router.get('/:id', isAuthenticated, getUserById);

router.put('/:id/role', isAuthenticated, isAdmin, updateUserRole);

export default router;
