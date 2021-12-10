# videometrics/defaultConfig

This file holds the default configuration which you can use as a base to create your personal configuration.

## Fields
### `videoEvents: Array<string>`
The names of the events that will be captured at the video element
It defaults to `['play', 'pause', 'seeked', 'ended']`
### `windowEvents: Array<string>`
The names of the events that will be captured at the window element
It defaults to `['visibilitychange']`
### `serialize: any -> string`
The function used to serialize each row (each event)
It defaults to `JSON.stringify`
### `captureDefault: (event, Videometrics) -> any`
The function that extract data for events that are not handled by an expecific function
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
### `capture-visibilitychange: (event, Videometrics) -> any`
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
### `capture-[eventname]: (event, Videometrics) -> any`
The handler for the event `[eventname]` for instance `capture-foo` is the manager for the event `foo`
It work the same as `captureDefault` and `capture-vicibilitychange` but for the said event.
### `bulksize: integer`
The size of the bulk. The ammount of events that will trigger and upload.
It defaults to 100
### `interval: integer`
The amount of millisecons between the last data sent and the current event that will trigger an upload
It defaults to 24 * 60 * 60 * 1000
### customData
The custom data that will be added to the saved event
### async send(Videometrics, bulk)
The function that does the actually uploading.
If it returns falsy or throws, the upload will be considered faulty so the data will not be wipped from the cache.
If it returns true, the upload will be considered successfull, and the cache will be wipped.
