import joi from "joi"


const addCategoryVal=joi.object({
    name: joi.string().min(2).required(),
    slug: joi.string(),
    createdBy: joi.string().hex().length(24)
})
const updateCategoryVal=joi.object({
    name: joi.string().min(2).required(),
    slug: joi.string(),
    id: joi.string().hex().length(24).required()
})

const getAllCategoriesVal=joi.object({
    page: joi.number().integer().min(1).default(1),
    sort:joi.string().min(2),
    name:joi.string().min(2),
    slug:joi.string().min(2),
    search:joi.string().min(1),
    fields:joi.string().min(1),
})

export{
    addCategoryVal,
    updateCategoryVal,
    getAllCategoriesVal
}