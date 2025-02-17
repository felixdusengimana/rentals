import { Op } from "sequelize";
import { Booking } from "../models/Booking.js";
import { Payment } from "../models/Payment.js";
import { Property } from "../models/Property.js";
import { sendEmail } from "../utils/emailService.js";
import { User } from "../models/User.js";

export const createBooking = async (req, res) => {
  req.user={
    id: 1, 
    name: "Felix Dusengimana"
  }
  try {
    const { propertyId, checkInDate, checkOutDate} = req.body;

    const property = await Property.findByPk(propertyId);
    if (!property || property.status !== 'ACTIVE') {
      return res.status(404).json({ message: 'Property not found or unavailable' });
    }

    if(property.pricePerNight === null){
      return res.status(404).json({ message: "This property isn't available to book" });
    }

    if (new Date(checkInDate) < new Date()) {
      return res.status(400).json({ message: 'Invalid check-in date: must be in the future' });
    }

    if (new Date(checkOutDate) < new Date()) {
      return res.status(400).json({ message: 'Invalid check-out date: must be in the future' });
    }

    const days = ((new Date(checkOutDate) - new Date(checkInDate)) / (1000*60*60*24));

    if (days <= 0) {
      return res.status(400).json({ message: 'Invalid dates: check-out must be after check-in' });
    }

    const amount = property.price * days;

    
    const overlappingBooking = await Booking.findOne({
      where: {
        propertyId,
        status: 'CONFIRMED',
        [Op.or]: [
          {
            checkInDate: { [Op.lt]: checkOutDate }, 
            checkOutDate: { [Op.gt]: checkInDate },
          },
        ],
      }
    });

    if (overlappingBooking) {
      return res.status(400).json({ message: 'Property already booked for these dates' });
    }

    const booking = await Booking.create({
      renterId: req.user.id,
      propertyId,
      checkInDate,
      checkOutDate,
      status: 'PENDING'
    });

    const emailSubject = 'Booking Confirmation - LaLa Rental';

    const emailHtml = `
      <h3>Hi ${req.user.name},</h3>
      <p>Your booking has been confirmed!</p>
      <p><strong>Booking Details:</strong></p>
      <ul>
        <li><strong>Property:</strong> ${property.title}</li>
        <li><strong>Check-in Date:</strong> ${checkInDate}</li>
        <li><strong>Check-out Date:</strong> ${checkOutDate}</li>
        <li><strong>Total Amount:</strong> $${amount}</li>
      </ul>
      <p>If you have any questions, feel free to contact us.</p>
      <p>Best regards, <br/> LaLa Rental Team</p>
    `;

    await sendEmail(req.user.email, emailSubject, emailHtml);

    res.status(201).json({ message: 'Booking request sent', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const { bookingId, hostEmail, renterEmail } = req.body;

    const booking = await Booking.findByPk(bookingId, { include: 'Property' });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.status !== 'PENDING') {
      return res.status(400).json({ message: 'Booking is not in pending state' });
    }

    await booking.update({ status: 'CONFIRMED' });

    const nights = (new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24);
    const amount = nights * booking.Property.pricePerNight;

    const payment = await Payment.create({
      bookingId: booking.id,
      amount,
      status: 'UNPAID', 
    });

    const hostEmailContent = `
      <h2>Booking Accepted</h2>
      <p>Dear Host,</p>
      <p>Your booking ID: <strong>${bookingId}</strong> has been confirmed.</p>
      <p>Payment of <strong>$${amount}</strong> is now pending from the renter.</p>
    `;

    await sendEmail(hostEmail, 'Booking Confirmed - LaLa Booking', hostEmailContent);

    const renterEmailContent = `
      <h2>Booking Confirmed</h2>
      <p>Dear Renter,</p>
      <p>Your booking ID: <strong>${bookingId}</strong> has been confirmed by the host.</p>
      <p>Payment of <strong>$${amount}</strong> is now pending for this booking.</p>
    `;
    await sendEmail(renterEmail, 'Booking Confirmed - LaLa Booking', renterEmailContent);

    res.status(200).json({ message: 'Booking accepted', payment });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting booking', error: error.message });
  }
};


export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id, { include: Property });

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (req.user.id !== booking.renterId && req.user.id !== booking.Property.hostId) {
      return res.status(403).json({ message: 'Only the renter or host can cancel this booking' });
    }

    await booking.update({ status: 'CANCELED' });

    res.status(200).json({ message: 'Booking canceled', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error canceling booking', error: error.message });
  }
};

  export const getUserBookings = async (req, res) => {
    try {
      let bookings;
      
      if (req.user.role === 'RENTER') {
        bookings = await Booking.findAll({
          where: { renterId: req.user.id },
          include: [{
            model: Payment,
            attributes: ['amount', 'status', 'paymentMethod', 'transactionId'],
            required: false, 
          }]
        });
      } else if (req.user.role === 'HOST') {
        bookings = await Booking.findAll({
          include: [{
            model: Property,
            where: { hostId: req.user.id },
            include: [{
              model: Payment, 
              attributes: ['amount', 'status', 'paymentMethod', 'transactionId'],
              required: false,
            }]
          }]
        });
      }
      
  
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
  };

export const getAllBookings = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
      const offset = (page - 1) * pageSize; 

    const bookings = await Booking.findAll({
      limit: pageSize,
      offset,
      include: [{
        model: Property,
      },{
        model: User,
        as: 'renter',
      }]
    });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
}

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByPk(id, {
      include: [
        {
          model: Property,
        },
        {
          model: User,
          as: 'renter',
        }
      ],
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
};
  