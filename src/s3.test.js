import s3 from './s3'
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe('s3', () => {
  it('getSignature', () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    const instance = {
      config: {
        getSignatureUrl: '/api/signature',
        customData: {},
      },
    }
    const result = s3.getSignature(instance)

    expect(result).toBeInstanceOf(Promise)    
  })
  it('send', async () => {
    const instance = {
      config: {
        getSignature: () => ({
          url: '/send',
          fields: {
            foo: 'bar'
          }
        }),
      }
    }

    await s3.send(instance, [])

    expect(fetch.mock.calls[0][0]).toBe('/send')
    expect(fetch.mock.calls[0][1].method).toBe('POST')
    expect(fetch.mock.calls[0][1].body).toBeInstanceOf(FormData)  })
})
