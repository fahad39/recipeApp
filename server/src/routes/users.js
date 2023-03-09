import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserModel } from "../models/Users.js"

const router=express.Router()

router.post("/register",async (req,res)=>{
    const {userName,password}=req.body;
    const user=await UserModel.findOne({userName})
    if(user){
        return res.json({message:"User already exist!"})
    }

    const hashedPassword= await bcrypt.hash(password,10)
    const newUser=new UserModel({userName,password:hashedPassword})
    await newUser.save()
    res.json({message:"User created sucessfully!"})
})

router.post("/login",async (req,res)=>{
    const {userName,password}=req.body;
    const user=await UserModel.findOne({userName})

    if(!user){
        return res.json({message:"User doesn't exist"})
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.json({message:"Invalid Password!"})
    }

    const token=jwt.sign({id: user._id},"secret")
    res.json({token,userID:user._id})
} )

export {router as userRouter}