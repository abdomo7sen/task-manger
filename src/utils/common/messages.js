export const generalMessage =(entity)=>({
    CreatedSuccessfully:`${entity} created successfully`,
    UpdatedSuccessfully:`${entity} updated successfully`,
    DeletedSuccessfully:`${entity} deleted successfully`,
    CreatedFailed:`Failed to create ${entity}`,
    UpdatedFailed:`Failed to update ${entity}`,
    DeletedFailed:`Failed to delete ${entity}`,
    NotFound:`${entity} not found`,
    AlreadyExists:`${entity} already exists`,
    Success:`Success `,
    IsRequired: `Is Requierd`

})

export const messages={
    User:{...generalMessage("user"),
        userSignedInSuccessfully:"User signed in",
        accountVerifiedSuccessfully:"Account verified successfully",
        mustLogin:"User must login",
        userNotAuthorized:"User is not authorized"
    },
    password:{...generalMessage("password"),
        passwordsNotMatch:"rePassword does not match",
        emailOrPasswordIncorrect:"email or password is incorrect",
    },
    token:{
        ...generalMessage("token"),
        invalidToken:"invalidToken",
        required:"token is required",
        invalidBearerKey:"invalidBearerKey",
        invalidPayload:"invalidPayload",
        },
    email:{...generalMessage("email"),
        emailNotExists:"Email not exists",
        emailNotVerified:"Email not verified",
        accountsFound:"Accounts found"
    },
    mobileNumber:{...generalMessage("mobileNumber"),
        mobileNumberNotExists:"Mobile number",
        
    },
    otp:{
        ...generalMessage("otp"),
    invalidOtp:"invalid Otp",
    otpExpired:"otp expired",
        },
    Category:{...generalMessage("category"),},
    Task:{...generalMessage("task"),},
}