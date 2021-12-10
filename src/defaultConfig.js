export default {
  videoEvents: ['play', 'pause', 'seeked', 'ended'],
  windowEvents: ['visibilitychange'],
  serialize: JSON.stringify,
  captureDefault (event, instance) {
    return {
      at: instance.videoElement.currentTime,
    }
  },
  'capture-visibilitychange': (event, instance) => {
    switch (document.visibilityState) {
      case 'hidden':
        return {
          at: instance.videoElement.currentTime,
          type: 'hide'
        }
      case 'visible':
        return {
          at: instance.videoElement.currentTime,
          type: 'show'
        }
      default:
        return {
          skip: true
        }
    }
  },
  bulkSize: 100,
  interval: 24 * 60 * 60 * 1000,
  customData: {},
}