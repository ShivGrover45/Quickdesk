// controller/auth.controller.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';

// Simplified error handler
const handleError = (res, status, message) => {
  return res.status(status).json({ success: false, error: message });
};

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Basic validation
    if (!name || !email || !password) {
      return handleError(res, 400, 'All fields are required');
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return handleError(res, 409, 'User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = await userModel.create({
      username: name,
      email,
      password: hashedPassword
    });

    // For hackathon, we'll use a simple secret
    const token = jwt.sign({ userId: newUser._id }, 'hackathon-secret', { expiresIn: '1d' });

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: newUser._id,
          name: newUser.username,
          email: newUser.email
        }
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    handleError(res, 500, 'Internal server error');
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return handleError(res, 400, 'Email and password are required');
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return handleError(res, 401, 'Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return handleError(res, 401, 'Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, 'hackathon-secret', { expiresIn: '1d' });

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.username,
          email: user.email
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    handleError(res, 500, 'Internal server error');
  }
};
export const getUser=async(req,res,next)=>{
   try{
      const user=await userModel.findById(req.params.id)
      if(!user){
         const error=new Error("User not found")
         error.statusCode=404
         throw error
      }
      res.status(200).json({
         success:true,
         message:"User fetched successfully",
         data:user
      })
   }catch(error){
      console.log(error.message)
      next(error)
   }
}
export const updatedUser=async(req,res,next)=>{
   try{
    const id=req.params.id
    const {username,email,avatar}=req.body
    const user=await userModel.findOne({id})
    if(!user){
      const error=new Error("User not found")
      error.statusCode=404
      throw error
    }
    const updatedUser=await userModel.findByIdAndUpdate(id,{
      username,email,avatar,updatedAt:Date.now()
    },{new:true})
   }catch(error){
      console.log(error.message)
      next(error)
   }
}