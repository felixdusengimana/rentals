import express from 'express';
import { getAllUsers, getUserById, updateUserRole } from '../controllers/usersController.js';
import { isAdmin, isAuthenticated } from '../middleware/authMiddleware.js'; 
const router = express.Router();

router.get('/', isAdmin, getAllUsers);

router.get('/:id', getUserById);

router.put('/:id/role', updateUserRole);

export default router;
