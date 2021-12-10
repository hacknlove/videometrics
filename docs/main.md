# videometrics/main

This is the core of videometrics. It is intended to be used in vanilla js project. 

If you are using a supported framework (currently react), it's recomended to use the provided wrapper.

If you are using an unsupported framework, please fork the repository, write a wrapper for your framework and do a pull request. 
## Quick example

```js
import Videometrics from 'videometrics'
import defaultConfig from 'videometrics/defaultConfig'
import s3 from 'videometrics/s3'

const config = {
  ...defaultConfig,
  ...s3,
  customData: {
    videoId: 'foo-bar'
  },
  bulk: 1000
}

const videoElement = document.getElementsByTagName('video')[0]

const videometrics = new Videometrics(videoElement, config)
```
## Constructor

```js
new Videoelement(HTMLVideoElement, [config](./defaultConfig.md))
```

## methods and attributes
### `bulk()`
It sends the data and wipes the cache, if succedd.

### `stop()`
It detaches the event handlers

### `start()`
It attaches the event handlers back. It's called automatically by the constructor.
Changes in `config.videoEvents` or `config.windowEvents` require `videometrics.stop(); videometrics.start()` to be called, to detach and retach the event handlers.
