const { S3Client } = require("@aws-sdk/client-s3");
exports.s3Client = new S3Client({
  endpoint: "https://fra1.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
  region: "us-east-1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
  credentials: {
    accessKeyId: process.env.DO_ACCESS_KEY_ID, // Access key pair. You can create access key pairs using the control panel or API.
    secretAccessKey: process.env.DO_SECRET_ACCESS_KEY, // Secret access key defined through an environment variable.
  },
});
