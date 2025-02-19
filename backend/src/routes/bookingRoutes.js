import express from 'express';
import { 
  createBooking,
  cancelBooking,
  confirmBooking,
  getUserBookings,
  getAllBookings,
  getBookingById
} from '../controllers/bookingsController.js';
import { isAdmin, isAuthenticated, isSeller } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',  createBooking);
router.get("/",  getAllBookings);
router.get("/:id",  getBookingById);
router.put('/confirm', confirmBooking);
router.put('/cancel', cancelBooking);
router.get('/my/:userId', getUserBookings);
export default router;
