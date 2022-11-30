import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
try {
  const client = await mongoose.connect(process.env.DATABASE_CONNECTION_URL);
  console.log(`Connected to MongoDB @ ${client.connection.host}`);
} catch (error) {
  console.log(error);
  process.exit();
}

