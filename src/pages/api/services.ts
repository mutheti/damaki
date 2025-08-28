import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/db/dbConnect';
import Service from '@/db/models/Service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    await dbConnect();

    switch (method) {
      case 'GET':
        try {
          const services = await Service.find({}).sort({ order: 1 });
          
          if (!services || services.length === 0) {
            return res.status(200).json({ 
              success: true, 
              data: [],
              message: 'No services found' 
            });
          }
          
          return res.status(200).json({ 
            success: true, 
            data: services.map(service => ({
              _id: service._id?.toString(),
              icon: service.icon,
              title: service.title,
              description: service.description,
              features: service.features || [],
              color: service.color,
              order: service.order || 0
            }))
          });
          
        } catch (error) {
          console.error('Error fetching services:', error);
          return res.status(500).json({ 
            success: false, 
            error: 'Internal server error',
            message: 'Failed to fetch services'
          });
        }

      case 'POST':
        try {
          const service = await Service.create(req.body);
          return res.status(201).json({ 
            success: true, 
            data: service,
            message: 'Service created successfully'
          });
          
        } catch (error) {
          console.error('Error creating service:', error);
          return res.status(400).json({ 
            success: false, 
            error: 'Bad request',
            message: 'Failed to create service'
          });
        }

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ 
          success: false, 
          error: 'Method not allowed',
          message: `Method ${method} is not supported`
        });
    }
    
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({
      success: false,
      error: 'Database connection error',
      message: 'Failed to connect to the database'
    });
  }
}
