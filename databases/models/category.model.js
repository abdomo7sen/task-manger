import { model, Schema, Types } from "mongoose";

const categorySchema= new Schema({
    name:{
        type:String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short category name']
    },
    slug:{
        type: String,
        lowercase: true,
    },
    createdBy:{
        type: Types.ObjectId,
        ref: 'User'
    },
},{timestamps: true , versionKey: false})

export const Category = model('Category', categorySchema)