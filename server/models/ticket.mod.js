import { ServerMonitoringMode } from "mongodb";
import mongoose from "mongoose";

const schema = mongoose.Schema;
const ticketSchema = new schema({
    ticketId:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    //title of the ticket
    ticket:{
        type:String,
        required:true,
        maxLength:50,
        trim:true
    },
    description:{
        type:String,
        required:true,
        maxLength:255,
        trim:true
    },
    status:{
        type:String,
        required:true,
        enum:["open","in_progress","closed"],
        default:"open"
    },
    //progress of the ticket
    progress:{
        type:String,
        required:true,
        enum:["pending","in progess","completed"],
        default:"pending"
    },
    //priority of the ticket 
    priority:{
        type:String,
        required:true,
        enum:["low","medium","high"],
        default:"medium"
    },
    createdBy:{
        type:schema.Types.ObjectId,
        ref:user,
        required:true,
    },
    assignedTo: { 
        type: schema.Types.ObjectId,
         ref: agent,
        required: true,
     },
     createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
     });


const ticketModel = mongoose.model("Ticket", ticketSchema);
export default ticketModel;