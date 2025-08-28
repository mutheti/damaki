import mongoose from 'mongoose';

const contactFormSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'contacted', 'resolved'],
    default: 'new'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Create a text index for search functionality
contactFormSchema.index(
  { 
    firstName: 'text', 
    lastName: 'text', 
    email: 'text',
    message: 'text'
  },
  {
    weights: {
      firstName: 3,
      lastName: 3,
      email: 2,
      message: 1
    }
  }
);

// Check if the model has already been compiled
export const ContactForm = mongoose.models.ContactForm || 
  mongoose.model('ContactForm', contactFormSchema);
