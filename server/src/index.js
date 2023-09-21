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
  key: fs.readFileSync(process.env.SSL_KEY_FILE),
  cert: fs.readFileSync(process.env.SSL_CRT_FILE)
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

mongoose.connect(process.env.DATABASE_URL)
const db=mongoose.connection
db.on("error",error=>console.log("mongodb connection error ",error))
db.once("open",()=>console.log("connected to mongoose"))
server.listen(3001,()=>console.log("server started"))