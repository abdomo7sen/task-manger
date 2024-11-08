import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "./category.controller.js";
import { catchError } from "../../middleware/catchError.js";
import { validate } from "../../middleware/validation.js";
import { addCategoryVal, getAllCategoriesVal, updateCategoryVal } from "./category.validation.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import taskRouter from "../task/task.routes.js";

const categoryRouter=Router()

categoryRouter.use('/:id/tasks',taskRouter)

categoryRouter.route("/",verifyToken)
.post(validate(addCategoryVal),catchError(addCategory))
.get(validate(getAllCategoriesVal),catchError(getAllCategories))

categoryRouter.route('/:id',verifyToken)
.get(catchError(getCategory))
.put(validate(updateCategoryVal),catchError(updateCategory))
.delete(catchError(deleteCategory))
export default categoryRouter