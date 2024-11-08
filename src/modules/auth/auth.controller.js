import jwt from "jsonwebtoken"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/common/messages.js"
import { sendEmail } from '../../utils/email/sendEmail.js'
import { User } from "../../../databases/models/user.model.js"

//signup
const signUp=async(req,res,next)=>{
    const user=new User(req.body)
    // save  user    
    
    sendEmail(user.email,user.otpCode)
    await user.save()
    res.status(201).json({messages: messages.User.CreatedSuccessfully,user})
}

//signin
const signin=(req,res,next)=>{
    
    res.status(200).json({messages: messages.User.userSignedInSuccessfully,token:req.token})

};




export{
    signUp,
    signin
}