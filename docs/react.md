# videometrics/useVideometrics

react wrapper that exports the hook `useVideometrics`

## How to use it

### having a video tag
```js
import { useVideometrics } from 'videometrics/react';

export default function Component() {
  const [videoRef] = useVideometrics({
    customData: {
      userId: '123',
      videoId: '456',
      tags: ['foo', 'bar'],
    }
  })

  return (
    <video ref={videoRef} src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" controls />
  )
}
```

### Having a video element


```js
import { useVideometrics } from 'videometrics/react';

export default function Component() {
  const { setVideoElement } = useVideometrics({
    customData: {
      userId: '123',
      videoId: '456',
      tags: ['foo', 'bar'],
    }
  })

  function onReady(videoElement) {
    setVideoElement(videoElement)
  }

  return (
    <SomeVideoComponent onReady={onReady} src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" controls />
  )
}
```

## Reference
### Positional
```js
const [videoRef, instance, setVideoElement] = useVideoMetrics(config, initialVideoElement)
``` 
or
### Named
```js
const { videoRef, instance, setVideoElement } = useVideoMetrics(config, initialVideoElement)
```

### `config` 
The configuration object.
[see defaultConfig](./defaultConfig.md)

### `initialVideoElement`
If for some reason you have the *DOM element* upfront, you can pass it as second parameter, to speed up things and reduce the refreshes.
It defaults to null 

### `videoRef`
A react ref that you need to pass to the video tag you want to get metrics from.

### instance
The videometrics instance that you can use to change the config, or to call the instance methods to stop and start the capture or to manually trigger a data upload.

### setVideoElement
You can use this function to manually set the videoElement of the instance, if it suits you better than using the `videoRef` 
