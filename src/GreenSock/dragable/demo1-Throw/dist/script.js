/*
See https://greensock.com/draggable/ for details.
This demo uses InertiaPlugin which is a membership benefit of Club GreenSock, https://greensock.com/club/
*/
gsap.registerPlugin(InertiaPlugin)

var $snap = $('#snap')
var $liveSnap = $('#liveSnap')
var $container = $('#container')
var gridWidth = $('body').width() / 5
var gridHeight = 100
var gridRows = 6
var gridColumns = 5
var i; var x; var y

// loop through and create the grid (a div for each cell). Feel free to tweak the variables above
for (i = 0; i < gridRows * gridColumns; i++) {
  y = Math.floor(i / gridColumns) * gridHeight
  x = (i * gridWidth) % (gridColumns * gridWidth)
  $('<div/>').css({ position: 'absolute', border: '1px solid #454545', width: gridWidth - 1, height: gridHeight - 1, top: y, left: x }).prependTo($container)
}

// set the container's size to match the grid, and ensure that the box widths/heights reflect the variables above
gsap.set($container, { height: gridRows * gridHeight + 1, width: gridColumns * gridWidth + 1 })
gsap.set('.box', { width: gridWidth, height: gridHeight, lineHeight: gridHeight + 'px' })
gsap.set('#box2', { left: gridWidth * 2 })

// the update() function is what creates the Draggable according to the options selected (snapping).
function update() {
  var snap = $snap.prop('checked')
  var liveSnap = $liveSnap.prop('checked')
  Draggable.create('.box', {
    bounds: $container,
    edgeResistance: 0.65,
    type: 'x,y',
    inertia: true,
    autoScroll: true,
    liveSnap: liveSnap,
    snap: {
      x: function(endValue) {
        return (snap || liveSnap) ? Math.round(endValue / gridWidth) * gridWidth : endValue
      },
      y: function(endValue) {
        return (snap || liveSnap) ? Math.round(endValue / gridHeight) * gridHeight : endValue
      }
    }
  })
}

// when the user toggles one of the "snap" modes, make the necessary updates...
$snap.on('change', applySnap)
$liveSnap.on('change', applySnap)

function applySnap() {
  if ($snap.prop('checked') || $liveSnap.prop('checked')) {
    $('.box').each(function(index, element) {
      gsap.to(element, {
        x: Math.round(gsap.getProperty(element, 'x') / gridWidth) * gridWidth,
        y: Math.round(gsap.getProperty(element, 'y') / gridHeight) * gridHeight,
        delay: 0.1,
        ease: 'power2.inOut'
      })
    })
  }
  update()
}

update()
