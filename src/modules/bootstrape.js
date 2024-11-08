import { authRouter } from "./auth/auth.routes.js"
import taskRouter from "./task/task.routes.js"
import userRouter from "./user/user.routes.js"


export const bootstrape=(app)=>{
    
    app.use('/api/auth',authRouter)
    app.use('/api/users',userRouter)
    app.use('/api/tasks',taskRouter)
    
}

