<!--  -->
<template>
  <div id="g6RegisterNode">
    800*500
    <el-button @click="update">graph.update</el-button>
    <div id="mountNode" style="border:1px solid #ddd" />
  </div>
</template>

<script>
import G6 from '@antv/g6'

G6.registerNode(
  'custom',
  {
    // 响应状态变化
    setState(name, value, item) {
      const group = item.getContainer()
      const shape = group.get('children')[0] // 顺序根据 draw 时确定
      // console.log(group, group.get('children'), '???')
      if (name === 'running') {
        if (value) {
          shape.animate(
            {
              r: 20
            },
            {
              repeat: true,
              duration: 1000
            }
          )
        } else {
          shape.stopAnimate()
          shape.attr('r', 10)
        }
      }
    }
  },
  'circle'
)
const data1 = {
  nodes: [
    { id: 'node1', x: 50, y: 100, type: 'custom', color: 'blue' }, // 最简单的
    { id: 'node2', x: 150, y: 100, type: 'custom', size: [50, 100] }, // 添加宽高
    { id: 'node3', x: 250, y: 100, color: 'red', type: 'custom' }, // 添加颜色
    { id: 'node4', x: 350, y: 100, label: 'circle', type: 'custom' } // 附加文本
  ],
  edges: [
    // 表示一条从 node1 节点连接到 node2 节点的边
    {
      source: 'node1',
      target: 'node2'
    },
    {
      source: 'node2',
      target: 'node3'
    }
  ]
}

export default {
  name: 'G6RegisterNode',

  components: {},
  data() {
    return {
      graph: null
    }
  },

  computed: {},

  mounted() {
    this.demo1()
  },

  methods: {
    demo1() {
      const graph = new G6.Graph({
        container: 'mountNode',
        width: 500,
        height: 500
      })
      this.graph = graph
      graph.data(data1)
      graph.render()

      graph.on('node:mouseenter', (ev) => {
        const node = ev.item
        graph.setItemState(node, 'running', true)
      })

      graph.on('node:mouseleave', (ev) => {
        const node = ev.item
        graph.setItemState(node, 'running', false)
      })
    },
    update() {
      this.graph.update()
    }
  }
}

</script>
<style>

</style>
