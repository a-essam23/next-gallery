const fs = require("fs");
const aws = require("aws-sdk");
const spacesEndpoint = new aws.Endpoint(process.env.SPACES_URL);
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
});
let bucket = "elkhedewaya";
const s3UploadOne = async (filePathLocal, filePathServer) => {
    try {
        const fileContent = fs.readFileSync(filePathLocal);

        const params = {
            Bucket: "elkhedewaya", // Update with your Space's bucket name
            Key: `roman/${
                process.env.NODE_ENV || "development"
            }/${filePathServer}`, // Specify the desired folder-like prefix
            Body: fileContent,
            ACL: "public-read", // Optional: Set the ACL (access control) to allow public read access
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    } catch (e) {
        throw new Error(e);
    }
};

const s3DeleteOne = async (filePath) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: "elkhedewaya", // Update with your Space's bucket name
            Key: `roman/${process.env.NODE_ENV || "development"}/${filePath}`, // Specify the desired folder-like prefix
        };
        s3.deleteObject(params, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(data);
                resolve(data);
            }
        });
    });
};

async function emptyS3Directory(bucket, dir) {
    const listParams = {
        Bucket: bucket,
        Prefix: dir,
    };

    const listedObjects = await s3.listObjectsV2(listParams).promise();

    if (listedObjects.Contents.length === 0) return;

    const deleteParams = {
        Bucket: bucket,
        Delete: { Objects: [] },
    };

    listedObjects.Contents.forEach(({ Key }) => {
        deleteParams.Delete.Objects.push({ Key });
    });

    await s3.deleteObjects(deleteParams).promise();

    if (listedObjects.IsTruncated) await emptyS3Directory(bucket, dir);
}

module.exports = { s3, s3UploadOne, s3DeleteOne };
