import { model, Schema, Types } from "mongoose";
import { status} from "../../src/utils/common/enum.js";
const TASK_COLLECTION_NAME = "Task"

const taskSchema= new Schema({
    tasks:{ type: [String]},
    staus:{
        type: String,
        enum:Object.values(status),
        default:status.INCOMPELTED
    },
    category:{
        type: Types.ObjectId,
        ref: 'Category'
    },
    createdBy:{
        type: Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true , versionKey: false})

export const Task = model(TASK_COLLECTION_NAME, taskSchema)