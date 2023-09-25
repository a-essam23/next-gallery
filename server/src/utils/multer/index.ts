import { catchAsync } from "@utils";
import { AppError } from "@utils/appError";
import multer from "./multer-config";
import { MethodPropertyFileOptions } from "@factory/controller-factory/types";
namespace Multer {
    type uploadProps = { name: string } & MethodPropertyFileOptions;

    export const uploadOne = ({
        name,
        mimetypes,
        required,
        parse,
        upload,
    }: uploadProps) =>
        catchAsync(async (req, res, next) => {
            multer(mimetypes).single(name)(req, res, async (err) => {
                if (err) return next(err);
                if (required && !req.file)
                    return next(AppError.createMulterError("No file attached"));
                if (req.file) {
                    if (upload) {
                        let result = await upload(req.file);
                        req["body"][name] = result;
                    }
                    if (parse) {
                        let result = parse(req.file);
                        req["body"][name] = result;
                    }
                }
                next();
            });
        });
}

export default Multer;
