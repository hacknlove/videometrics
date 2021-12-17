import kinesis from './kinesis';
import { KinesisClient, PutRecordsCommand } from "@aws-sdk/client-kinesis";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

jest.mock('@aws-sdk/client-kinesis');
jest.mock('@aws-sdk/credential-provider-cognito-identity');
jest.mock('@aws-sdk/client-cognito-identity');

describe('kinesis', () => {
  it('returns a factory function', () => {
    expect(kinesis).toBeInstanceOf(Function)

    const config = kinesis({
      REGION: 'REGION',
      IDENTITY_POOL_ID: 'IDENTITY_POOL_ID',
      STREAM_NAME: 'STREAM_NAME',
      PARTITION_KEY: 'PARTITION_KEY'
    })

    expect(KinesisClient).toHaveBeenCalledTimes(1)
    expect(CognitoIdentityClient).toHaveBeenCalledTimes(1)
    expect(fromCognitoIdentityPool).toHaveBeenCalledTimes(1)

    expect(config).toBeInstanceOf(Object)
    expect(config).toHaveProperty('send')
  })
  it('sends records to kinesis', async () => {
    const config = kinesis({
      REGION: 'REGION',
      IDENTITY_POOL_ID: 'IDENTITY_POOL_ID',
      STREAM_NAME: 'STREAM_NAME',
      PARTITION_KEY: 'PARTITION_KEY'
    })

    const records = [
      { foo: 'foo' },
      { bar: 'bar' },
    ]

    KinesisClient.prototype.send = jest.fn(async () => true)

    const response = await config.send({}, records)
    expect(response).toBe(true)

    expect(KinesisClient.prototype.send).toHaveBeenCalledTimes(1)
    expect(PutRecordsCommand).toHaveBeenCalledTimes(1)
    expect(PutRecordsCommand).toHaveBeenCalledWith({
      Records: [
        {
          Data: JSON.stringify(records[0]),
          PartitionKey: 'PARTITION_KEY'
        },
        {
          Data: JSON.stringify(records[1]),
          PartitionKey: 'PARTITION_KEY'
        }
      ],
      StreamName: 'STREAM_NAME'
    })


  })
})