import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file in the project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Debug: Log the loaded environment variables
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Found' : 'Not found');

// Define schemas directly in the seed file
// Contact Schema
// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'editor'], default: 'editor' },
  lastLogin: { type: Date },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Add password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String, required: true }],
  imageUrl: { type: String, required: true },
  liveUrl: { type: String },
  githubUrl: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  features: [{ type: String }],
  order: { type: Number, default: 0 },
}, { timestamps: true });

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  content: { type: String, required: true },
  avatar: { type: String, required: true },
  rating: { type: Number, required: true },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Create models
const Project = mongoose.models?.Project || mongoose.model('Project', projectSchema);
const Service = mongoose.models?.Service || mongoose.model('Service', serviceSchema);
const Testimonial = mongoose.models?.Testimonial || mongoose.model('Testimonial', testimonialSchema);
const Contact = mongoose.models?.Contact || mongoose.model('Contact', contactSchema);

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error('Admin credentials not found in environment variables');
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🚀 Connected to MongoDB');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await mongoose.connection.dropDatabase();

    console.log('🌱 Seeding database...');
    
    // Create admin user
    console.log('👤 Creating admin user...');
    const User = mongoose.model('User', userSchema);
    const adminUser = new User({
      username: 'admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
      isActive: true
    });
    await adminUser.save();
    console.log('✅ Admin user created successfully');

    // Sample data
    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'A full-featured online marketplace with payment integration, inventory management, and admin dashboard.',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        category: 'Web Application',
        featured: true,
        githubUrl: 'https://github.com/dancanmurithi/ecommerce-platform',
        liveUrl: 'https://ecommerce.damaki.tech',
        order: 1
      },
      {
        title: 'Healthcare Management System',
        description: 'Comprehensive patient management system for healthcare providers with appointment scheduling and EMR.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
        tags: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind'],
        category: 'Healthcare',
        featured: true,
        githubUrl: 'https://github.com/dancanmurithi/healthcare-system',
        liveUrl: 'https://healthcare.damaki.tech',
        order: 2
      },
      {
        title: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric authentication and real-time transaction monitoring.',
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
        tags: ['React Native', 'Firebase', 'Redux', 'Biometrics'],
        category: 'Mobile Application',
        featured: true,
        githubUrl: 'https://github.com/dancanmurithi/banking-app',
        liveUrl: 'https://banking.damaki.tech',
        order: 3
      },
      {
        title: 'AI Analytics Dashboard',
        description: 'Business intelligence dashboard with machine learning insights and predictive analytics.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        tags: ['React', 'D3.js', 'Python', 'TensorFlow'],
        category: 'Data Analytics',
        featured: true,
        githubUrl: 'https://github.com/dancanmurithi/ai-analytics',
        liveUrl: 'https://analytics.damaki.tech',
        order: 4
      },
      {
        title: 'Restaurant POS System',
        description: 'Point of sale system for restaurants with inventory tracking, order management, and reporting.',
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        category: 'Point of Sale',
        featured: true,
        githubUrl: 'https://github.com/dancanmurithi/restaurant-pos',
        liveUrl: 'https://pos.damaki.tech',
        order: 5,
        tags: ['Angular', 'Express.js', 'MySQL', 'PWA'],
        category: 'POS System',
        color: 'from-amber-500 to-amber-600',
        featured: false,
        order: 5
      },
      {
        title: 'LMS Platform',
        description: 'Interactive learning management system with course creation, progress tracking, and assessments.',
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
        tags: ['Laravel', 'Vue.js', 'MySQL', 'WebRTC'],
        category: 'Education',
        color: 'from-indigo-500 to-indigo-600',
        featured: false,
        order: 6
      }
    ];

    const services = [
      {
        title: 'Web Development',
        description: 'Custom web applications built with modern technologies like React, Next.js, and Node.js.',
        icon: 'Code',
        features: [
          'Responsive Design',
          'Progressive Web Apps',
          'API Integration',
          'Performance Optimization'
        ],
        order: 1
      },
      {
        title: 'Mobile App Development',
        description: 'Cross-platform mobile applications for iOS and Android using React Native.',
        icon: 'Smartphone',
        features: [
          'iOS & Android',
          'Offline Capabilities',
          'Push Notifications',
          'App Store Deployment'
        ],
        order: 2
      },
      {
        title: 'UI/UX Design',
        description: 'Beautiful and intuitive user interfaces that enhance user experience and engagement.',
        icon: 'Layout',
        features: [
          'User Research',
          'Wireframing & Prototyping',
          'User Testing',
          'Design Systems'
        ],
        order: 3
      },
      {
        title: 'DevOps & Cloud',
        description: 'CI/CD pipelines, containerization, and cloud infrastructure management.',
        icon: 'Cloud',
        features: [
          'Docker & Kubernetes',
          'AWS/GCP/Azure',
          'CI/CD Pipelines',
          'Infrastructure as Code'
        ],
        order: 4
      },
      {
        title: 'E-commerce Solutions',
        description: 'Custom e-commerce platforms with secure payment processing and inventory management.',
        icon: 'ShoppingCart',
        features: [
          'Payment Integration',
          'Inventory Management',
          'Multi-vendor Support',
          'Analytics Dashboard'
        ],
        order: 5
      },
      {
        title: 'AI & Machine Learning',
        description: 'Intelligent solutions with machine learning and artificial intelligence.',
        icon: 'Brain',
        features: [
          'Predictive Analytics',
          'Computer Vision',
          'NLP',
          'Recommendation Systems'
        ],
        order: 6
      }
    ];

    const testimonials = [
      {
        name: 'John Mwangi',
        role: 'CEO, TechSavvy Ltd',
        content: 'Damaki Solutions transformed our online presence with their exceptional web development skills. The team delivered beyond our expectations.',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        featured: true,
        order: 1
      },
      {
        name: 'Sarah Johnson',
        role: 'Marketing Director, Bloom Retail',
        content: 'The e-commerce platform developed by Damaki has significantly boosted our online sales. Their attention to detail is remarkable.',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        featured: true,
        order: 2
      },
      {
        name: 'David Ochieng',
        role: 'CTO, HealthPlus',
        content: 'Their mobile app development expertise helped us reach more patients and streamline our healthcare services.',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        rating: 5,
        featured: true,
        order: 3
      }
    ];

    console.log('🌱 Seeding database...');
    
    // Insert data with proper error handling
    try {
      await Project.insertMany(projects);
      console.log('✅ Projects inserted successfully');
      
      await Service.insertMany(services);
      console.log('✅ Services inserted successfully');
      
      await Testimonial.insertMany(testimonials);
      console.log('✅ Testimonials inserted successfully');
      
      // Seed sample contacts
      console.log('🌱 Seeding sample contacts...');
      const contacts = [
       
      ];

      await Contact.insertMany(contacts);
      console.log(`✅ Seeded ${contacts.length} contacts`);
      
      console.log('🎉 Database seeding completed successfully!');
      
    } catch (error) {
      console.error('❌ Error seeding database:', error);
      process.exit(1);
    } finally {
      await mongoose.disconnect();
      console.log('🔌 Disconnected from MongoDB');
    }
    }catch(error){
      console.error('❌ Error seeding database:', error);
      process.exit(1);
    }
  };


seedData().catch(error => {
  console.error('❌ Error in seed script:', error);
  process.exit(1);
});
