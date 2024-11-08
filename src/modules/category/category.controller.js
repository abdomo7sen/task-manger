import slugify from "slugify"
import { messages } from "../../utils/common/messages.js"
import { AppError } from "../../utils/appError.js"
import { ApiFeature } from "../../utils/apiFeature.js"
import { Category } from "../../../databases/models/category.model.js"


const addCategory= async (req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    let {user}=req
    req.body.createdBy=user.userId
    const category=new Category(req.body)
    await category.save()
    res.status(201).json({message:messages.Category.CreatedSuccessfully,category})
}

const getAllCategories=async (req,res,next)=>{
    let apiFeature=new ApiFeature(Category.find(),req.query).pagination().filter().sort().search().fields()

    const categories=await apiFeature.mongoQuery

    res.json({page:apiFeature.pageNumber,limit:apiFeature.limit,categories})
}
const getCategory=async(req,res,next)=>{
    const category=await Category.findById(req.params.id)
    category || next(new AppError(messages.Category.NotFound,404))
    !category||res.json({message:messages.Category.Success,category})
    
}

const updateCategory=async (req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    const category=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
    category || next(new AppError(messages.Category.NotFound,404))
    !category||res.json({message:messages.Category.UpdatedSuccessfully,category})
}
const deleteCategory=async (req,res,next)=>{
    const category=await Category.findByIdAndDelete(req.params.id,{new:true})
    category || next(new AppError(messages.Category.NotFound,404))

    !category||res.status(200).json({message:messages.Category.DeletedSuccessfully,task})
}


export{
    addCategory,getAllCategories,getCategory,updateCategory,deleteCategory
}