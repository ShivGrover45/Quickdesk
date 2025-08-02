
import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(`mongodb://localhost:27017/quickdesk`)
        console.log("MongoDb connected")
    }
    catch(err){
        console.error("error connecting to MongoDb",err);
        exit(1)
    }
}
export default connectDB;