# ad

[dot-event](https://github.com/dot-event/dot-event#readme) gpt ads

![coke](coke.gif)

## Install

```bash
npm install dot-event @dot-event/ad
```

## Usage

```js
// Create dot-event instance
//
const dot = require("dot-event")()

// Create googletag init promise
//
const initPromise = new Promise(resolve => {
  window.googletag.cmd.push(() => {
    window.googletag.pubads()
    window.googletag.pubads().enableSingleRequest()
    window.googletag.enableServices()
    resolve()
  })
})

// Extend dot with ad listener
//
require("@dot-event/ad")(dot, { initPromise: initPromise })

// Display an ad unit
//
dot.ad({
  unit: {
    divId: "test",
    path: "/0123456/content1/science-and-chill",
    sizes: [300, 250],
  },
})
```

## Options

| Option         | Description                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `unit.divId`   | [googletag.defineSlot](https://developers.google.com/doubleclick-gpt/reference#googletag.defineSlot) `opt_div`                  |
| `unit.path`    | [googletag.defineSlot](https://developers.google.com/doubleclick-gpt/reference#googletag.defineSlot) `path`                     |
| `unit.sizes`   | [googletag.defineSlot](https://developers.google.com/doubleclick-gpt/reference#googletag.defineSlot) `size`                     |
| `unit.sizeMap` | [googletag.sizeMapping](https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping) `sizeMapping` |
| `unit.a9`      | Attach A9 header bidding                                                                                                        |
| `unit.destroy` | Destroy unit at `divId`                                                                                                         |

## Events

```js
dot.any("adLoaded", console.log)
dot.any("adRendered", console.log)
```
