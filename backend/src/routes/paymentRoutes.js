import express from 'express';
import { 
  initiatePayment, 
  confirmPayment, 
  refundPayment, 
  getPaymentStatus,
  getAllPayments,
  getPaymentById
} from '../controllers/paymentsController.js';
import { isAdmin, isAuthenticated, isSeller } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',  initiatePayment);
router.get('/', getAllPayments);
router.get('/:id',  getPaymentById);
router.put('/:id/confirm',  confirmPayment);
router.put('/:id/refund',  refundPayment);
router.get('/byBooking/:bookingId',  getPaymentStatus);

export default router;
