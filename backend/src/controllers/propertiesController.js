import { Op } from 'sequelize';
import { Property } from '../models/Property.js';

export const createProperty = async (req, res) => {
  try {
    const { title, description, pricePerNight, location, parentId, propertyType, images, hostId } = req.body;

    if(parentId){
      const parentProperty = await Property.findByPk(parentId);
      if (!parentProperty) return res.status(404).json({ message: 'Parent property not found' });
    }

    const property = await Property.create({
      title,
      description,
      pricePerNight,
      location,
      hostId,
      status: 'ACTIVE',
      parentId,
      propertyType,
      images
    });

    res.status(201).json({ message: 'Property listed successfully', property });
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error: error.message });
  }
};



export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, pricePerNight, location, propertyType, parentId, propertyStatus } = req.body;

    const property = await Property.findByPk(id);

    if (!property) return res.status(404).json({ message: 'Property not found' });

    if(parentId === id){
      return res.status(400).json({ message: 'Property cannot be a parent of itself' });
    }

    property.title = title || property.title;
    property.description = description || property.description;
    property.pricePerNight = pricePerNight || property.pricePerNight;
    property.location = location || property.location;
    property.propertyType = propertyType || property.propertyType;
    property.propertyStatus = propertyStatus || property.propertyStatus;
    property.parentId = parentId || property.parentId;

    await property.save();
    res.status(200).json({ message: 'Property updated successfully', property });
  } catch (error) {
    res.status(500).json({ message: 'Error updating property', error: error.message });
  }
};


export const updatePropertyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['ACTIVE', 'INACTIVE', 'DELETED'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const property = await Property.findByPk(id);
    const childProperties = await Property.findAll({ where: { parentId: id } });

    if (!property) return res.status(404).json({ message: 'Property not found' });

    await property.update({ status });

    if(childProperties.length > 0) {
      await Property.update({ status }, { where: { parentId: id } });
    }

    res.status(200).json({ message: `Property status updated to ${status}`, property });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const { parentId,  page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    const properties = await Property.findAll({
      where: {
        parentId: parentId || null,
        status: { [Op.ne]: 'DELETED' }
      },
      limit: pageSize, 
      offset,
      include: [{
        model: Property,
        as: 'children',
        required: false,
      }],
    });

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
};


export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findByPk(id, {
      include: [
        {
          model: Property,
          as: 'parent', 
          required: false, 
        },
        {
          model: Property,
          as: 'children', 
          required: false,
        }
      ],
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error: error.message });
  }
};


export const getAllPropertiesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, pageSize = 10 } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const offset = (page - 1) * pageSize; 

    const properties = await Property.findAll({
      where: { 
        hostId: userId, 
        parentId: null,
        status: { [Op.ne]: 'DELETED' }
       },
      offset,
      limit: pageSize,
      include: [
        {
          model: Property,
          as: 'parent', 
          required: false, 
        },
        {
          model: Property,
          as: 'children', 
          required: false,
        }
      ],
    });

    const totalProperties = await Property.count({ where: { hostId: userId, parentId: null } });
    const totalPages = Math.ceil(totalProperties / pageSize);

    res.status(200).json({
      data: properties,
      page: page,
      pageSize: pageSize,
      totalPages: totalPages,
      totalElements: totalProperties,
      status: 'success',
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
}


