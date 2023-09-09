const fs = require("fs");
const axios = require("axios");
const AppError = require("./appError");
const catchAsync = require("./catchAsync");
const { uploadOne, s3UploadOne } = require("../services/s3");
/*
    getOne
    getAll
    postOne
*/

class ControllerFactory {
    constructor(Model) {
        this.Model = Model;
    }
    /*
    //* fix later. one array with different types will be more efficient
    //* currently limited to one populate field per request

    options {
        required,
        optional,
        populate,
    }
    */
    /*
    interface Option {
        name: string 
        prase?: () => {}
        validate?: () => {}
    }
   
   */

    async __parseOption(option, query) {
        if (typeof option === "string") return [option, query?.[option]];
        let val = query?.[option.name];
        let key = option?.parent
            ? `${option.parent}.${option.name}`
            : option.name;
        //* Why is object returned with an empty value? ?????
        if (typeof option === "object") {
            if (option.parse) {
                val = await option.parse(val);
            }
            if (option.validate) {
                await option.validate(val);
            }
        }
        return [key, val];
    }

    async __checkAndAssignOptions(options, query = {}) {
        const payload = {};
        let pop = [];
        if (options?.required) {
            for (const param of options.required) {
                let paramName = typeof param === "string" ? param : param.name;
                if (paramName in query) {
                    const [key, val] = await this.__parseOption(param, query);
                    payload[key] = val;
                } else {
                    throw new AppError(
                        400,
                        `${this.Model.modelName}: ${key} is missing from request`
                    );
                }
            }
        }

        if (options?.optional) {
            for (const param of options.optional) {
                let paramName = typeof param === "string" ? param : param.name;
                if (paramName in query) {
                    const [key, val] = await this.__parseOption(param, query);
                    payload[key] = val;
                }
            }
        }
        if (query?.pop && options?.populate) {
            for (const param of options.populate) {
                if (param.includes(query?.pop)) pop.push({ path: param });
            }
        }
        return [payload, pop];
    }

    getOne(
        options = {
            required: [],
            optional: [],
            populate: [],
        }
    ) {
        return catchAsync(async (req, res, next) => {
            const query = req.query;
            const [payload, pop] = await this.__checkAndAssignOptions(
                options,
                query
            );

            let result = null;
            if (query.pop) {
                result = await this.Model.findOne(payload).populate(query.pop);
            } else {
                result = await this.Model.findOne(payload);
            }
            if (!result)
                return next(
                    new AppError(
                        404,
                        `${this.Model.modelName}: ${query.name} could not be found`
                    )
                );

            res.status(200).send({
                data: result,
            });
        });
    }

    //TODO ADD checkandassign method to sampling
    sample(options) {
        return catchAsync(async (req, res, next) => {
            const query = req.query;
            const [payload, pop] = await this.__checkAndAssignOptions(
                options,
                query
            );
            // const { size } = req.query;

            // if (!size) {
            //     return next(new AppError(400, "Size parameter is missing"));
            // }
            // const numberOfDocuments = parseInt(size);
            // if (isNaN(numberOfDocuments) || numberOfDocuments <= 0) {
            //     return next(new AppError(400, "Invalid size parameter"));
            // }
            const result = await this.Model.aggregate([{ $sample: payload }]);

            res.status(200).send({
                data: result,
            });
        });
    }

    deleteOne(options) {
        return catchAsync(async (req, res, next) => {
            const query = req.query;
            const [payload, pop] = await this.__checkAndAssignOptions(
                options,
                query
            );
            const result = await this.Model.findOneAndDelete(payload);
            if (!result)
                return next(
                    new AppError(
                        404,
                        `${this.Model.modelName}: ${query.name} could not be found`
                    )
                );

            res.status(200).send({
                data: `${req.query.name} has been removed`,
            });
        });
    }

    updateOne(
        options = {
            query: {},
            body: {},
        },
        callback
    ) {
        return catchAsync(async (req, res, next) => {
            const body = req.body;
            const query = req.query;
            const [queryPayload, pop] = await this.__checkAndAssignOptions(
                options.query,
                query
            );
            const [bodyPayload] = await this.__checkAndAssignOptions(
                options.body,
                body
            );
            const item = await this.Model.findOneAndUpdate(
                queryPayload,
                bodyPayload,
                { new: true }
            );
            if (callback) callback(req, res, next, item);
            res.status(200).send({
                data: item,
            });
        });
    }

    getAll(options) {
        return catchAsync(async (req, res, next) => {
            const query = req.query;
            const [queryPayload, pop] = await this.__checkAndAssignOptions(
                options,
                query
            );
            const result = await this.Model.find(queryPayload).populate(pop);
            res.status(200).send({
                data: result,
            });
        });
    }

    postOne(
        options = {
            query: {},
            body: {},
        },
        callback
    ) {
        return catchAsync(async (req, res, next) => {
            const body = req.body;
            const [payload, pop] = await this.__checkAndAssignOptions(
                options.body,
                body
            );
            const item = await this.Model.create({
                ...payload,
            });
            if (callback) callback(req, res, next, item);

            res.status(200).send({
                data: item,
            });
        });
    }
}

class SocketControllerFactory {
    constructor(Model) {
        this.Model = Model;
    }

    async findByName(name) {
        try {
            const findInModel = await this.Model.find({
                name: { $regex: name, $options: "i" },
            });
            return findInModel;
        } catch (e) {
            return [];
        }
    }

    async ifExists(name) {
        try {
            const res = await this.findByName(name);
            return res.length ? true : false;
        } catch (e) {
            return false;
        }
    }
}

module.exports = { ControllerFactory, SocketControllerFactory };
