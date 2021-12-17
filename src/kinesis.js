import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { KinesisClient, PutRecordsCommand } from "@aws-sdk/client-kinesis";

export default function factory ({ REGION, IDENTITY_POOL_ID, STREAM_NAME, PARTITION_KEY }) {
  const kinesisClient = new KinesisClient({
    region: REGION,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: REGION }),
      identityPoolId: IDENTITY_POOL_ID
    }),
  });

  
  return {
    async send (instance, bulk) {
      try {
        await kinesisClient.send(new PutRecordsCommand({
          Records: bulk.map(record => ({
            Data: JSON.stringify(record),
            PartitionKey: PARTITION_KEY
          })),
          StreamName: STREAM_NAME
        }));
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    }
  }
} 
