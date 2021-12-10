export const defaultConfig = Object.assign({
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
}, process.env.VIDEO_METRICS_CONFIG && JSON.parse(process.env.VIDEO_METRICS_CONFIG))

export default class VideoMetrics {
  constructor (videoElement, config) {
    this.videoElement = videoElement
    this._originalConfig = config
    this.config = config
    this.attachedVideoEvents = new Set()
    this.attachedWindowEvents = new Set()
    this.running = false
    this._processEvent = this.processEvent.bind(this)
    this.start()
  }

  set config (config) {
    this.mergedConfig = Object.assign({}, defaultConfig, config)
  }

  get config () {
    return this._originalConfig
  }

  attachEvent (event, element, set) {
    if (!set.has(event)) {
      element.addEventListener(event, this._processEvent)
      set.add(event)
    }
  }

  detachEvent (event, element, set) {
    if (set.has(event)) {
      element.removeEventListener(event, this._processEvent)
      set.delete(event)
    }
  }

  processEvent (event) {
    const data = this.mergedConfig[`capture-${event.type}`]
      ? this.mergedConfig[`capture-${event.type}`](event, this)
      : this.mergedConfig.captureDefault(event, this)
    
    if (data.skip) {
      return
    }
    const lastIndex = parseInt(localStorage.getItem('videometrics-last-index')) || 0
    
    const lastSend = parseInt(localStorage.getItem('videometrics-last-send')) || Date.now()
  
    const newItem = JSON.stringify({
      ...this.mergedConfig.customData,
      when: Date.now(),
      type: event.type,
      ...data
    })
  
    if (localStorage.getItem(`videometrics-${lastIndex - 1}`) === newItem) {
      return
    }
  
    localStorage.setItem('videometrics-last-index', lastIndex + 1)
    localStorage.setItem(`videometrics-${lastIndex}`, newItem)
  
  
    if (
      lastIndex > this.mergedConfig.bulkSize ||
      (
        lastSend + this.mergedConfig.interval < Date.now())
      ) {
      this.bulk(newItem)
    }
  }

  async bulk () {
    const bulk = this.mergedConfig.firstRow
      ? [this.mergedConfig.firstRow]
      : []

      let lastIndex = parseIndex(localStorage.getItem('videometrics-last-index')) || 0
    if (lastIndex === 0) {
      localStorage.setItem('videometrics-last-send', Date.now())
      return
    }
    for (lastIndex; lastIndex--;) {
      bulk.push(localStorage.getItem(`videometrics-${lastIndex}`))
    }
    bulk.push(newItem)

    if (await this.mergedConfig.send(this, bulk)) {
      localStorage.setItem('videometrics-last-index', 0)
      localStorage.setItem('videometrics-last-send', Date.now())
      for (lastIndex; lastIndex--;) {
        localStorage.removeItem(`videometrics-${lastIndex}`)
      }
    }
  }

  start () {
    if (this.running) {
      return
    }
    this.mergedConfig.videoEvents.forEach(event => this.attachEvent(event, this.videoElement, this.attachedVideoEvents))
    this.mergedConfig.windowEvents.forEach(event => this.attachEvent(event, window, this.attachedWindowEvents))

    this.running = true
  }

  stop () {
    this.attachedVideoEvents.forEach(event => this.videoElement.removeEventListener(event, this._processEvent))
    this.attachedWindowEvents.forEach(event => this.window.removeEventListener(event, this._processEvent))
    this.attachedVideoEvents.clear()
    this.attachedWindowEvents.clear()
    this.running = false
  }
}

