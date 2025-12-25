import mongoose from "mongoose";

const connectDB = async() => {
    try{
        const connectDB = await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDb connected");
    } catch(error){
        console.log(`error:${error.message}`);
        process.exit(1);
    }
};

export default connectDB;