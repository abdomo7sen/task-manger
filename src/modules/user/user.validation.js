import joi from "joi";
 const updateUserShemaVal=joi.object({
    userName:joi.string().min(2).max(20),
    email:joi.string().email(),
    id:joi.string().hex().length(24).required(),
}).required()

export{
    updateUserShemaVal

}