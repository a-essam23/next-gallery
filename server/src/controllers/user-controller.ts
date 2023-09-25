import { ControllerFactory } from "@factory/controller-factory";
import User from "@models/user-model";
import JoiSchema from "@misc/joi-schemas";
const Controller = new ControllerFactory(User);

export const getOneUser = Controller.getOne({
    key: "username",
    query: {
        username: {
            schema: JoiSchema.username,
        },
    },
});

export const createOneUser = Controller.postOne({
    body: {
        username: {
            schema: JoiSchema.username,
        },
        email: {
            schema: JoiSchema.email,
        },
        password: {
            schema: JoiSchema.password,
        },
    },
});
