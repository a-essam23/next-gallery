import path from "path";
import fs from "fs";
import multer_ from "multer";
import { Request } from "express";
import { AppError } from "@utils/appError";
import { FileMimes, FileMimesTypes } from "@types";
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;
interface FileFilterCallback {
    (error: Error | AppError): void;
    (error: null, acceptFile: boolean): void;
}

export const multer_dir = path.join(
    process.cwd(),
    process.env.MULTER_DIR || "src/temp"
);
if (!fs.existsSync(multer_dir)) fs.mkdirSync(multer_dir, { recursive: true });

const fileStorage = multer_.diskStorage({
    destination: (
        request: Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        // ...Do your stuff here.
        callback(null, multer_dir);
    },

    filename: (
        req: Request,
        file: Express.Multer.File,
        callback: FileNameCallback
    ): void => {
        // ...Do your stuff here.
        callback(null, file.originalname); //Appending extension
    },
});

const fileFilter =
    (type: FileMimesTypes[]) =>
    (
        request: Request,
        file: Express.Multer.File,
        callback: FileFilterCallback
    ): void => {
        if (type?.length === 0) return callback(null, true);
        let acceptTypes = type
            .map((t) => FileMimes[t])
            .join(" ")
            .split(" ");
        console.log(file);
        if (acceptTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(AppError.createMulterError("Incorrect file type"));
        }
    };
export const multer = (type: FileMimesTypes[], sizeLimit?: number) =>
    multer_({
        storage: fileStorage,
        fileFilter: fileFilter(type),
        limits: {
            fileSize: (sizeLimit || 10) * 1024 * 1024, //10MB in bytes,
        },
    });

export default multer;
