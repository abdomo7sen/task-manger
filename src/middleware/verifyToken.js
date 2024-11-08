import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config({path:"./config/.env"})


export const verifyToken=(req,res,next)=>{
    let {token}=req.headers
    jwt.verify(token,process.env.JWT_KEY,async(err,decoded)=>{
        if(err) return res.status(403).json({message:"token is not valid"})
            
        req.user=decoded
        next()
    })
}