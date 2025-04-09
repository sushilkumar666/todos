import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log(process.env.DATABASE_URL as string + " this is my database url")
        await mongoose.connect(process.env.DATABASE_URL as string);
        console.log("mongoDB connected")
    } catch (error: any) {
        console.error("mongodb connection error " + error.message)
        process.exit(1)
    }
}

export default connectDB;