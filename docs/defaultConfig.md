# videometrics/defaultConfig

This file holds the default configuration which you can use as a base to create your personal configuration.

## Fields
### videoEvents
An array with the names of the events that will be handled at the video element
`defaultConfig.videoEvents` is `['play', 'pause', 'seeked', 'ended']`
### windowEvents
An array with the names of the events that will be handled at the window element
`defaultConfig.windowEvents` is  `['visibilitychange']`
### serialize
Function with the signature `any -> string` used to serialize each row (each event)
`defaultConfig.serialize` is `JSON.stringify`
### captureDefault
Function with the signature `(event, Videometrics) -> any` that captures data for any handled events that does not have an expecific handler
`defaultConfig.captureDefault` is `(event, instance) => ({ at: instance.videoElement.currentTime })`

The data returned by any capture function is completed with customData, when and type

```js
{
  ...config.customData,
  when: Date.now(),
  type: event.type,
  ...data // the data returned by the event capture function
}
``` 
### capture-visibilitychange
Function with the signature `(event, Videometrics) -> any` that captures the data for the event visibilitychange.

This event is meant to deal with the browser minification, close, navigation, etc.

When the page hides `defaultConfig['capture-visibilitychange'] returns: 
```js
{
  at: instance.videoElement.currentTyme,
  type: 'hide'
}
```
When the page shows `defaultConfig['capture-visibilitychange'] returns:
```js
{
  at: instance.videoElement.currentTyme,
  type: 'show'
}
```
### capture-[eventname]: (event, Videometrics) -> any`
Function with the signature `(event, Videometrics) -> any` that captures data for the event `[eventname]`.

For instance `capture-foo` would be used to capture data for the event `foo`

It work the same as `captureDefault` and `capture-vicibilitychange` but for the said event.
### bulksize
Integer that specifies the ammount of events that will trigger an upload.
`configDefault.bulksice` is `100`
### interval
Integer that specifies the amount of millisecons between the last sent data and the current event that will trigger an upload.

`configDefault.bulksice` is `24 * 60 * 60 * 1000`
### customData
The custom data that will be added to the saved event
`configDefault.bulksice` is `undefined` 
### send
Async function with the signature `(Videometrics, Array<string>) -> boolean` that does the actually uploading.

First parameter is the instance that is sending the data.

Second parameter is the data to be sent

If it returns falsy or throws, the upload will be considered faulty so the data will not be wipped from the cache.

If it returns true, the upload will be considered successfull, and the cache will be wipped.
`configDefault.send` is `undefined` 

