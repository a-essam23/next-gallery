import { ControllerFactory } from "@factory/controller-factory";
import JoiSchema from "@misc/joi-schemas";
import Branch from "@models/branch-model";
import Joi from "joi";

const Controller = new ControllerFactory(Branch);

export const getOneBranch = Controller.getOne({
    key: "_id",
    query: {
        _id: {
            schema: JoiSchema._id,
        },
    },
    populate: ["createdBy", "nodes"],
});

export const getAllBranches = Controller.getAll({});

export const postOneBranch = Controller.postOne({
    body: {
        name: {
            schema: JoiSchema.name,
        },
        details: { schema: Joi.object() },
    },
    preprocess: (req, res, next, payload) => {
        return { ...payload, createdBy: req.session.user!._id };
    },
});
