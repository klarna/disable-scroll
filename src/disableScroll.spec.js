import {equal} from 'assert'
import setupDisableScroll from './disableScroll'

const divMock = () => ({
  style: {}
})

const getMocks = () => {
  const div = divMock()

  const mocks = [
    {
      addEventListener: function self (listenerName, listener) {
        mocks[0].listenerName = listenerName
        mocks[0].listener = listener
      },
      removeEventListener: function self (listenerName, listener) {
        mocks[0].listenerName = null
        mocks[0].listener = null
      },
      document: {
        documentElement: {},
        body: {
          appendChild: function self (div) {
            self.div = div
          },
          style: {}
        },
        createElement: () => div
      }
    },
    div
  ]

  return mocks
}

describe('disableScroll', () => {
  it('initializes the container', () => {
    const [windowMock, containerMock] = getMocks()

    setupDisableScroll(windowMock)

    equal(containerMock.style.display, 'none')
    equal(containerMock.style.top, '0')
    equal(containerMock.style.left, '0')
    equal(containerMock.style.position, 'absolute')
    equal(containerMock.style.zIndex, '1')
    equal(containerMock.style.pointerEvents, 'none')

    equal(windowMock.document.body.appendChild.div, containerMock)
  })

  describe('container', () => {
    it('is the div created when initializing', () => {
      const [windowMock, containerMock] = getMocks()

      const {container} = setupDisableScroll(windowMock)

      equal(container, containerMock)
    })
  })

  describe('pin', () => {
    it('fixes the body based on the window settings', () => {
      const [windowMock, containerMock] = getMocks()

      windowMock.innerHeight = 4000
      windowMock.innerWidth = 2000
      windowMock.document.documentElement.scrollTop = 3000

      const {pin} = setupDisableScroll(windowMock)

      pin()

      equal(windowMock.document.body.style.height, '4000px')
      equal(windowMock.document.body.style.position, 'fixed')
      equal(windowMock.document.body.style.top, '-3000px')
      equal(windowMock.document.body.style.width, '2000px')
      equal(windowMock.document.body.style.overflow, 'hidden')

      equal(containerMock.style.height, '4000px')
      equal(containerMock.style.width, '2000px')
      equal(containerMock.style.top, '3000px')
      equal(containerMock.style.display, 'block')

      equal(windowMock.listenerName, 'resize')

      windowMock.innerHeight = 8000
      windowMock.innerWidth = 7000

      windowMock.listener()

      equal(windowMock.document.body.style.height, '8000px')
      equal(windowMock.document.body.style.width, '7000px')

      equal(containerMock.style.height, '8000px')
      equal(containerMock.style.width, '7000px')
    })
  })

  describe('release', () => {
    it('resets the body and hides the drawing layer', () => {
      const [windowMock, containerMock] = getMocks()

      const originalBodyStyles = {
        height: 6000,
        position: 'relative',
        top: 7000,
        width: 8000,
        overflow: 'scroll'
      }

      const {pin, release} = setupDisableScroll(windowMock)

      windowMock.document.documentElement.scrollTop = 3000

      windowMock.document.body.style.height = originalBodyStyles.height
      windowMock.document.body.style.position = originalBodyStyles.position
      windowMock.document.body.style.top = originalBodyStyles.top
      windowMock.document.body.style.width = originalBodyStyles.width
      windowMock.document.body.style.overflow = originalBodyStyles.overflow

      pin()

      release()

      equal(windowMock.document.body.style.height, 6000)
      equal(windowMock.document.body.style.position, 'relative')
      equal(windowMock.document.body.style.top, 7000)
      equal(windowMock.document.body.style.width, 8000)
      equal(windowMock.document.body.style.overflow, 'scroll')

      equal(containerMock.style.display, 'none')
    })

    it('removes the listener', () => {
      const [windowMock] = getMocks()

      windowMock.innerHeight = 4000
      windowMock.innerWidth = 2000
      windowMock.document.documentElement.scrollTop = 3000

      const {pin, release} = setupDisableScroll(windowMock)

      pin()
      release()

      equal(windowMock.listenerName, null)
      equal(windowMock.listener, null)
    })
  })
})
