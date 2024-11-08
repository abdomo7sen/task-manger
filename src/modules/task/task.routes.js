import { Router } from "express";
import { catchError } from "../../middleware/catchError.js";
import { validate } from "../../middleware/validation.js";
import { addTaskVal, getAllTasksVal, updateTaskVal } from "./task.validation.js";
import { addTask, deleteTask, getAllTasks, getTask, updateTask } from "./task.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const taskRouter=Router({mergeParams:true})
taskRouter.use(verifyToken)

taskRouter.route("/")
.post(validate(addTaskVal),catchError(addTask))
taskRouter.get("/",validate(getAllTasksVal),catchError(getAllTasks))

taskRouter.route('/:id')
.get(catchError(getTask))
.put(validate(updateTaskVal),catchError(updateTask))
.delete(catchError(deleteTask));
export default taskRouter