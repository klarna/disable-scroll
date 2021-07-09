export default (theWindow = window) => {
  const container = theWindow.document.createElement('div')
  let scrollTop

  container.style.display = 'none'
  container.style.top = '0'
  container.style.left = '0'
  container.style.position = 'absolute'
  container.style.zIndex = '1'
  container.style.pointerEvents = 'none'

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

    previousBodyStyles.height = theWindow.document.body.style.height
    previousBodyStyles.position = theWindow.document.body.style.position
    previousBodyStyles.top = theWindow.document.body.style.top
    previousBodyStyles.width = theWindow.document.body.style.width
    previousBodyStyles.overflow = theWindow.document.body.style.overflow

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
    theWindow.document.body.style.height = previousBodyStyles.height
    theWindow.document.body.style.position = previousBodyStyles.position
    theWindow.document.body.style.top = previousBodyStyles.top
    theWindow.document.body.style.width = previousBodyStyles.width
    theWindow.document.body.style.overflow = previousBodyStyles.overflow

    container.style.display = 'none'

    theWindow.document.documentElement.scrollTop = theWindow.document.body.scrollTop = scrollTop

    theWindow.removeEventListener('resize', resizeListener)
  }

  return { pin, release, container }
}
