# ad

![coke](http://25.media.tumblr.com/tumblr_m8i6rmeQDH1r49l3lo1_500.gif)

```bash
npm install dot-event @dot-event/ad
```

```js
import ad from "@dot-event/ad"
import Dot from "dot-event"

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

// Create dot-event instance
//
const dot = new Dot()

// Add ad functionality
//
ad(dot, { initPromise: initPromise })

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

| Option         | Description                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `unit.divId`   | `[googletag.defineSlot](https://developers.google.com/doubleclick-gpt/reference#googletag.defineSlot) opt_div`                  |
| `unit.path`    | `[googletag.defineSlot](https://developers.google.com/doubleclick-gpt/reference#googletag.defineSlot) path`                     |
| `unit.sizes`   | `[googletag.defineSlot](https://developers.google.com/doubleclick-gpt/reference#googletag.defineSlot) size`                     |
| `unit.sizeMap` | `[googletag.sizeMapping](https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping) sizeMapping` |
| `unit.a9`      | Attach A9 header bidding                                                                                                        |
| `unit.destroy` | Destroy unit at `divId`                                                                                                         |
