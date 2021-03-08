<!--  -->
<template>
  <div id="basicDagre">/dagre/basicDagre</div>
</template>

<script>
import G6 from '@antv/g6'
import insertCss from 'insert-css'
insertCss(`
  .g6-tooltip {
    border-radius: 6px;
    font-size: 12px;
    color: #fff;
    background-color: #000;
    padding: 2px 8px;
    text-align: center;
  }
`)
const data = {
  nodes: [
    {
      id: '1',
      dataType: 'alps',
      name: 'alps_file1',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf'
        },
        {
          label: 'dot',
          value: 'pai_graph.dot'
        },
        {
          label: 'init',
          value: 'init.rc'
        }
      ]
    },
    {
      id: '2',
      dataType: 'alps',
      name: 'alps_file2',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf'
        },
        {
          label: 'dot',
          value: 'pai_graph.dot'
        },
        {
          label: 'init',
          value: 'init.rc'
        }
      ]
    },
    {
      id: '3',
      dataType: 'alps',
      name: 'alps_file3',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf'
        },
        {
          label: 'dot',
          value: 'pai_graph.dot'
        },
        {
          label: 'init',
          value: 'init.rc'
        }
      ]
    },
    {
      id: '4',
      dataType: 'sql',
      name: 'sql_file1',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf'
        },
        {
          label: 'dot',
          value: 'pai_graph.dot'
        },
        {
          label: 'init',
          value: 'init.rc'
        }
      ]
    },
    {
      id: '5',
      dataType: 'sql',
      name: 'sql_file2',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf'
        },
        {
          label: 'dot',
          value: 'pai_graph.dot'
        },
        {
          label: 'init',
          value: 'init.rc'
        }
      ]
    },
    {
      id: '6',
      dataType: 'feature_etl',
      name: 'feature_etl_1',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf'
        },
        {
          label: 'dot',
          value: 'pai_graph.dot'
        },
        {
          label: 'init',
          value: 'init.rc'
        }
      ]
    },
    {
      id: '7',
      dataType: 'feature_etl',
      name: 'feature_etl_1',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf'
        },
        {
          label: 'dot',
          value: 'pai_graph.dot'
        },
        {
          label: 'init',
          value: 'init.rc'
        }
      ]
    },
    {
      id: '8',
      dataType: 'feature_extractor',
      name: 'feature_extractor',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf'
        },
        {
          label: 'dot',
          value: 'pai_graph.dot'
        },
        {
          label: 'init',
          value: 'init.rc'
        }
      ]
    }
  ],
  edges: [
    {
      source: '1',
      target: '2'
    },
    {
      source: '1',
      target: '3'
    },
    {
      source: '2',
      target: '4'
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
      source: '5',
      target: '6'
    },
    {
      source: '6',
      target: '7'
    },
    {
      source: '6',
      target: '8'
    }
  ]
}

export default {
  name: 'BasicDagre',

  components: {},
  data() {
    return {
    }
  },

  computed: {
  },

  mounted() {
    this.register()
    this.init()
  },

  methods: {
    register() {
      G6.registerNode(
        'sql',
        {
          drawShape(cfg, group) {
            const rect = group.addShape('rect', {
              attrs: {
                x: -75, // 减去宽高的一半
                y: -25,
                width: 150,
                height: 50,
                radius: 20,
                stroke: '#5B8FF9',
                fill: '#C6E5FF',
                lineWidth: 10
              },
              name: 'rect-shape'
            })
            if (cfg.name) {
              group.addShape('text', {
                attrs: {
                  text: cfg.name,
                  x: 0, // 文字开始位置
                  y: 0,
                  fill: '#00287E',
                  fontSize: 18,
                  textAlign: 'center', // 文字左右剧中
                  textBaseline: 'middle', // 文字上下剧中
                  fontWeight: 'bold'
                },
                name: 'text-shape'
              })
            }
            return rect
          }
        },
        'single-node'
      )
    },
    init() {
      const container = document.getElementById('basicDagre')
      //   console.log(container)
      const width = container.scrollWidth
      const height = 500 // container.scrollHeight ||
      const graph = new G6.Graph({
        container: 'basicDagre',
        width,
        height,
        layout: {
          type: 'dagre',
          //   rankdir: 'LR',
          nodesepFunc: (d) => { // 节点交叉轴方向的间隔距离控制
            // console.log(d)
            if (d.id === '3') {
              return 100
            }
            if (d.id === '2') {
              return 200
            }
            return 100
          },
          ranksep: 70,
          controlPoints: true
        },
        defaultNode: {
          type: 'sql'
        },
        defaultEdge: {
          type: 'polyline',
          style: {
            radius: 30,
            offset: 45,
            endArrow: true,
            lineWidth: 5,
            stroke: '#C2C8D5'
          }
        },
        nodeStateStyles: {
          selected: {
            stroke: '#d9d9d9',
            fill: '#5394ef'
          }
        },
        modes: {
          default: [
            'drag-canvas',
            'drag-node',
            'zoom-canvas',
            'click-select',
            {
              type: 'tooltip',
              formatText(model) {
                const cfg = model.conf
                const text = []
                cfg.forEach((row) => {
                  text.push(row.label + ':' + row.value + '<br>')
                })
                return text.join('\n')
              },
              offset: 30
            }
          ]
        },
        fitView: true
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
