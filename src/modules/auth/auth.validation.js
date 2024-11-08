import joi from "joi";
 const signupSchemaVal=joi.object({
    userName:joi.string().min(2).max(20),
    email:joi.string().email().required(),
    password:joi.string().min(8).pattern(/^[A-z][A-Za-z0-9]{8,40}$/).required(),
    rePassword:joi.valid(joi.ref("password")).required()
}).required()

 const signinSchemaVal=joi.object({
    email:joi.string().email(),
    password:joi.string().min(8).pattern(/^[A-z][A-Za-z0-9]{8,40}$/).required(),

}).required()

export {
    signupSchemaVal,
    signinSchemaVal
 
}