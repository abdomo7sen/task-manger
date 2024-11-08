import { Router } from "express";
import { catchError } from "../../middleware/catchError.js";
import { validate } from "../../middleware/validation.js";
import {signupSchemaVal,signinSchemaVal} from "./auth.validation.js"
import { signinVal, signupVal, verifyOtp } from "../../middleware/auth.middleware.js";
import { signin, signUp } from "./auth.controller.js";

const authRouter= Router()

authRouter.post("/signup",validate(signupSchemaVal),signupVal,catchError(signUp));
authRouter.post("/sign-in",validate(signinSchemaVal),signinVal,catchError(signin));

authRouter.post("/verify",catchError(verifyOtp))

export default authRouter