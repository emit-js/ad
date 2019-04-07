/*global Promise*/
/*prettier-ignore*/
"use strict";

var ad = require("./ad"),
  emit = require("@emit-js/emit")()

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

ad(emit, { initPromise: initPromise })

emit("ad", {
  unit: {
    divId: "test",
    path: "/21054826/content1_1/art_science-and-chill",
    sizes: [300, 250],
  },
})

// eslint-disable-next-line no-console
emit.any("adLoaded", console.log)

// eslint-disable-next-line no-console
emit.any("adRendered", console.log)
