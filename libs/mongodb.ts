import mongoose from "mongoose";

const connectMongoDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string); // Type assertion
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectMongoDB;