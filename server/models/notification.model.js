import mongoose from "mongoose";
const schema = mongoose.Schema;
const notificationSchema = new schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: user, 
        required: true 
    },
  message: {
     type: String, 
     required: true 
    },
  ticket: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: ticket},
  isRead: { type: Boolean, 
    default: false 
},
  createdAt: { type: Date,
     default: Date.now 
    }
});
const notificationModel = mongoose.model("Notification", notificationSchema);
export default notificationModel;