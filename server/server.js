import express from "express";
import connectDB from "./database/mongodb.js";
import authRouter from "./router/auth.router.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.listen(5000, async () => {
  console.log("server running on port:5000");
  await connectDB();
});
