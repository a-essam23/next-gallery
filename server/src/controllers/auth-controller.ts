import User from "@models/user-model";
import { ControllerFactory } from "@factory/controller-factory";
import JoiSchema from "@misc/joi-schemas";
import { AppError } from "@utils";

const Controller = new ControllerFactory(User);

export const logout = Controller.getOne({
    operation(req, res, next, Model) {
        const { session } = req;
        const { user } = session;
        if (!user)
            throw AppError.createError(
                400,
                "No login information",
                "LogoutAttemptError"
            );
        delete session.user;
    },
});

export const login = Controller.postOne({
    body: {
        username: {
            schema: JoiSchema.username,
        },
        password: {
            schema: JoiSchema.password,
        },
    },
    async operation(req, res, next, Model) {
        const { body } = req;
        let user = await Model.findOne({
            username: body?.username,
        }).select("+password +role");
        if (!user)
            throw AppError.createAuthenticationError(
                "This username or password is incorrect"
            );
        const verified = user.verifyPassword(body?.password as string);
        if (!verified)
            throw AppError.createAuthenticationError(
                "This username or password is incorrect"
            );
        req.session.user = user.shear("password");
        return req.session.user;
    },
});

export const register = Controller.postOne({
    body: {
        username: {
            schema: JoiSchema.username,
        },
        password: {
            schema: JoiSchema.password,
        },
        email: {
            schema: JoiSchema.email,
        },
    },
    postprocess(req, res, next, payload) {
        req.session.user = payload as any;
    },
});
