import s3ControllerFactory from "videometrics/s3ControllerFactory"

export default s3ControllerFactory({
  Bucket: 'exnge',
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  getKey: () => `videometrics/${Date.now() + Math.random()}.json`,
  acl: 'public'
});
