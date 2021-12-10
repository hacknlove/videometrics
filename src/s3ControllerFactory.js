import { S3Client } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'

export default async function withS3(config) {
  const s3Client = new S3Client({ region: config.region, 
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey
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
        Expires: config.Expires ?? 3600
      });

      res.json(upload);
  }

}