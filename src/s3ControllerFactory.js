import { S3Client } from '@aws-sdk/client-s3'

export default async function withS3(config) {
  const s3Client = new S3Client({ region: "eu-west-3", 
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY
    }
  });

  return async function controller(req, res) {
    const Key = config.getKey
      ? await config.getKey(req)
      : `${Date.now() + Math.random()}.json` 

      const upload = createPresignedPost(s3Client, {
        Bucket: config.Bucket,
        Key,
        Conditions: [
          { acl: config.acl ?? 'private' },
          { bucket: config.Bucket },
          { key: Key },
          { 'content-type': config.contentType ?? 'application/json' }
        ],
        Fields: {
          acl: config.acl ?? 'private'
        },
        Expires: config.Expires
      });

      res.json(upload);
  }

}