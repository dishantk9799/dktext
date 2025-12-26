import mongoose from 'mongoose';
import { DB_NAME } from '../utils/constant.js';

const connectDB = async () => {
    try {
        const DB = await mongoose.connect(`${process.env.mongoDB_URI}/${DB_NAME}`);
        console.log("✅ DATABASE CONNECTED");
        console.log(`📍 Host: ${DB.connection.host}`);

    } catch (error) {
        console.error("❌ Database connection failed");
        console.error(error.message);
        process.exit(1);
    }

}

export default connectDB;