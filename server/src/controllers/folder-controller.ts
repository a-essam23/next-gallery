import { ControllerFactory } from "@factory/controller-factory";
import JoiSchema from "@misc/joi-schemas";
import Branch, { IBranch } from "@models/branch-model";
import { INodeModel } from "@models/node-model";
import Joi from "joi";
import { Model } from "mongoose";

export type FolderDocument = IBranch<true, { cover?: string }>;
export const FolderModel = Branch as unknown as Model<
    FolderDocument,
    INodeModel
>;

const Controller = new ControllerFactory(FolderModel);

export const getOneFolder = Controller.getOne({
    key: "name",
    query: {
        name: {
            schema: JoiSchema.name.label("Folder name"),
        },
    },
    populate: ["createdBy", "nodes"],
});

export const getAllFolder = Controller.getAll({});

export const postOneFolder = Controller.postOne({
    body: {
        name: {
            schema: JoiSchema.name,
        },
        details: { schema: Joi.object() },
        cover: {
            mimetypes: ["IMAGE"],
            count: 1,
            setAs: "details.cover",
        },
        branch: {
            schema: JoiSchema._id.optional(),
        },
        type: {
            schema: Joi.string().valid("group", "collection", "album"),
        },
    },
    preprocess: (req, res, next, payload) => {
        return { ...payload, createdBy: req.session.user!._id };
    },
});
