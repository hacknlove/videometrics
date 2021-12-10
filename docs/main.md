# videometrics/main

## Reference

### Constructor

```js
new Videoelement(HTMLVideoElement, [config](#config))
```

### config
#### `videoEvents: Array<string>`
The names of the events that will be captured at the video element
It defaults to `['play', 'pause', 'seeked', 'ended']`
#### `windowEvents: Array<string>`
The names of the events that will be captured at the window element
It defaults to `[visibilitychange]`
#### `serialize: any -> string`
The function used to serialize each row (each event)
It defaults to `JSON.stringify`
#### `captureDefault: (event, Videometrics) -> any`
The function that extract the specific data for events that are not handled by an expecific function
it defaults to `(event, instance) => ({ at: instance.videoElement.currentTime })`
The data returned by the event handlers is completed with
```js
{
  ...config.customData,
  when: Date.now(),
  type: event.type,
  ...data // the data returned by the event manager
}
``` 
#### `capture-visibilitychange: (event, Videometrics) -> any`
The function that handles the event visibilitychange
This event is meant to deal with the browser minification, close, navigation, etc.
When the page hides it defaults to: 
```js
{
  at: instance.videoElement.currentTyme,
  type: 'hide'
}
```
When the page shows it defaults to:
```js
{
  at: instance.videoElement.currentTyme,
  type: 'shows'
}
```
#### `capture-[eventname]: (event, Videometrics) -> any`
The handler for the event `[eventname]` for instance `capture-foo` is the manager for the event `foo`
It work the same as `captureDefault` and `capture-vicibilitychange` but for the event you choose.
#### `bulksize: integer`
The size of the bulk. The ammount of events that will trigger and upload.
It defaults to 100
#### `interval: integer`
The amount of millisecons between the last data send and the current event that will trigger an upload
It defaults to 24 * 60 * 60 * 1000
#### customData
The custom data that will be added to the saved event
#### async send(Videometrics, bulk)
The function that does the actually uploading.
If it returns falsy or throws, the upload will be considered faulty so the data will not be wipped.
If it returns true, the upload will be considered successfull, and the data will be wipped.

### methods and attributes
#### `bulk()`
It sends the data and starts a new bulk

#### `stop()`
It detaches the event handlers

#### `start()`
It attaches the event handlers back. It's called automatically by the constructor.

#### `config`
Setter/getter that gets the `config` parameter, or sets a new `config` parameter and a new `mergedConfig`

#### `mergedConfig`
The config object that it's actually used.
It's not supposed to be changed manually, but you might need to use it in any handler, plugin or extension.


### Change the defaults
Defaults will be overrided by `process.env.VIDEO_METRICS_CONFIG`

Another way to change the defaults is to import defaultConfig and just set any value

The new defaults will apply to new instances, and to old instances when setting a new config

```js
import Videometrics, { defaultConfig } from 'videometrics'

const instance1 = new Videometrics(video1)
const instance2 = new Videometrics(video2)
defaultConfig.bulk = 50

const instance3 = new Videometrics(video3)

// bulk for instance1 is 100
// bulk for instance2 is 100
// bulk for instance3 is 50

instance2.config = {}

// bulk for instance2 is 50
```

## Quick example

```js
import Videometrics from 'videometrics'

const videoElement = document.getElementsByTagName('video')[0]

const videometrics = new Videometrics(videoElement, {

})
```