<!--  -->
<template>
  <div id="createEdge">
    <el-button type="primary" @click="addNode">测试添加节点 add</el-button>
    createEdge</div>
</template>

<script>
import G6 from '@antv/g6'
export default {
  name: 'CreateEdge',

  components: {},
  data() {
    return {
      graph: null
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const data = {
        nodes: [
          {
            id: 'node_circle',
            x: 100,
            y: 100,
            type: 'circle',
            label: 'circle',
            labelCfg: {
              position: 'bottom'
              // offset: 5
            }
          },
          {
            id: 'node_rect',
            x: 200,
            y: 200,
            type: 'rect',
            label: 'rect'
          },
          // {
          //   id: 'node-ellipse',
          //   x: 330,
          //   y: 100,
          //   type: 'ellipse',
          //   label: 'ellipse'
          // },
          {
            id: 'node-ellipse',
            x: 330,
            y: 300,
            type: 'ellipse',
            size: [60, 30],
            label: 'ellipse',
            labelCfg: {
              position: 'bottom',
              offset: 5
            },
            style: {
              fill: '#fa8c16',
              stroke: '#000',
              lineWidth: 2
            }
          },
          {
            id: 'node-diamond',
            x: 460,
            y: 100,
            type: 'diamond',
            label: 'diamond'
          },
          {
            id: 'node-triangle',
            x: 560,
            y: 100,
            // size: 80,
            type: 'triangle',
            label: 'triangle'
          },
          {
            id: 'node-star',
            x: 660,
            y: 100,
            // size: [60, 30],
            type: 'star',
            label: 'star'
          },
          {
            id: 'node-image',
            x: 760,
            y: 100,
            size: 50,
            type: 'image',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
            label: 'image'
          },
          {
            id: 'node-modelRect',
            x: 900,
            y: 100,
            type: 'modelRect',
            label: 'modelRect'
          }
        ]
      }
      const descriptionDiv = document.createElement('div')
      descriptionDiv.innerHTML = 'Click the source and target node to create a new edge.'
      const container = document.getElementById('createEdge')
      container.appendChild(descriptionDiv)

      const width = container.scrollWidth
      const height = (500) - 20
      const graph = new G6.Graph({
        container: 'createEdge',
        width,
        height,
        linkCenter: false,
        defaultNode: {
          // type: 'circle',  // 在数据中已经指定 type，这里无需再次指定
          linkPoints: {
            top: true,
            bottom: true,
            left: true,
            right: true,
            fill: '#fff',
            size: 5
          },
          anchorPoints: [
            [0, 0.5],
            [0.5, 1],
            [0.5, 0],
            [1, 0.5]
          ]
        },
        modes: {
          default: [{
            type: 'create-edge',
            trigger: 'drag' // 'click' by default. options: 'drag', 'click'
          }]
        },
        defaultEdge: {
          type: 'quadratic',
          style: {
            stroke: '#F6BD16',
            lineWidth: 2
          }
        }
      })

      this.graph = graph

      graph.data(data)
      graph.render()

      graph.on('aftercreateedge', (e) => {
        const edges = graph.save().edges
        G6.Util.processParallelEdges(edges)
        graph.getEdges().forEach((edge, i) => {
          graph.updateItem(edge, {
            curveOffset: edges[i].curveOffset,
            curvePosition: edges[i].curvePosition
          })
        })
      })

      if (typeof window !== 'undefined') {
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight) return
          graph.changeSize(container.scrollWidth, container.scrollHeight - 20)
        }
      }
    },
    addNode() { // 如何添加节点
      const model = {
        id: 'node_circle2',
        x: 100,
        y: 300,
        type: 'circle',
        label: 'circle',
        labelCfg: {
          position: 'bottom'
          // offset: 5
        }
      }

      this.graph.addItem('node', model)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
