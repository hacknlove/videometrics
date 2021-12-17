import VideoMetrics from './main'
import defaultConfig from './defaultConfig'

describe('main', () => {
  it('instantiates', () => {
    const instance = new VideoMetrics(document.createElement('video'), {
      videoEvents: [],
      windowEvents: []
    })

    expect(instance).toBeInstanceOf(VideoMetrics)
  })

  it('attaches events', () => {
    const videoElement = document.createElement('video')
    const instance = new VideoMetrics(videoElement, {
      videoEvents: [],
      windowEvents: []
    })

    videoElement.addEventListener = jest.fn()

    expect(instance.attachedVideoEvents).toBeInstanceOf(Set)
    expect(instance.attachedWindowEvents).toBeInstanceOf(Set)

    instance.attachEvent('someEvent', videoElement, instance.attachedVideoEvents)

    expect(videoElement.addEventListener).toHaveBeenCalledWith('someEvent', instance._processEvent)

    expect(instance.attachedVideoEvents.has('someEvent')).toBe(true)
  })

  it('does not attach same event twice', () => {
    const videoElement = document.createElement('video')
    const instance = new VideoMetrics(videoElement, {
      videoEvents: [],
      windowEvents: []
    })

    videoElement.addEventListener = jest.fn()

    instance.attachedVideoEvents.add('someEvent')

    instance.attachEvent('someEvent', videoElement, instance.attachedVideoEvents)

    expect(videoElement.addEventListener).not.toHaveBeenCalled()

    expect(instance.attachedVideoEvents.has('someEvent')).toBe(true)
  })

  it('detaches events', () => {
    const videoElement = document.createElement('video')
    const instance = new VideoMetrics(videoElement, {
      videoEvents: [],
      windowEvents: []
    })

    videoElement.removeEventListener = jest.fn()

    instance.detachEvent('someEvent', videoElement, instance.attachedVideoEvents)

    expect(videoElement.removeEventListener).not.toHaveBeenCalled()

    instance.attachedVideoEvents.add('someEvent')

    instance.detachEvent('someEvent', videoElement, instance.attachedVideoEvents)

    expect(videoElement.removeEventListener).toHaveBeenCalledWith('someEvent', instance._processEvent)

    expect(instance.attachedVideoEvents.has('someEvent')).toBe(false)
  })

  describe('instance.processEvent', () => {
    const videoElement = document.createElement('video')
    const instance = new VideoMetrics(videoElement, {
      ...defaultConfig,
      'capture-someSkipEvent': () => ({ skip: true }),
      'capture-someEvent': (event) => ({
        foo: event.foo
      }),
      bulkSize: 3
    })
    instance.bulk = jest.fn()

    it('skips if the capture function returns skip: true', () => {
      instance.processEvent({ type: 'someSkipEvent' })
      expect(Object.keys(localStorage).length).toBe(0)
      expect(instance.bulk).not.toHaveBeenCalled()
    })

    it('Adds the data to localstorage', () => {
      instance.processEvent({ type: 'someEvent', foo: 'bar' })

      expect(Object.keys(localStorage).length).toBe(2)
      expect(localStorage.getItem('videometrics-last-index')).toBe('1')

      const entry = JSON.parse(localStorage.getItem('videometrics-0'))
      expect(typeof entry.when).toBe('number')
      expect(entry.type).toBe('someEvent')
      expect(entry.foo).toBe('bar')
      expect(instance.bulk).not.toHaveBeenCalled()
    })

    it('Adds more data to localstorage', () => {
      instance.processEvent({ type: 'someEvent', foo: 'bar2' })
      expect(Object.keys(localStorage).length).toBe(3)
      expect(localStorage.getItem('videometrics-last-index')).toBe('2')
      const entry = JSON.parse(localStorage.getItem('videometrics-1'))
      expect(entry.foo).toBe('bar2')
      expect(instance.bulk).not.toHaveBeenCalled()
    })

    it('calls bulk if lastIndex is greater than bulkSize', () => {
      instance.processEvent({ type: 'someEvent', foo: 'bar3' })

      expect(instance.bulk).toHaveBeenCalledTimes(1)
    })


  })
  it('detaches the events', () => {
    const videoElement = document.createElement('video')
    const instance = new VideoMetrics(videoElement, {
      videoEvents: ['some', 'event'],
      windowEvents: []
    })

    expect(instance.attachedVideoEvents.size).toBe(2)
    instance.stop()
    expect(instance.attachedVideoEvents.size).toBe(0)
  })
})