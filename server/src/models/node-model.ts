import { Model, ObjectId, Schema, Types, model } from "mongoose";

export type NodePublic = INode<true>;
export type INode<
    isPublic extends boolean = false,
    Details extends object = {}
> = {
    _id: Types.ObjectId;
    name: string;
    branch: ObjectId;
    createdBy: Types.ObjectId;
    details: Details;
    type: string;
} & (isPublic extends true
    ? {
          createdAt: Date;
          updatedAt: Date;
      }
    : {});

type NodeModelMethods = {};
export type INodeModel = Model<INode, {}, NodeModelMethods>;

const nodeSchema = new Schema<INode, INodeModel, NodeModelMethods>(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            minlength: 1,
            maxlength: 128,
        },
        branch: {
            type: Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        details: {
            type: Schema.Types.Mixed,
            default: {},
        },
        type: {
            type: String,
            minlength: 1,
            maxlength: 128,
        },
    },
    {
        timestamps: true,
    }
);

const Node = model<INode, INodeModel>("Node", nodeSchema);

export default Node;
