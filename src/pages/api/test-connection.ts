import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/db/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('Connecting to MongoDB...');
    await dbConnect();
    console.log('✅ MongoDB connected successfully');
    
    res.status(200).json({ 
      success: true, 
      message: 'Successfully connected to MongoDB' 
    });
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to connect to MongoDB',
      error: error.message 
    });
  }
}
