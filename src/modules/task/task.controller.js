import { messages } from "../../utils/common/messages.js"
import { AppError } from "../../utils/appError.js"
import { ApiFeature } from "../../utils/apiFeature.js"
import { Task } from "../../../databases/models/task.model.js"


const addTask= async (req,res,next)=>{
    if(!req.body.tasks) return next(new AppError(messages.Task.IsRequired))    
        let {user}=req
    req.body.createdBy=user.userId
    const task=new Task(req.body)
    await task.save()
    res.status(201).json({message:messages.Task.CreatedSuccessfully,task})
}

const getAllTasks=async (req,res,next)=>{


    let apiFeature=new ApiFeature(Task.find(),req.query).pagination().filter().sort().search().fields()

    const tasks=await apiFeature.mongoQuery

    res.json({page:apiFeature.pageNumber,limit:apiFeature.limit,tasks})
}

const getTask = async (req,res,next)=>{
    const task=await Task.findById(req.params.id)
    task || next(new AppError(messages.Task.NotFound,404)) 

    !task||res.json({task})
}

const updateTask=async (req,res,next)=>{
    let {user}=req
    const task=await Task.findByIdAndUpdate({_id:req.params.id,createdBy:user.userId},req.body,{new:true})
    task || next(new AppError(messages.Task.NotFound,404))
    !task||res.json({message:messages.Task.UpdatedSuccessfully,task})
}

const deleteTask=async (req,res,next)=>{
    const task=await Task.findByIdAndDelete(req.params.id,{new:true})
    task || next(new AppError(messages.Task.NotFound,404))

    !task||res.status(200).json({message:messages.Task.DeletedSuccessfully,task})
}


export{
    addTask,getAllTasks,getTask,updateTask,deleteTask
}
