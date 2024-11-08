import joi from "joi"


const addTaskVal=joi.object({
    tasks:joi.array().items(joi.string()),
    status:joi.string().min(2),

    createdBy: joi.string().hex().length(24),
    category: joi.string().hex().length(24).required()
})
const updateTaskVal=joi.object({
    tasks:joi.array().items(joi.string()),
    id: joi.string().hex().length(24).required()
})

const getAllTasksVal=joi.object({
    page: joi.number().integer().min(1).default(1),
    sort:joi.string().min(2),
    all:joi.string().min(2),
    status:joi.string().min(2),
    search:joi.string().min(1),
    fields:joi.string().min(1),
    id:joi.string().hex().length(24)
})

export{
    addTaskVal,
    updateTaskVal,
    getAllTasksVal
}