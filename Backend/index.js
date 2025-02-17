import dotenv from "dotenv"
dotenv.config();


import bodyParser from 'body-parser';
import { v2 as cloudinary } from 'cloudinary';
import express from "express";
const app=express();
import mongoose from "mongoose";
import courseRoute from "./Routes/course.route.js"
import userRoute from "./Routes/user.route.js"
import adminRoute from "./Routes/admin.route.js"
import orderRoute from "./Routes/order.route.js"
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path"
import { fileURLToPath } from "url";


const port=process.env.PORT
const DBURI=process.env.MONGO_URI;


const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

// app.use(express.static(path.join(__dirname,)))
console.log(path.join(__dirname,'/Frontend/bookstore/dist'))



await mongoose.connect(DBURI)
.then(console.log("connected succesfully"))
.catch( err=>console.log(err))
  

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
        

}))
 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret:process.env.api_secret // Click 'View API Keys' above to copy your API secret
});


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/admin",adminRoute);
app.use("/api/v1/order",orderRoute);


app.listen(port,(err)=>{
    if(!err)console.log("running at ",port)
})