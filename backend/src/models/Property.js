import { Sequelize } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from './User.js';


const PROPERTY_TYPES = [
  'APARTMENT',
  'HOUSE',
  'STUDIO',
  'VILLA',
  'CONDO',
  'TOWNHOUSE',
  'CABIN',
  'LOFT',
  'COTTAGE',
  'MANSION',
  'HOTEL'
];

const PROPERTY_STATUSES = [
  'ACTIVE',
  'INACTIVE',
  'DELETED'
];

export const Property = sequelize.define('Property', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  parentId: { 
    type: Sequelize.INTEGER, 
    allowNull: true, 
    references: { model: 'Properties', key: 'id' },
  },
  title: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.TEXT, allowNull: false },
  pricePerNight: { type: Sequelize.FLOAT, allowNull: true },
  location: { type: Sequelize.STRING, allowNull: false },
  propertyType: { 
    type: Sequelize.ENUM(...PROPERTY_TYPES), 
    allowNull: false 
  },
  status: { 
    type: Sequelize.ENUM(...PROPERTY_STATUSES), 
    allowNull: false, 
    defaultValue: 'ACTIVE' 
  },
  hostId: { 
    type: Sequelize.INTEGER, 
    allowNull: false, 
    references: { model: User, key: 'id' },
  },
  images: { type: Sequelize.JSON, allowNull: true, defaultValue: '[]',  
    get() {
    return JSON.parse(this.getDataValue('images'));
    },
    set(value) {
      this.setDataValue('images', JSON.stringify(value));
    },
},
}, { timestamps: true });


Property.hasMany(Property, { foreignKey: 'parentId', onDelete: 'CASCADE' });
Property.belongsTo(Property, { foreignKey: 'parentId' });
Property.belongsTo(User, { foreignKey: 'hostId' });
User.hasMany(Property, { foreignKey: 'hostId', onDelete: 'CASCADE' });
Property.hasMany(Property, { 
  foreignKey: 'parentId', 
  as: 'children'
});
Property.belongsTo(Property, { 
  foreignKey: 'parentId', 
  as: 'parent'
});

