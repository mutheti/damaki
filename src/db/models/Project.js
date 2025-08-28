const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String, required: true }],
    imageUrl: { type: String, required: true },
    liveUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Create a model or use the existing one to prevent OverwriteModelError
const Project = mongoose.models.Project || 
  mongoose.model('Project', ProjectSchema);

module.exports = Project;
