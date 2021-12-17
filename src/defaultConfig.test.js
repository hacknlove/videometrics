import defaultConfig from './defaultConfig'

describe('defaultConfig', () => {
  it('has all the required fields', () => {
    [
      'videoEvents',
      'windowEvents',
      'serialize',
      'captureDefault',
      'capture-visibilitychange',
      'bulkSize',
      'interval',
      'customData',
    ].forEach(field => {
      expect(defaultConfig).toHaveProperty(field)
    })
  })

  it('serialize is a function that returns a string', () => {
    expect(defaultConfig.serialize).toBeInstanceOf(Function)
    expect(typeof defaultConfig.serialize({ foo: 'foo' })).toBe('string')
  })

  it('captureDefault is a function that returns an object', () => {
    expect(defaultConfig.captureDefault).toBeInstanceOf(Function)
    expect(typeof defaultConfig.captureDefault({}, ({
      videoElement: {
        currentTime: Date.now(),
      }
    }))).toBe('object')
  })

  it('capture-visibilitychange is a function that returns an object', () => {
    expect(defaultConfig['capture-visibilitychange']).toBeInstanceOf(Function)
    expect(typeof defaultConfig['capture-visibilitychange']({}, ({
      videoElement: {
        currentTime: Date.now(),
      }
    }))).toBe('object')
  })
})