import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "./category.controller.js";
import { catchError } from "../../middleware/catchError.js";
import { validate } from "../../middleware/validation.js";
import { addCategoryVal, getAllCategoriesVal, updateCategoryVal } from "./category.validation.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import taskRouter from "../task/task.routes.js";

const categoryRouter=Router()

categoryRouter.use('/:id/tasks',taskRouter)

categoryRouter.route("/")
.post(verifyToken,validate(addCategoryVal),catchError(addCategory))
.get(verifyToken,validate(getAllCategoriesVal),catchError(getAllCategories))

categoryRouter.route('/:id')
.get(verifyToken,catchError(getCategory))
.put(verifyToken,validate(updateCategoryVal),catchError(updateCategory))
.delete(verifyToken,catchError(deleteCategory))
export default categoryRouter