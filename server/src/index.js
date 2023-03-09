import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

if(process.env.NODE_ENV !== "production"){
    dotenv.config()
}

const app=express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DATABASE_URL)
const db=mongoose.connection
db.on("error",error=>console.log("mongodb connection error ",error))
db.once("open",()=>console.log("connected to mongoose"))
app.listen(3001,()=>console.log("server started"))