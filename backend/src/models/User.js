import { Sequelize } from 'sequelize';
import { sequelize } from '../config/database.js';

export const User = sequelize.define('User', {
  googleId: { type: Sequelize.STRING, unique: true },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  name: { type: Sequelize.STRING, allowNull: false },
  role: { type: Sequelize.ENUM('RENTER', 'HOST', 'ADMIN'), allowNull: false, defaultValue: "RENTER" },
  photo: { type: Sequelize.STRING },
});