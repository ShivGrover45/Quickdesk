import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user","agent"],
        default: "user"
    },
    avatar:String,
    department:String,
    createdAt: { type: Date, default: Date.now()},
    updatedAt: { type: Date, default: Date.now() }
})
const userModel = mongoose.model("User", userSchema);
export default userModel;
