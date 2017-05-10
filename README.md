# @klarna/disable-scroll

[![Build Status](https://travis-ci.org/klarna/disable-scroll.svg?branch=master)](https://travis-ci.org/klarna/disable-scroll)
[![npm version](https://img.shields.io/npm/v/@klarna/disable-scroll.svg?maxAge=10000)](https://www.npmjs.com/package/@klarna/disable-scroll)


[![example of fixing a layer on top of a scrollable body](demo.gif)](https://klarna.github.io/disable-scroll)

> Demo of fixing a layer on top of a scrollable body. You can find it in [`https://klarna.github.io/disable-scroll`](https://klarna.github.io/disable-scroll)

Anchor the body to it’s current scroll position. This is super useful to be able to fix a layer on top and put modals in it.

This works around known issues of positioning modals with `position: fixed`.

This library is super small and has no dependencies.

## Installation

```
npm install --save @klarna/disable-scroll
```

## Usage

```javascript
import setupDisableScroll from '@klarna/disable-scroll'

// Initialize the tool
const {pin, release, container} = setupDisableScroll(window)

pin() // Sticks the body to the current position
release() // Releases the body so it becomes scrollable again

const p = document.createElement('p')
p.innerText = 'This will be positioned in the floating layer'
container.appendChild(p)
```

### API

The `@klarna/disable-scroll` lib exposes a function that takes the `window` and returns the following functions:

- `pin`: Sets the `top` of the `body` to match the current `scrollTop`, and then resizes the `body` to be the same width and height as the `window`.
- `release`: Resets the `scrollTop` from the `top` of the `body`, and then resets the `body` to its original size.
- `container` gives a reference to an element positioned on top of the body that can be targeted for putting modals when the body is pinned.

## License

[Apache 2.0](LICENSE)
