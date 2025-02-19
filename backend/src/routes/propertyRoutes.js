import express from 'express';
import { 
  createProperty, 
  updateProperty, 
  updatePropertyStatus, 
  getAllProperties, 
  getPropertyById,
  getAllPropertiesByUser 
} from '../controllers/propertiesController.js';
import { isAuthenticated, isSeller } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',createProperty);
router.put('/:id', updateProperty);
router.put('/:id/status', updatePropertyStatus);
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.get('/by-user/:userId', getAllPropertiesByUser);

export default router;
