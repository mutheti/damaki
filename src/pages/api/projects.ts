import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/db/dbConnect';
import Project from '@/db/models/Project';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  
  try {
    await dbConnect();
    console.log('Database connection established');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Database connection failed',
      details: process.env.VITE_NODE_ENV === 'development' ? error.message : undefined
    });
  }

  switch (method) {
    case 'GET':
      try {
        console.log('Fetching projects with query:', query);
        const { category } = query;
        const filter = category ? { category } : {};
        console.log('Using filter:', filter);
        
        const projects = await Project.find(filter).sort({ order: 1 });
        console.log(`Found ${projects.length} projects`);
        
        return res.status(200).json({ 
          success: true, 
          data: projects 
        });
      } catch (error) {
        console.error('❌ Error fetching projects:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to fetch projects',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }
      break;

    case 'POST':
      try {
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, data: project });
      } catch (error) {
        console.error('Error creating project:', error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ success: false });
      break;
  }
}
