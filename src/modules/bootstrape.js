import categoryRouter from "./category/category.routes.js"
import taskRouter from "./task/task.routes.js"
import userRouter from "./user/user.routes.js"
import authRouter from "./auth/auth.routes.js"


export const bootstrape=(app)=>{
    
    app.use('/api/auth',authRouter)
    app.use('/api/users',userRouter)
    app.use('/api/tasks',taskRouter)
    app.use('/api/categories',categoryRouter)
    
}

