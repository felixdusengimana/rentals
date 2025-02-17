import { Sequelize } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from './User.js';
import { Property } from './Property.js';

export const Booking = sequelize.define('Booking', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  renterId: { type: Sequelize.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  propertyId: { type: Sequelize.INTEGER, allowNull: false, references: { model: Property, key: 'id' } },
  checkInDate: { type: Sequelize.DATEONLY, allowNull: false },
  checkOutDate: { type: Sequelize.DATEONLY, allowNull: false },
  status: { 
    type: Sequelize.ENUM('PENDING', 'CONFIRMED', 'CANCELED'), 
    defaultValue: 'PENDING',
    allowNull: false 
  }
}, { timestamps: true });

User.hasMany(Booking, { foreignKey: 'renterId', onDelete: 'CASCADE' });
Property.hasMany(Booking, { foreignKey: 'propertyId', onDelete: 'CASCADE' });
Booking.belongsTo(User, { foreignKey: 'renterId', as: 'renter' });
Booking.belongsTo(Property, { foreignKey: 'propertyId', as: 'property' });
