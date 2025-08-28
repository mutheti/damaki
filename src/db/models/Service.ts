import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  features: string[];
  icon: string; // Will store the Lucide icon name
  color: string; // Tailwind gradient class
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String, required: true }],
    icon: { type: String, required: true },
    color: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Create a model or use the existing one to prevent OverwriteModelError
const Service = mongoose.models.Service || 
  mongoose.model<IService>('Service', ServiceSchema);

export default Service;
