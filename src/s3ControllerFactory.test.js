import withS3 from './s3ControllerFactory'
jest.mock('@aws-sdk/client-s3')
jest.mock('@aws-sdk/s3-presigned-post')

describe('s3ControllerFactory', () => {
  it('should return a function', () => {
    expect(withS3({
      region: 'us-east-1',
      accessKeyId: 'foo',
      secretAccessKey: 'bar',
    })).toBeInstanceOf(Function)
  })
  it('should return a function that returns a Promise', () => {
    const result = withS3({
      region: 'us-east-1',
      accessKeyId: 'foo',
      secretAccessKey: 'bar',
    })({}, { json: jest.fn() })

    expect(result).toBeInstanceOf(Promise)
  })
})