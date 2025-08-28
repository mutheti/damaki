require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../src/db/models/Project');
const Service = require('../src/db/models/Service');
const Testimonial = require('../src/db/models/Testimonial');

const seedData = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🚀 Connected to MongoDB');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Promise.all([
      Project.deleteMany({}),
      Service.deleteMany({}),
      Testimonial.deleteMany({}),
    ]);

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
      // Add more projects as needed
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
      // Add more services as needed
    ];

    const testimonials = [
      {
        name: 'John Mwangi',
        role: 'CEO, TechSavvy Ltd',
        content: 'Damaki Solutions transformed our online presence with their exceptional web development skills.',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        featured: true,
        order: 1
      },
      // Add more testimonials as needed
    ];

    console.log('🌱 Seeding database...');
    
    // Insert data
    await Project.insertMany(projects);
    await Service.insertMany(services);
    await Testimonial.insertMany(testimonials);

    console.log('✅ Database seeded successfully!');
    console.log(`📊 Projects: ${projects.length}`);
    console.log(`🛠️ Services: ${services.length}`);
    console.log(`⭐ Testimonials: ${testimonials.length}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

seedData().catch(console.error);
