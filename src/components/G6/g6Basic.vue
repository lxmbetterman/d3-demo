<!--  -->
<template>
  <div id="g6Basic">
    800*500
    <div id="mountNode" style="border:1px solid #ddd" />
    <div id="mountNode2" style="border:1px solid #ddd" />
  </div>
</template>

<script>
import G6 from '@antv/g6'

const data = {
  // 点集
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
    }
  ],
  // 边集
  edges: [
    // 表示一条从 node1 节点连接到 node2 节点的边
    {
      source: 'node1',
      target: 'node2'
    }
  ]
}
export default {
  name: 'G6Basic',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    this.demo1()
    this.demo2()
  },

  methods: {
    demo1() {
      const graph = new G6.Graph({
        container: 'mountNode', // 指定图画布的容器 id，与第 9 行的容器对应
        // 画布宽高
        width: 800,
        height: 500
      })
      // 读取数据
      graph.data(data)
      // 渲染图
      graph.render()
    },
    demo2() {
      const graph = new G6.Graph({
        renderer: 'svg',
        container: 'mountNode2',
        width: 800,
        height: 600,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'] // 允许拖拽画布、放缩画布、拖拽节点
        },
        defaultNode: {
          size: 30,
          labelCfg: {
            style: {
              fill: 'red'
            }
          }
        },
        defaultEdge: {
          labelCfg: {
            autoRotate: true
          }
        },
        // 节点在各状态下的样式
        nodeStateStyles: {
          // hover 状态为 true 时的样式
          hover: {
            fill: 'lightsteelblue'
          },
          // click 状态为 true 时的样式
          click: {
            stroke: '#000',
            lineWidth: 3
          }
        },
        // 边在各状态下的样式
        edgeStateStyles: {
          // click 状态为 true 时的样式
          click: {
            stroke: 'steelblue'
          }
        },
        // 布局
        layout: {
          type: 'force',
          linkDistance: 200,
          preventOverlap: true, // 防止重叠
          nodeStrength: -30,
          edgeStrength: 0.1
        }
      })
      const main = async() => {
        const response = await fetch(
          'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'
        )
        const remoteData = await response.json()
        console.log(remoteData, 'remotedata')

        const nodes = remoteData.nodes
        const edges = remoteData.edges
        nodes.forEach((node) => {
          if (!node.style) {
            node.style = {}
          }
          node.style.lineWidth = 1
          node.style.stroke = '#666'
          node.style.fill = 'steelblue'
          switch (node.class) {
            case 'c0': {
              node.type = 'circle'
              break
            }
            case 'c1': {
              node.type = 'rect'
              node.size = [35, 20]
              break
            }
            case 'c2': {
              node.type = 'ellipse'
              node.size = [35, 20]
              break
            }
          }
        })
        edges.forEach((edge) => {
          if (!edge.style) {
            edge.style = {}
          }
          edge.style.lineWidth = edge.weight
          edge.style.opacity = 0.6
          edge.style.stroke = 'grey'
        })

        graph.data(remoteData)
        graph.render() /

        // 监听鼠标进入节点
        graph.on('node:mouseenter', (e) => {
          const nodeItem = e.item
          // 设置目标节点的 hover 状态 为 true
          graph.setItemState(nodeItem, 'hover', true)
        })
        // 监听鼠标离开节点
        graph.on('node:mouseleave', (e) => {
          const nodeItem = e.item
          // 设置目标节点的 hover 状态 false
          graph.setItemState(nodeItem, 'hover', false)
        })
        // 监听鼠标点击节点
        graph.on('node:click', (e) => {
          // 先将所有当前有 click 状态的节点的 click 状态置为 false
          const clickNodes = graph.findAllByState('node', 'click')
          clickNodes.forEach((cn) => {
            graph.setItemState(cn, 'click', false)
          })
          const nodeItem = e.item
          // 设置目标节点的 click 状态 为 true
          graph.setItemState(nodeItem, 'click', true)
        })
        // 监听鼠标点击节点
        graph.on('edge:click', (e) => {
          // 先将所有当前有 click 状态的边的 click 状态置为 false
          const clickEdges = graph.findAllByState('edge', 'click')
          clickEdges.forEach((ce) => {
            graph.setItemState(ce, 'click', false)
          })
          const edgeItem = e.item
          // 设置目标边的 click 状态 为 true
          graph.setItemState(edgeItem, 'click', true)
        })
      }
      main()
    }
  }
}

</script>
<style>

</style>
