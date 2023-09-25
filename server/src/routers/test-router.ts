import { ControllerFactory } from "@factory/controller-factory";
import JoiSchema from "@misc/joi-schemas";
import NodeModel, { INode, INodeModel } from "@models/node-model";
import { uploadtoSpaces } from "@services";
import { Router } from "express";
import { Model, Types } from "mongoose";

type CustomNode = INode<false, { cover: string }>;

const Controller = new ControllerFactory(
    NodeModel as unknown as Model<CustomNode, INodeModel>
);
const router = Router();
const postOne = Controller.postOne({
    body: {
        name: {
            schema: JoiSchema.name,
        },
        file: {
            mimetypes: ["IMAGE"],
            // required: true,
            async upload(file) {
                const { path } = await uploadtoSpaces(file);
                return path;
            },
            required: true,
            setAs: "details.cover",
        },
        branch: {
            schema: JoiSchema._id,
        },
    },
    preprocess: (req, res, next, item) => ({
        ...item,
        createdBy: new Types.ObjectId(req.session.user!._id),
    }),
});

router.post("/", postOne);

export default router;
