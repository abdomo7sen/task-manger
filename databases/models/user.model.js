import { model, Schema } from "mongoose";
const USER_COLLECTION_NAME = "user"

const userSchema = new Schema({
    
    userName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    rePassword:{
        type: String,
        required: true,
        ref: 'password'
    },verifyEmail:{
        type:Boolean,
        default:false
    },
    otpCode:String,
    otpExpires:Date,

}, {timestamps: true})


export const User= model(USER_COLLECTION_NAME,userSchema)