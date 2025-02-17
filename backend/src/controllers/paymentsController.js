import { Payment } from '../models/Payment.js';
import { Booking } from '../models/Booking.js';
import { Property } from '../models/Property.js';
import { sendEmail } from '../utils/emailService.js';
import { User } from '../models/User.js';

export const initiatePayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod } = req.body;

    const booking = await Booking.findByPk(bookingId, {
      include: [{
        model: Property,
        attributes: ['pricePerNight'], 
      }]
    });

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const checkInDate = new Date(booking.checkInDate);
    const checkOutDate = new Date(booking.checkOutDate);
    const timeDifference = checkOutDate - checkInDate;
    const days = timeDifference / (1000 * 3600 * 24); 

    if (days <= 0) {
      return res.status(400).json({ message: 'Invalid dates: check-out must be after check-in' });
    }

    const amount = days * booking.Property.pricePerNight;

    // Create a new payment record
    const payment = await Payment.create({
      bookingId,
      amount,
      status: 'UNPAID',
      paymentMethod
    });

    res.status(201).json({ message: 'Payment initiated', payment });
  } catch (error) {
    res.status(500).json({ message: 'Error initiating payment', error: error.message });
  }
};


export const confirmPayment = async (req, res) => {
    try {
      const { id } = req.params;
      const { transactionId, paymentMethod } = req.body;
  
      const existingPayment = await Payment.findOne({
        where: { transactionId }
      });

      if (existingPayment) {
        return res.status(400).json({ message: 'Transaction ID already exists. Please use a unique ID.' });
      }

      const payment = await Payment.findByPk(id, { include: [{
        model: Booking,
        as: 'booking',
        include: [{
          model: User,
          as: 'renter',
        }]
      }]});

      if (!payment) return res.status(404).json({ message: 'Payment not found' });
  
      if (payment.status === 'PAID') {
        return res.status(400).json({ message: 'Payment already completed' });
      }
  
      await payment.update({ status: 'PAID', transactionId, paymentMethod });
      const email = payment.booking?.renter?.email;

      const emailContent = `
      <h2>Payment Successful</h2>
      <p>Dear Customer,</p>
      <p>Your payment of <strong>$${payment.amount}</strong> for Booking ID: <strong>${payment.bookingId}</strong> has been successfully processed.</p>
      <p>Transaction ID: <strong>${transactionId}</strong></p>
      <p>Thank you for choosing LaLa Booking!</p>
    `;

      await sendEmail(email, 'Payment Confirmation - LaLa Booking', emailContent);

      res.status(200).json({ message: 'Payment confirmed', payment });
    } catch (error) {
      res.status(500).json({ message: 'Error confirming payment', error: error.message });
    }
};

export const refundPayment = async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findByPk(id, { include: [{
        model: Booking,
        as: 'booking',
        include: [{
          model: User,
          as: 'renter',
        }]
      }]});
  
      if (!payment) return res.status(404).json({ message: 'Payment not found' });
      if (payment.status !== 'PAID') {
        return res.status(400).json({ message: 'Only paid bookings can be refunded' });
      }

      const email = payment.booking.renter.email;
  
      if (req.user.role !== 'ADMIN' && req.user.id !== payment.Booking.Property.hostId) {
        return res.status(403).json({ message: 'Only the host or admin can issue a refund' });
      }
  
      await payment.update({ status: 'REFUNDED' });
  
      const emailContent = `
      <h2>Payment Refunded</h2>
      <p>Dear Customer,</p>
      <p>Your payment of <strong>$${payment.amount}</strong> for Booking ID: <strong>${payment.bookingId}</strong> has been refunded.</p>
      <p>If you have any issues, please contact our support team.</p>
    `;
      await sendEmail(email, 'Refund Processed - LaLa Booking', emailContent);

      res.status(200).json({ message: 'Payment refunded', payment });
    } catch (error) {
      res.status(500).json({ message: 'Error processing refund', error: error.message });
    }
};

export const getPaymentStatus = async (req, res) => {
    try {
      const { bookingId } = req.params;
      const payment = await Payment.findOne({ where: { bookingId } });
  
      if (!payment) return res.status(404).json({ message: 'Payment record not found' });
  
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching payment status', error: error.message });
    }
  };
  
export const getAllPayments = async (req, res) => {
    try {
      const { page = 1, pageSize = 10 } = req.query;
      const offset = (page - 1) * pageSize; 

      const payments = await Payment.findAll({
        limit: pageSize,
        offset,
        include: [{
          model: Booking,
          as: 'booking',
          include: [{
            model: Property,
            as: 'property',
          }]
        }]
      });
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching payments', error: error.message });
    }
}

export const getPaymentById = async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findByPk(id, {
        include: [{
          model: Booking,
          as: 'booking',
          include: [{
            model: Property,
            as: 'property',
          }]
        }]
      });
  
      if (!payment) return res.status(404).json({ message: 'Payment not found' });
  
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching payment', error: error.message });
    }
}