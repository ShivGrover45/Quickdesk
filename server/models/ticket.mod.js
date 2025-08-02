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
    prior

})

const ticketModel = mongoose.model("Ticket", ticketSchema);
export default ticketModel;