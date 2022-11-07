import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
// const { DATABASE_CONNECTION_URL } = process.env;
// export default mongoose
//   .connect(DATABASE_CONNECTION_URL)
//   .then(() => console.log("Connected successfully to MongoDB"))
//   .catch((e) => console.log(e));
console.log(process.env.DATABASE_CONNECTION_URL)

  try {
    const client = await mongoose.connect(process.env.DATABASE_CONNECTION_URL);
    console.log(`Connected to MongoDB @ ${client.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit();
  }

