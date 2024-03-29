<!--  -->
<template>
  <div id="setMode">setMode</div>
</template>

<script>
import G6 from '@antv/g6'
export default {
  name: 'SetMode',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    init() {
      let addedCount = 0
      // Register a custom behavior: add a node when user click the blank part of canvas
      G6.registerBehavior('click-add-node', {
        // Set the events and the corresponding responsing function for this behavior
        getEvents() {
          // The event is canvas:click, the responsing function is onClick
          return {
            'canvas:click': 'onClick'
          }
        },
        // Click event
        onClick(ev) {
          const self = this
          const graph = self.graph
          // Add a new node
          graph.addItem('node', {
            x: ev.canvasX,
            y: ev.canvasY,
            id: `node-${addedCount}` // Generate the unique id
          })
          addedCount++
        }
      })
      // Register a custom behavior: click two end nodes to add an edge
      G6.registerBehavior('click-add-edge', {
        // Set the events and the corresponding responsing function for this behavior
        getEvents() {
          return {
            'node:click': 'onClick', // The event is canvas:click, the responsing function is onClick
            mousemove: 'onMousemove', // The event is mousemove, the responsing function is onMousemove
            'edge:click': 'onEdgeClick' // The event is edge:click, the responsing function is onEdgeClick
          }
        },
        // The responsing function for node:click defined in getEvents
        onClick(ev) {
          const self = this
          const node = ev.item
          const graph = self.graph
          // The position where the mouse clicks
          const point = { x: ev.x, y: ev.y }
          const model = node.getModel()
          if (self.addingEdge && self.edge) {
            graph.updateItem(self.edge, {
              target: model.id
            })

            self.edge = null
            self.addingEdge = false
          } else {
            // Add anew edge, the end node is the current node user clicks
            self.edge = graph.addItem('edge', {
              source: model.id,
              target: model.id
            })
            self.addingEdge = true
          }
        },
        // The responsing function for mousemove defined in getEvents
        onMousemove(ev) {
          const self = this
          // The current position the mouse clicks
          const point = { x: ev.x, y: ev.y }
          if (self.addingEdge && self.edge) {
            // Update the end node to the current node the mouse clicks
            self.graph.updateItem(self.edge, {
              target: point
            })
          }
        },
        // The responsing function for edge:click defined in getEvents
        onEdgeClick(ev) {
          const self = this
          const currentEdge = ev.item
          if (self.addingEdge && self.edge === currentEdge) {
            self.graph.removeItem(self.edge)
            self.edge = null
            self.addingEdge = false
          }
        }
      })
      // Initial data
      const data = {
        nodes: [
          {
            id: 'node1',
            x: 100,
            y: 200
          },
          {
            id: 'node2',
            x: 300,
            y: 200
          },
          {
            id: 'node3',
            x: 300,
            y: 300
          }
        ],
        edges: [
          {
            id: 'edge1',
            target: 'node2',
            source: 'node1'
          }
        ]
      }

      const container = document.getElementById('setMode')

      // Add a selector to DOM
      const selector = document.createElement('select')
      selector.id = 'selector'
      const selection1 = document.createElement('option')
      selection1.value = 'default'
      selection1.innerHTML = 'Default Mode'
      const selection2 = document.createElement('option')
      selection2.value = 'addNode'
      selection2.innerHTML = 'Add Node (By clicking canvas)'
      const selection3 = document.createElement('option')
      selection3.value = 'addEdge'
      selection3.innerHTML = 'Add Edge (By clicking two end nodes)'
      selector.appendChild(selection1)
      selector.appendChild(selection2)
      selector.appendChild(selection3)
      container.appendChild(selector)

      const width = container.scrollWidth
      const height = (500) - 30
      const graph = new G6.Graph({
        container: 'setMode',
        width,
        height,
        // The sets of behavior modes
        modes: {
          // Defualt mode
          default: ['drag-node', 'click-select'],
          // Adding node mode
          addNode: ['click-add-node', 'click-select'],
          // Adding edge mode
          addEdge: [{
            type: 'create-edge',
            trigger: 'drag' // 'click' by default. options: 'drag', 'click'
          }]
        },
        // The node styles in different states
        nodeStateStyles: {
          // The node styles in selected state
          selected: {
            stroke: '#666',
            lineWidth: 2,
            fill: 'steelblue'
          }
        }
      })
      graph.data(data)
      graph.render()

      graph.on('aftercreateedge', (e) => {
        const edges = graph.save().edges
        console.log(edges, 'edges')
        G6.Util.processParallelEdges(edges)
        graph.getEdges().forEach((edge, i) => {
          graph.updateItem(edge, {
            curveOffset: edges[i].curveOffset,
            curvePosition: edges[i].curvePosition
          })
        })
      })

      // Listen to the selector, change the mode when the selector is changed
      selector.addEventListener('change', (e) => {
        const value = e.target.value
        // change the behavior mode
        graph.setMode(value)
      })

      if (typeof window !== 'undefined') {
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight) return
          graph.changeSize(container.scrollWidth, container.scrollHeight - 30)
        }
      }
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
