import mongoose from 'mongoose';

async function testConnection() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 
      'mongodb+srv://dancanmurithi971:vlkCeWYiI9msQSY6@damaki.sk1gcza.mongodb.net/damaki?retryWrites=true&w=majority&appName=damaki';
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB');
    
    // Test a simple query
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

testConnection();
