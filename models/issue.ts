import { Model, Schema, Types, model } from "mongoose";

export interface IIssue {
    title: string,
    desc: string,
    priority: number,
    user: Types.ObjectId,
    createdAt: Date,
}

const IssueSchema = new Schema<IIssue>({
    title: {
        type: String,
        required: [true, "The title is required"]
    },
    desc: {
        type: String,
        required: [true, "The description is required"]
    },
    priority: {
        type: Number,
        required: [true, "The priority is required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const Issue: Model<IIssue> = model<IIssue>("Issue", IssueSchema)

export default Issue