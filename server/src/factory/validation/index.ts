import {
    IPopoulateMap,
    MethodProperties,
    MethodPropertyFileOptions,
    MethodPropertyOptions,
    PopulateField,
    PopulateFieldElement,
} from "@factory/controller-factory/types";
import { AppError } from "@utils";
import { catchAsync } from "@utils";
import Multer from "@utils/multer";
import { Request } from "express";
import Joi from "joi";

namespace Validate {
    const validateFiles = (props: {
        [key: string]: MethodPropertyFileOptions;
    }) => {
        const fileProps = Object.entries(props);
        if (
            fileProps.length === 1 ||
            !fileProps[0][1].count ||
            fileProps[0][1].count === 1
        ) {
            const [name, { mimetypes, required, parse, upload, count }] =
                fileProps[0];
            return Multer.uploadOne({
                name,
                mimetypes,
                required,
                parse,
                upload,
            });
        } else {
            return catchAsync(async (req, res, next) => {
                next();
            });
        }
    };

    export function generatePopulateFieldSchema(populate: PopulateField) {
        const mappedPopulate: IPopoulateMap = {};
        const getPopName = (val: PopulateFieldElement): string => {
            if (typeof val === "string") {
                mappedPopulate[val] = { path: val };
                return val;
            }
            mappedPopulate[val.path] = val;
            return val.path;
        };
        const acceptable = Array.isArray(populate)
            ? populate.map((val) => getPopName(val))
            : [getPopName(populate)];
        return {
            schema: Joi.alternatives()
                .try(
                    Joi.array().items(Joi.string().valid(...acceptable)),
                    Joi.string().valid(...acceptable)
                )
                .messages({
                    "any.only": "Unauthorized one or more populate argument",
                }),
            mapped: mappedPopulate,
        };
    }

    const parseBodyMethodProps = (props: MethodProperties<"body">) =>
        Object.entries(props).reduce(
            (
                acc: {
                    schemas: { [key: string]: Joi.Schema };
                    validations: {
                        [
                            key: string
                        ]: MethodPropertyOptions<"body">["validate"];
                    };
                    files: { [key: string]: MethodPropertyFileOptions };
                },
                [key]
            ) => {
                if (props[key].schema) {
                    acc.schemas[key] = props[key].schema!;
                    if (props[key].validate) {
                        acc.validations[key] = props[key].validate;
                    }
                } else {
                    acc.files[key] = props[key] as MethodPropertyFileOptions;
                    acc.schemas[key] = Joi.any() as Joi.Schema<any>;
                    // console.log(key, props[key]);
                }
                return acc;
            },
            { schemas: {}, validations: {}, files: {} }
        );
    const parseQueryMethodProps = (
        props: MethodProperties<"query">,
        populate?: PopulateField
    ) => {
        let populateMapped;
        if (populate) {
            const { mapped, schema } = generatePopulateFieldSchema(populate);
            props = {
                ...props,
                populate: {
                    schema,
                },
            };
            populateMapped = mapped;
        }

        return Object.entries(props).reduce(
            (
                acc: {
                    schemas: { [key: string]: Joi.Schema };
                    validations: {
                        [
                            key: string
                        ]: MethodPropertyOptions<"body">["validate"];
                    };
                    populateMap?: { [key: string]: PopulateFieldElement };
                },
                [key]
            ) => {
                if (props[key].schema) {
                    acc.schemas[key] = props[key].schema;
                    if (props[key].validate) {
                        acc.validations[key] = props[key].validate;
                    }
                }
                return acc;
            },
            { schemas: {}, validations: {}, populateMap: populateMapped }
        );
    };

    const joiValidate = (schemaObj: Joi.PartialSchemaMap, payload: any) => {
        console.log(payload);
        let joiRes = Joi.object(schemaObj).unknown(false).validate(payload);
        if (joiRes.error)
            throw AppError.createError(
                400,
                joiRes.error?.message,
                "JoiValidationError"
            );
    };

    const optionalValidate = async (
        validations: {
            [key: string]: MethodPropertyOptions<"query">["validate"];
        },
        payload: Request["body"]
    ) => {
        for (let [key, validate] of Object.entries(validations)) {
            if (!validate) continue;
            const isValid = await validate(payload[key]);
            if (isValid instanceof Error) throw isValid;
        }
    };

    export const query = (
        props?: MethodProperties<"query">,
        populate?: PopulateField
    ) =>
        catchAsync(async (req, res, next) => {
            if ((!props || Object.keys(props).length === 0) && !populate)
                return next();
            const { schemas, validations, populateMap } = parseQueryMethodProps(
                props || {},
                populate
            );
            joiValidate(schemas, req.query);
            await optionalValidate(validations, req.query);
            if (populateMap) req.populate = populateMap;
            next();
        });

    export const body = (props?: MethodProperties<"body">) => {
        if (!props || Object.keys(props).length === 0)
            return [catchAsync((req, res, next) => next())];
        const { files, schemas, validations } = parseBodyMethodProps(props);
        const joiAndOptionalVal = catchAsync(async (req, res, next) => {
            joiValidate(schemas, req.body);
            await optionalValidate(validations, req.body);
            next();
        });
        if (!Object.keys(files).length) {
            return [joiAndOptionalVal];
        } else {
            return [validateFiles(files), joiAndOptionalVal];
        }
    };

    export const queryAndBody = (props: {
        query?: MethodProperties<"query">;
        body?: MethodProperties<"body">;
        populate?: PopulateField;
    }) => {
        const queryMiddlewares = query(props.query);
        const bodyMiddlewares = body(props.body);
        return [queryMiddlewares, ...bodyMiddlewares];
    };
}

export default Validate;
