# videometrics/s3ControllerFactory

Helper to create controllers for the REST API endpoint required by `videometrics/s3ControllerFactory getSignature`

## How to use it

```js
import s3ControllerFactory from "videometrics/s3ControllerFactory"

const controller = s3ControllerFactory({
  region: "eu-west-3",
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  Bucket: 'your bucked name',
  getKey: () => `videometrics/${Date.now() + Math.random()}.json`,
  acl: 'public'
});
```

## Peer dependencies
* @aws-sdk/client-s3@^3.44.0
* @aws-sdk/s3-presigned-post@^3.44.0

## Configuration

## region, accessKeyId, secretAccessKey
AWS credentials
### Bucket
AWS s3 Bucket name

### acl
AWS acl. Defaults to `private`

### contentType
The type of the file that will be uploaded. Defaults to `application/json`

### Expires
The expiration in seconds. Defaults to `3600`

## getKey(req)
(async) function that accepts req and returns the Key parameter