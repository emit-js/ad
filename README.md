# ad

[emit](https://github.com/emit-js/emit#readme) gpt ads

![coke](coke.gif)

## Install

```bash
npm install @emit-js/emit @emit-js/ad
```

## Usage

```js
// Create emit instance
//
const emit = require("@emit-js/emit")()

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

// Extend emit with ad listener
//
require("@emit-js/ad")(emit, { initPromise: initPromise })

// Display an ad unit
//
emit.ad({
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
emit.any("adLoaded", console.log)
emit.any("adRendered", console.log)
```
