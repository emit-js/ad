/*global Promise*/
/*prettier-ignore*/
"use strict";

module.exports = function(dot, opts) {
  opts = opts || {}

  if (dot.state.ad) {
    return dot
  }

  dot.state.ad = Object.assign(
    {
      initPromise: Promise.resolve(),
      slots: {},
    },
    opts
  )

  dot.any("ad", ad)
  dot.state.ad.initPromise.then(setupListeners.bind(dot))

  return dot
}

function ad(o) {
  var dot = o.dot,
    opt = o.opt

  var promise = dot.state.ad.initPromise

  if (opt.unit) {
    promise = promise.then(function() {
      unit(dot.state.ad.slots, opt.unit)
    })
  }

  if (opt.targets) {
    promise = promise.then(function() {
      targets(opt.targets)
    })
  }

  return promise
}

function setupListeners() {
  var dot = this

  window.googletag
    .pubads()
    .addEventListener("slotRenderEnded", function(e) {
      var divId = e.slot.getSlotElementId()

      dot("adRendered", divId, {
        divId: divId,
        isEmpty: e.isEmpty,
        size: e.size,
      })
    })

  window.googletag
    .pubads()
    .addEventListener("slotOnload", function(e) {
      var divId = e.slot.getSlotElementId()

      dot("adLoaded", divId, { divId: divId })
    })
}

function targets(t) {
  for (var k in t) {
    window.googletag.pubads().setTargeting(k, t[k] || "")
  }
}

function unit(slots, u) {
  var a9 = u.a9,
    destroy = u.destroy,
    divId = u.divId,
    oop = u.oop,
    path = u.path,
    sizeMap = u.sizeMap,
    sizes = u.sizes,
    targets = u.targets

  var promise, slot

  if (destroy) {
    window.googletag.destroySlots([slots[divId]])
  } else if (slots[divId]) {
    window.googletag.pubads().refresh([slots[divId]])
  } else if (oop) {
    slot = window.googletag.defineOutOfPageSlot(path, divId)
  } else {
    slot = window.googletag.defineSlot(path, sizes, divId)

    if (slot && sizeMap) {
      slot.defineSizeMapping(sizeMap)
    }
  }

  if (slot && targets) {
    for (var key in targets) {
      slot.setTargeting(key, targets[key])
    }
  }

  if (slot && a9) {
    promise = fetchA9(u)
  }

  if (slot) {
    slot.addService(window.googletag.pubads())
    window.googletag.display(divId)
  }

  slots[divId] = slot

  return promise
}

function fetchA9(u) {
  var divId = u.divId,
    path = u.path,
    sizes = u.sizes

  return new Promise(function(resolve) {
    window.apstag.fetchBids(
      {
        slots: [
          {
            sizes: sizes,
            slotID: divId,
            slotName: path,
          },
        ],
        timeout: 2e3,
      },
      function() {
        window.apstag.setDisplayBids()
        resolve()
      }
    )
  })
}
