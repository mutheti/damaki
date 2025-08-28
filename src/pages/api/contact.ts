import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect  from '@/db/dbConnect';
import { ContactForm } from '@/db/models/ContactForm';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { firstName, lastName, email, phone, message } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Save to database
    const contactForm = new ContactForm({
      firstName,
      lastName,
      email,
      phone: phone || '',
      message,
      submittedAt: new Date()
    });

    await contactForm.save();

    // Here you could also add email notification logic
    // await sendContactEmail({ firstName, lastName, email, phone, message });

    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while submitting the form. Please try again later.'
    });
  }
}
