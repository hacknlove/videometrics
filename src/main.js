export default class VideoMetrics {
  constructor (videoElement, config) {
    this.videoElement = videoElement
    this.attachedVideoEvents = new Set()
    this.attachedWindowEvents = new Set()
    this.config = config
    this.running = false
    this._processEvent = this.processEvent.bind(this)
    this.start()
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
    const data = this.config[`capture-${event.type}`]
      ? this.config[`capture-${event.type}`](event, this)
      : this.config.captureDefault(event, this)
    
    if (data.skip) {
      return
    }
    const lastIndex = parseInt(localStorage.getItem('videometrics-last-index')) || 0
    
    const lastSend = parseInt(localStorage.getItem('videometrics-last-send')) || Date.now()
  
    const newItem = JSON.stringify({
      ...this.config.customData,
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
      lastIndex + 1 >= this.config.bulkSize ||
      (
        lastSend + this.config.interval < Date.now())
      ) {
      this.bulk(newItem)
    }
  }

  async bulk () {
    const bulk = this.config.firstRow
      ? [this.config.firstRow]
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

    if (await this.config.send(this, bulk)) {
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
    this.config.videoEvents.forEach(event => this.attachEvent(event, this.videoElement, this.attachedVideoEvents))
    this.config.windowEvents.forEach(event => this.attachEvent(event, window, this.attachedWindowEvents))

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
