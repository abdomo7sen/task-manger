import { Router } from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "./user.controller.js";
import { catchError } from "../../middleware/catchError.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { validate } from "../../middleware/validation.js";
import { updateUserShemaVal } from "./user.validation.js";
import { allowedTo, protectedRoutes } from "../../middleware/auth.middleware.js";
import { systemRole } from "../../utils/common/enum.js";

const userRouter=Router()
userRouter.use(verifyToken)
userRouter.route("/")
.get(protectedRoutes,allowedTo(systemRole.ADMIN),catchError(getAllUsers))

userRouter.route('/:id')
.get(catchError(getUser))
.put(validate(updateUserShemaVal),catchError(updateUser))
.delete(catchError(deleteUser))
export default userRouter