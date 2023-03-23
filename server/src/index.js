import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import http from "http"
import dotenv from "dotenv"
import {userRouter} from "./routes/users.js"

if(process.env.NODE_ENV !== "production"){
    dotenv.config()
}

const app=express()
app.use(cors())

app.use(express.json())

app.use("/auth",userRouter)
const server = http.createServer(app);

mongoose.connect("mongodb+srv://fahadHussain:LockheedSR71@recipes.a0xuvug.mongodb.net/recipes?retryWrites=true&w=majority")
const db=mongoose.connection
db.on("error",error=>console.log("mongodb connection error ",error))
db.once("open",()=>console.log("connected to mongoose"))
server.listen(3001,()=>console.log("server started"))