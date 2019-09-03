export default (theWindow = window) => {
  const container = theWindow.document.createElement('div')
  let scrollTop

  container.style.display = 'none'
  container.style.top = '0'
  container.style.left = '0'
  container.style.position = 'absolute'
  container.style.zIndex = '1'

  theWindow.document.body.appendChild(container)

  const previousBodyStyles = {}

  const resizeListener = () => {
    theWindow.document.body.style.height = `${theWindow.innerHeight}px`
    theWindow.document.body.style.width = `${theWindow.innerWidth}px`

    container.style.height = `${theWindow.innerHeight}px`
    container.style.width = `${theWindow.innerWidth}px`
  }

  const pin = () => {
    scrollTop = theWindow.document.documentElement.scrollTop || theWindow.document.body.scrollTop

    const {height, position, top, width, overflow} = theWindow.document.body.style
    previousBodyStyles.height = height
    previousBodyStyles.position = position
    previousBodyStyles.top = top
    previousBodyStyles.width = width
    previousBodyStyles.overflow = overflow

    theWindow.document.body.style.height = `${theWindow.innerHeight}px`
    theWindow.document.body.style.position = 'fixed'
    theWindow.document.body.style.top = `-${scrollTop}px`
    theWindow.document.body.style.width = `${theWindow.innerWidth}px`
    theWindow.document.body.style.overflow = 'hidden'

    container.style.height = `${theWindow.innerHeight}px`
    container.style.width = `${theWindow.innerWidth}px`
    container.style.top = `${scrollTop}px`
    container.style.display = 'block'

    theWindow.addEventListener('resize', resizeListener)
  }

  const release = () => {
    const {height, position, top, width, overflow} = previousBodyStyles
    theWindow.document.body.style.height = height
    theWindow.document.body.style.position = position
    theWindow.document.body.style.top = top
    theWindow.document.body.style.width = width
    theWindow.document.body.style.overflow = overflow

    container.style.display = 'none'

    theWindow.document.documentElement.scrollTop = theWindow.document.body.scrollTop = scrollTop

    theWindow.removeEventListener('resize', resizeListener)
  }

  return { pin, release, container }
}
