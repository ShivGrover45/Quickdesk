import express from 'express';
import connectDB from './database/mongodb.js';

const app=express()

app.listen(3000,async ()=>{
    console.log('server running on port:3000')
    await connectDB()
})