import React from 'react'
import {render} from 'react-dom'
import {range} from 'ramda'
import setupDisableScroll from './disableScroll'

const {pin, release, container} = setupDisableScroll()

render(
  <main>
    {range(0, 100).map((_, index) => <p key={index}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>)}
  </main>,
  document.getElementById('root')
)

document.body.appendChild(container)

render(
  <div>
    <h1>This is placed on top</h1>
    <h1>This is placed on top</h1>
    <h1>This is placed on top</h1>
    <button
      onClick={() => {
        release()
        setTimeout(() => pin(), 1000)
      }}
      style={{
        background: 'black',
        color: 'white',
        padding: '10px 20px',
      }}>
      Close
    </button>
  </div>,
  container
)

setTimeout(() => pin(), 1000)
