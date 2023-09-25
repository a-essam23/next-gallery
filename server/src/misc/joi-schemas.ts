import Joi from "joi";
namespace JoiSchema {
    export const username = Joi.string()
        .required()
        .label("username")
        .min(3)
        .max(24);
    export const password = Joi.string()
        .required()
        .label("password")
        .min(8)
        .max(128)
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
        .message(
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special symbol."
        );
    export const email = Joi.string()
        .required()
        .label("email")
        .max(100)
        .email();

    export const _id = Joi.string()
        .required()
        .label("id")
        .pattern(/^[a-f\d]{24}$/i)
        .message("This is not a valid id");

    export const name = Joi.string().required().min(1).max(128).label("name");

}

export default JoiSchema;
