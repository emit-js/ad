/*global Promise*/
/*prettier-ignore*/
"use strict";

var ad = require("./ad"),
  dot = require("dot-event")()

var initPromise = new Promise(function(resolve) {
  window.googletag.cmd.push(function() {
    window.googletag
      .pubads()
      .setCategoryExclusion("nonendemic")
    window.googletag.pubads().enableSingleRequest()
    window.googletag.pubads().collapseEmptyDivs()
    window.googletag.pubads().setCentering(true)
    window.googletag.enableServices()
    resolve()
  })
})

ad(dot, { initPromise: initPromise })

dot("ad", {
  unit: {
    divId: "test",
    path: "/21054826/content1_1/art_science-and-chill",
    sizes: [300, 250],
  },
})

// eslint-disable-next-line no-console
dot.any("adLoaded", console.log)

// eslint-disable-next-line no-console
dot.any("adRendered", console.log)
