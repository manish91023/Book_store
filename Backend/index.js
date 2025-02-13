import dotenv from "dotenv"
dotenv.config();


import bodyParser from 'body-parser';
import { v2 as cloudinary } from 'cloudinary';
import express from "express";
const app=express();
import mongoose from "mongoose";
import courseRoute from "./Routes/course.route.js"
import userRoute from "./Routes/user.route.js"
import fileUpload from "express-fileupload";


const port=process.env.PORT
const DBURI=process.env.MONGO_URI;

await mongoose.connect(DBURI)
.then(console.log("connected succesfully"))
.catch( err=>console.log(err))
  

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


app.listen(port,(err)=>{
    if(!err)console.log("running at ",port)
})