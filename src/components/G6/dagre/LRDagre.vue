<!--  -->
<template>
  <div id="LRDagre">LRDagre</div>
</template>

<script>
import G6 from '@antv/g6'
const data = {
  nodes: [
    {
      id: '0',
      label: '0'
    },
    {
      id: '1',
      label: '1'
    },
    {
      id: '2',
      label: '2'
    },
    {
      id: '3',
      label: '3'
    },
    {
      id: '4',
      label: '4'
    },
    {
      id: '5',
      label: '5'
    },
    {
      id: '6',
      label: '6'
    },
    {
      id: '7',
      label: '7'
    },
    {
      id: '8',
      label: '8'
    },
    {
      id: '9',
      label: '9'
    }
  ],
  edges: [
    {
      source: '0',
      target: '1'
    },
    {
      source: '0',
      target: '2'
    },
    {
      source: '1',
      target: '4'
    },
    {
      source: '0',
      target: '3'
    },
    {
      source: '3',
      target: '4'
    },
    {
      source: '4',
      target: '5'
    },
    {
      source: '4',
      target: '6'
    },
    {
      source: '5',
      target: '7'
    },
    {
      source: '5',
      target: '8'
    },
    {
      source: '8',
      target: '9'
    },
    {
      source: '2',
      target: '9'
    },
    {
      source: '3',
      target: '9'
    }
  ]
}
export default {
  name: 'LRDagre',

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
      const container = document.getElementById('LRDagre')
      const width = container.scrollWidth
      const height = 500
      const graph = new G6.Graph({
        container: 'LRDagre',
        width,
        height,
        fitView: true,
        modes: {
          default: ['drag-canvas', 'drag-node']
        },
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          //   align: 'UR',
          controlPoints: true
        //   nodesepFunc: () => 1,
        //   ranksepFunc: () => 1
        },
        defaultNode: {
          size: [30, 20],
          type: 'rect',
          style: {
            lineWidth: 2,
            stroke: '#5B8FF9',
            fill: '#C6E5FF'
          }
        },
        defaultEdge: {
          type: 'polyline',
          size: 1,
          color: '#e2e2e2',
          style: {
            endArrow: {
              path: 'M 0,0 L 12,2 L 12,-2 Z',
              fill: '#fff',
              stroke: 'red'
            },
            radius: 20
          }
        }
      })
      graph.data(data)
      graph.render()

      if (typeof window !== 'undefined') {
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight) return
          graph.changeSize(container.scrollWidth, container.scrollHeight)
        }
      }
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
