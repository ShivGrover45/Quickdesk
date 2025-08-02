import mongoose from "mongoose";

const schema= mongoose.Schema;
const commentSchema = new schema({
     content: { 
        type: String,
         required: true },
  ticket: 
  { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ticket', 
    required: true 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true },
  createdAt: { type: Date,
     default: Date.now 
    }
})

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;