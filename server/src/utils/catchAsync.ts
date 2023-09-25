import { NextFunction, Request, Response } from "express";

const catchAsync = (
    fn: (req: Request, res: Response, next: NextFunction) => any
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((error: Error) => {
            // if (req?.file) {
            //     fs.unlink(req.file.path, (err) => err && console.log(err));
            // }
            next(error);
        });
    };
};
export default catchAsync;
