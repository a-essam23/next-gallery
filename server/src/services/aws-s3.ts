import fs from "fs";
import { AppError, Callback, promisify } from "@utils";
import {
    GetObjectOutput,
    GetObjectRequest,
    PutObjectCommand,
    PutObjectCommandInput,
    PutObjectCommandOutput,
    S3,
} from "@aws-sdk/client-s3";
import { log } from "@utils/logger";
if (!process.env.SPACES_ENDPOINT)
    throw AppError.createMissingEnviromentVar("SPACES_ENDPOINT");
if (!process.env.SPACES_BUCKET)
    throw AppError.createMissingEnviromentVar("SPACES_BUCKET");

const bucket = process.env.SPACES_BUCKET;
export const s3Client = new S3({
    endpoint: process.env.SPACES_ENDPOINT,
    credentials: {
        accessKeyId: process.env.SPACES_KEY!,
        secretAccessKey: process.env.SPACES_SECRET!,
    },
    region: "eu-central-1",
});

const uploadtoSpaces = (
    file: string | Express.Multer.File,
    // path: string = "",
    pathAffix?: string
) => {
    const filename =
        typeof file === "string" ? file.match(/[^/\\]*$/) : file.filename;
    log.info(`Uploading ${filename} to "${bucket} bucket"`);
    if (!file) throw AppError.createUploadError();
    const fileContent = fs.readFileSync(
        typeof file === "string" ? file : file.path
    );
    /** path
     * enviroment --> NODE_ENV defaults to "development"
     * processAffix --> SPACES_PATH_DEFAULT_PROCESS_AFFIX
     * filename
     */
    let keyPath = `${process.env.NODE_ENV || "development"}/${
        pathAffix || process.env.SPACES_PATH_DEFAULT_PROCESS_AFFIX
            ? `${pathAffix || process.env.SPACES_PATH_DEFAULT_PROCESS_AFFIX}--`
            : ""
    }${filename}`;

    const params: PutObjectCommandInput = {
        Bucket: bucket, // Update with your Space's bucket name
        Key: keyPath, // Specify the desired folder-like prefix
        Body: fileContent,
        ACL: "public-read", // Optional: Set the ACL (access control) to allow public read access
    };

    const uploadPromise = promisify(
        (args: PutObjectCommandInput, cb: Callback<{ path: string }>) => {
            s3Client
                .send(new PutObjectCommand(args))
                .then((result) => {
                    cb({
                        path: `${
                            process.env.SPACES_CDN ||
                            process.env.SPACES_ENDPOINT
                        }/${keyPath}`,
                    }); // Resolve the Promise with the result
                })
                .catch((error) => {
                    // Handle any errors and reject the Promise if necessary
                    cb(error);
                });
        }
    );

    return uploadPromise(params);

    // return s3Client.send(new PutObjectCommand(params));
};

export default uploadtoSpaces;
