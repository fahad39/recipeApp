import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import https from "https"
import fs from "fs"
import dotenv from "dotenv"
import {userRouter} from "./routes/users.js"
import {recipesRouter} from "./routes/recipes.js"

if(process.env.NODE_ENV !== "production"){
    dotenv.config()
}

const app=express()
const options = {
  key: fs.readFileSync("C:/Users/fahad.hussain/key.pem"),
  cert: fs.readFileSync("C:/Users/fahad.hussain/cert.pem")
};
app.use(cors({
    origin:"https://localhost:3000",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type"]
}))

app.use(express.json())

app.use("/auth",userRouter)
app.use("/recipes",recipesRouter)
const server = https.createServer(options,app);

mongoose.connect("mongodb+srv://fahadHussain:LockheedSR71@recipes.a0xuvug.mongodb.net/recipes?retryWrites=true&w=majority")
const db=mongoose.connection
db.on("error",error=>console.log("mongodb connection error ",error))
db.once("open",()=>console.log("connected to mongoose"))
server.listen(3001,()=>console.log("server started"))