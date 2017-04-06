# @klarna/disable-scroll

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
import {pin, release, container} from '@klarna/disable-scroll'

pin() // Sticks the body to the current position
release() // Releases the body so it becomes scrollable again

const p = document.createElement('p')
p.innerText = 'This will be positioned in the floating layer'
container.appendChild(p)
```

### API

- `pin`: Sets the `top` of the `body` to match the current `scrollTop`, and then resizes the `body` to be the same width and height as the `window`.
- `release`: Resets the `scrollTop` from the `top` of the `body`, and then resets the `body` to its original size.
- `container` gives a reference to an element positioned on top of the body that can be targeted for putting modals when the body is pinned.

## License

[Apache 2.0](LICENSE)
