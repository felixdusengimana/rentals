import express from 'express';
import { 
  createProperty, 
  updateProperty, 
  updatePropertyStatus, 
  getAllProperties, 
  getPropertyById 
} from '../controllers/propertiesController.js';
import { isAuthenticated, isSeller } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',createProperty);
router.put('/:id', isAuthenticated, isSeller, updateProperty);
router.put('/:id/status', isAuthenticated, isSeller, updatePropertyStatus);
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

export default router;
