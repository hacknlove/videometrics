# videometrics/kinesis

Configuration helper for send the data to kinesis

## Peer dependencies
* @aws-sdk/client-cognito-identity@^3.43.0
* @aws-sdk/client-kinesis@^3.44.0
* @aws-sdk/credential-provider-cognito-identity@^3.43.0

## How it works

It exports a factory that creates the `send` field that needs to be included into the config object used by the Videometrics instance.

You need to pass `REGION`, `IDENTITY_POOL_ID`, `STREAM_NAME`, `PARTITION_KEY` 

## Prerequisites:

* Create an [Kinesis stream](https://docs.aws.amazon.com/streams/latest/dev/working-with-streams.html)
* Create an [Amazon Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html) identity pool with access enabled for unauthenticated identities
* Create an [IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html) whose policy grants permission to submit data to an Kinesis stream.

### role policy for the IAM role.
```
{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Effect": "Allow",
         "Action": [
            "mobileanalytics:PutEvents",
            "cognito-sync:*"
         ],
         "Resource": [
            "*"
         ]
      },
      {
         "Effect": "Allow",
         "Action": [
            "kinesis:Put*"
         ],
         "Resource": [
            "STREAM_RESOURCE_ARN"
         ]
      }
   ]
}
```

## Example

```js
import Videometrics from 'videometrics'
import defaultConfig from 'videometrics/defaultConfig'
import kinesis from 'videometrics/kinesis'

const config = {
  ...defaultConfig,
  ...kinesis({
    REGION: process.env.REGION,
    IDENTITY_POOL_ID: process.env.IDENTITY_POOL_ID,
    STREAM_NAME: process.env.STREAM_NAME,
    PARTITION_KEY: process.env.PARTITION_KEY,
  }),
  customData: {
    videoId: 'foo-bar'
  },
  bulk: 1000
}

const videoElement = document.getElementsByTagName('video')[0]

const videometrics = new Videometrics(videoElement, config)
```