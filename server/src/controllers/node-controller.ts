import { ControllerFactory } from "@factory/controller-factory";
import JoiSchema from "@misc/joi-schemas";
import Branch from "@models/branch-model";
import Node from "@models/node-model";
import { AppError } from "@utils";

const Controller = new ControllerFactory(Node);

export const getOneNode = Controller.getOne({
    key: "_id",
    query: {
        _id: {
            schema: JoiSchema._id,
        },
    },
    populate: ["branch"],
});

export const getAllNode = Controller.getAll({
    populate: [{ path: "branch", select: "_id name" }],
});

export const postOneNode = Controller.postOne({
    body: {
        name: {
            schema: JoiSchema.name,
        },
        branch: {
            schema: JoiSchema._id.label("branch id"),
            async validate(val) {
                const branch = await Branch.findById(val);
                if (!branch)
                    return AppError.createDocumentNotFoundError("branch");
            },
        },
        cover: {
            mimetypes: ["IMAGE"],
            count: 1,
            required: true,
        },
    },
    preprocess: (req, res, next, payload) => {
        return { ...payload, createdBy: req.session.user!._id };
    },
});
