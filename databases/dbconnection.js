import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path:"./config/.env"})
    export const conn = await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log('mongoDB connected successfully')})
    .catch ((error)=> {
        console.log(error);
    })
