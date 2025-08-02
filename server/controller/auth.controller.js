import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'
export const signUp=async (req,res,next)=>{ 
   
   try{ 
      const {name,email,password}=req.body
     const existingUser=await user.findOne({email})
     if(existingUser){
      const error=new Error("user already exist")
      error.statusCode=409
      throw error
      
     }
    const salt=await bcrypt.genSalt(8)
    const hashedPassword=await bcrypt.hash(password,salt)
    const newUser=await userModel.create({username:name,email,password:hashedPassword})
    const token=jwt.sign({user_id:newUser._id},"secret",{expiresIn:'1d'})
     res.status(201).json({
      success:true,
      message:"user created",
      data:{
         token,
         newUser
      }
    }
    )
   }catch(error){
     next(error)
   }
}
export const signIn=async(req,res,next)=>{
   try{
      const {email,password}=req.body
      const user=await userModel.findOne({email})
      if(!user){
         const error=new Error("User not found" )
         error.statusCode=404
         throw error
      }
      console.log(user)
      console.log(user.password)
      console.log(password)
      const validPassword=await bcrypt.compare(password,user.password)
      if(!validPassword){
         const error=new Error("Invalid Password")
         error.statusCode=403
         throw error
      }
      const token= jwt.sign({user_id:user._id},JWT_SECRET_KEY,{expiresIn:JWT_EXPIRES_IN})
      res.status(200).json({
            success:true,
            message:"Verification Successfull",
            data:{user,token}
         })
   }catch(error){
      console.log(error.message)
      next(error)
   }
}