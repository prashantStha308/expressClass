import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
    try {
        console.log("Connecting to mongodb");
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to database: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error occured while connecting:", error);
        process.exit(1);
    }
}

export default connectDb;