# videometrics

videometrics is a framework agsnostic and very configurable javascript library to collect user behaviour regarding video visualization and upload it as slightly formated but mostly raw data in bulks. 

It is composed by a dependence-less small main engine, and a small set of plugins to make things easier for us, the developer.

The provided plugins are:
* defaultConfiguration: A provided starting point for your configurations.
* react: `useVideoMetrics` hook
* s3: client side helpers to upload the data to s3
* s3ControllerFactory: serverside helper to create the API endpoit that creates s3 upload signatures

To further information, look at the specific READMEs

* [main](./docs/main.md)
* [defaultConfig](./docs/defaultConfig.md)
* [react](./docs/react.md)
* [s3](./docs/s3.md)
* [s3ControllerFactory](./docs/s3ControllerFactory.md)

## install

```sh
npm i videometrics
```
or
```
yarn videometrics
```
