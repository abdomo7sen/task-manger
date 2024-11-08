import { messages } from "../../utils/common/messages.js"
import { AppError } from "../../utils/appError.js"
import { ApiFeature } from "../../utils/apiFeature.js"
import { User } from "../../../databases/models/user.model.js"



const getAllUsers=async (req,res,next)=>{
    let apiFeature=new ApiFeature(User.find(),req.query).pagination().filter().sort().search().fields()

    const user=await apiFeature.mongoQuery
    user.forEach(element => {
        element.password=undefined
        element.rePassword=undefined
        element.otpCode=undefined
        element.otpExpires=undefined
    });
    res.json({page:apiFeature.pageNumber,limit:apiFeature.limit,user})
}
const getUser=async (req,res,next)=>{
    let {user }=req
    if (user.userId==req.params.id){
        const oneUser=await User.findById(req.params.id)
        oneUser || next(new AppError(messages.User.NotFound,404)) 

    !oneUser||res.json({oneUser})
    }else{
    const oneUser=await User.findById(req.params.id)

    oneUser.password = undefined;
    oneUser.rePassword = undefined;
    oneUser.otpCode = undefined;
    oneUser.otpExpires = undefined;
    oneUser || next(new AppError(messages.User.NotFound,404)) 

    !oneUser||res.json({oneUser})
    }
}

const updateUser=async (req,res,next)=>{
    let {user}=req
    if (req.body.email) {
        let Match=await User.findOne({email:req.body.email,_id:{$ne:user.userId}})
        if (Match){
            return next(new AppError(messages.email.AlreadyExists,401))
        }else{
            const updatedUser=await User.findByIdAndUpdate(user.userId,req.body,{new:true})
            updatedUser || next(new AppError(messages.User.NotFound,404))
        
            !updatedUser||res.json({message:messages.User.UpdatedSuccessfully,updatedUser})
        
        }

    }
    else{
    const updatedUser=await User.findByIdAndUpdate(user.userId,req.body,{new:true})
    updatedUser || next(new AppError(messages.User.NotFound,404))

    !updatedUser||res.json({message:messages.User.UpdatedSuccessfully,updatedUser})
    }
}
const deleteUser=async (req,res,next)=>{
    let {user}=req

    const deletedUser=await User.findByIdAndDelete(user.userId,{new:true})
    deletedUser || next(new AppError(messages.User.NotFound,404))

    !deletedUser||res.status(200).json({message:messages.User.DeletedSuccessfully,deletedUser})
}


export{
    getAllUsers,getUser,updateUser,deleteUser
}