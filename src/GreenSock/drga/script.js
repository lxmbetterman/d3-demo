const rowSize = 100 // => container height / number of items
const containers = []

containers.get = i => containers[i]

Array.from(document.querySelectorAll('.container')).forEach(node => {
  let container

  containers.push(
    container = createContainer(node))

  Array.from(node.children).forEach(child => {
    container.insertItem(child)
  })

  container.indexItems()
})

function createContainer(element) {
  const index = containers.length
  const sortables = [] // Array of sortables
  const container = {
    index: index,
    element: element,
    sortables: sortables,
    indexItems: indexItems,
    insertItem: insertItem }

  TweenLite.to(element, 0.5, { autoAlpha: 1 })

  function indexItems() {
    sortables.forEach((s, i) => s.setIndex(i))
  }

  function insertItem(node) {
    container.sortables.push(Sortable(node, container.sortables.length, container.index))
  }

  return container
}

function changeIndex(item, to) {
  const container = containers.get(item.col)

  // Change position in array
  arrayMove(container.sortables, item.index, to)

  // Set index for each sortable
  container.indexItems()
}

function Sortable(element, index, col) {
  var content = element.querySelector('.item-content')
  var order = element.querySelector('.order')

  var animation = TweenLite.to(content, 0.3, {
    boxShadow: 'rgba(0,0,0,0.2) 0px 16px 32px 0px',
    force3D: true,
    scale: 1.1,
    paused: true })

  var dragger = new Draggable(element, {
    onDragStart: onDragStart,
    onRelease: onRelease,
    onDrag: onDrag,
    cursor: 'inherit',
    type: 'x,y' })

  // Public properties and methods
  var sortable = {
    dragger: dragger,
    element: element,
    index: index,
    col: col,
    setIndex: setIndex }

  TweenLite.set(element, { y: index * rowSize, x: 0 })

  function setIndex(index) {
    sortable.index = index
    order.textContent = index + 1

    // Don't layout if you're dragging
    if (!dragger.isDragging) layout()
  }

  function onDragStart() {
    sortable.initCol = sortable.col
    animation.play()
    this.update()
  }

  function onDrag() {
    let container = containers.get(sortable.col)
    const last = container

    containers.forEach(c => {
      if (c !== container && this.hitTest(c.element, '51%')) {
        container = c
        sortable.col = c.index
      }
    })

    if (container !== last) {
      // Remove the sortable from the last container;
      last.sortables.splice(sortable.index, 1)

      // Make sure we do not insert the sortable at an index higher than the next containers length...
      // Otherwise Natively Javascript will insert an 'undefined' value for every value between the containers length and the new item
      if (sortable.index > container.sortables.length - 1) {
        sortable.index = container.sortables.length
      }

      // After the proper sortable index is set... insert the sortable into the new containers list
      container.sortables.splice(sortable.index, 0, sortable)

      // Re index the last containers items, so that the empty space is removed
      last.indexItems()

      // Next we want to append the dragging target to the new container, However there are special steps we must follow,
      // in order to keep the drag target's position

      if (container.element !== sortable.element.parentNode) {
        container.element.appendChild(sortable.element)
        this.endDrag()

        // compensate for the directional shift in X.
        const width = sortable.element.clientWidth
        const newX = container.index < last.index ? width - width / 2 : width / 2 - width
        const newY = this.y
        // Not sure why I have to set values to 0... the to the correct value,
        // If I do not do this, it does not work for me.
        TweenLite.set(sortable.element, { x: 0, y: 0 })
        TweenLite.set(sortable.element, { x: newX, y: newY })

        this.startDrag(this.pointerEvent)
      }
    }

    // Calculate the current index based on element's position
    var index = clamp(Math.round(this.y / rowSize), 0, container.sortables.length - 1)

    if (index !== sortable.index) {
      changeIndex(sortable, index)
    }
  }

  function onRelease() {
    animation.reverse()

    if (sortable.initCol !== sortable.col) {
      const container = containers.get(sortable.col)
      container.indexItems()
    } else {
      layout()
    }
  }

  function layout() {
    TweenLite.to(element, 0.3, { y: sortable.index * rowSize, x: 0 })
  }

  return sortable
}

// Changes an elements's position in array
function arrayMove(array, from, to) {
  array.splice(to, 0, array.splice(from, 1)[0])
}

// Clamps a value to a min/max
function clamp(value, a, b) {
  return value < a ? a : value > b ? b : value
}
