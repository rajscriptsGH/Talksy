import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`db connected ${connect.connection.host}`);

    } catch (error) {
        console.log("Error connecting db", error);
        process.exit(1)
    }
}