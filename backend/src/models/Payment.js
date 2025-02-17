import { Sequelize } from 'sequelize';
import { Booking } from './Booking.js';
import { sequelize } from '../config/database.js';

export const Payment = sequelize.define('Payment', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  bookingId: { type: Sequelize.INTEGER, allowNull: false, references: { model: Booking, key: 'id' } },
  amount: { type: Sequelize.FLOAT, allowNull: false },
  status: { 
    type: Sequelize.ENUM('PAID', 'UNPAID', 'REFUNDED'), 
    defaultValue: 'UNPAID',
    allowNull: false 
  },
  paymentMethod: { type: Sequelize.STRING, allowNull: true }, 
  transactionId: { type: Sequelize.STRING, unique: true }
}, { timestamps: true });

Booking.hasOne(Payment, { foreignKey: 'bookingId', onDelete: 'CASCADE' });
Payment.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });
