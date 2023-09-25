import { Model, Schema, Types, model } from "mongoose";
export type BranchPublic = IBranch<true>;
export type IBranch<
    isPublic extends boolean = false,
    Details extends {} = {}
> = {
    _id: Types.ObjectId;
    name: string;
    branches: Types.ObjectId[];
    nodes: Types.ObjectId[];
    createdBy: Types.ObjectId;
    details: Details;
    type: string;
} & (isPublic extends true
    ? {
          createdAt: Date;
          updatedAt: Date;
      }
    : {});
type BranchModelMethods = {};
export type BranchModel = Model<IBranch, {}, BranchModelMethods>;

const branchSchema = new Schema<IBranch, BranchModel, BranchModelMethods>(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            minlength: 1,
            maxlength: 128,
        },
        branches: [{ type: Schema.Types.ObjectId, ref: "Branch" }],
        nodes: [{ type: Schema.Types.ObjectId, ref: "Node" }],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        details: { type: Object },
        type: {
            type: String,
            minlength: 1,
            maxlength: 128,
        },
    },
    { timestamps: true }
);

const Branch = model<IBranch, BranchModel>("Branch", branchSchema);

export default Branch;
