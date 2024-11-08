import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { AppError } from "../utils/appError.js"
import { messages } from "../utils/common/messages.js"
import { sendEmail } from "../utils/email/sendEmail.js"
import { User } from '../../databases/models/user.model.js'
import dotenv from "dotenv";
dotenv.config({path:"./config/.env"})

const signupVal=async(req, res,next) => {
    const userExist=await User.findOne({email:req.body.email})
    const hashedPassword=await bcrypt.hash(req.body.password,8)
    req.body.otpCode=Math.floor((Math.random()*1000000)+1);
    req.body.otpExpires=new Date(new Date().getTime()+10*60*1000)
    if(userExist&&userExist.verifyEmail==true){
        return next(new AppError(messages.User.AlreadyExists,409))
    }
    else if(userExist&&userExist.verifyEmail==false){
        return sendEmail(userExist.email,userExist.otpCode)
    }
    if (req.body.password==req.body.rePassword){
        req.body.password=hashedPassword
        req.body.rePassword=hashedPassword
    return next()
    }else{
   return next(new AppError(messages.password.passwordsNotMatch,400))
}

}
const signinVal=async(req, res,next) => {
    const userExist=await User.findOne({email:req.body.email})

    if(!userExist||!bcrypt.compare(req.body.password,userExist.password)||userExist.verifyEmail==true){
        jwt.sign({userId:userExist._id,email:req.body.email},process.env.JWT_KEY,(err,token) => {
            
            req.token=token
            return next()

        })
        
        
    }
    else if(!userExist||!bcrypt.compare(req.body.password,userExist.password)||userExist.verifyEmail==true){
        return next(new AppError(messages.password.emailOrPasswordIncorrect,401))
    }
    else if(!userExist||!bcrypt.compare(req.body.password,userExist.password)||userExist.verifyEmail==false){
        
        return next(new AppError(messages.email.emailNotVerified,409))&&sendEmail(req.body.email) 
    }
    

}
const verifyOtp=async(req,res,next)=>{
    const otpCode=req.body.otpCode
    const otpDate=new Date().getTime()
    let user=await User.findOne({otpCode,otpExpires:{$gt:otpDate}})
    if(!user){
        return next(new AppError(messages.otp.invalidOtp,401))
    }
    else{
        user=await User.findOneAndUpdate({otpCode},{verifyEmail:true})
        return res.status(200).json({messages:messages.User.accountVerifiedSuccessfully,user})
    }
}

const protectedRoutes=async (req, res,next) => {
    let {token}=req.headers
    let userPayload=null
    if(!token) return next(new AppError(messages.token.required,404))
    
    jwt.verify(token,process.env.JWT_KEY,(err,data)=>{
        if (err) return next(new AppError(messages.err,403))
        userPayload=data
    })

    let user=User.findById(userPayload.userId)
    if(!user) return next(new AppError(messages.User.NotFound,404))
    
        if(user.passwordChangedAt){
            let time= parseInt(user.passwordChangedAt.getTime()/1000)

            if (time >token.iat) return next(new AppError(messages.token.invalidToken,404))
        
        }
        req.user=userPayload
    return next()
}

const allowedTo=(...roles)=>{
    return async (req,res,next)=>{
        
        if(!roles.includes(req.user.role)){
            return next(new AppError(messages.User.userNotAuthorized,400))
        }
        return next()
    }
}


export{
    signupVal,
    signinVal,
    protectedRoutes,
    allowedTo,
    verifyOtp
}