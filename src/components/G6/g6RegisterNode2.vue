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
  'diamond',
  {
    draw(cfg, group) {
      const size = this.getSize(cfg) // 转换成 [width, height] 的模式
      const color = cfg.color || '#ddd'
      const width = size[0]
      const height = size[1]
      //  / 1 \
      // 4     2
      //  \ 3 /
      const path = [
        ['M', 0, 0 - height / 2], // 上部顶点
        ['L', width / 2, 0], // 右侧顶点
        ['L', 0, height / 2], // 下部顶点
        ['L', -width / 2, 0], // 左侧顶点
        ['Z'] // 封闭
      ]
      // console.log(G6.Util)
      const style = Object.assign({}, {
        path: path,
        stroke: color
      },
      cfg.style
      )
      // 增加一个 path 图形作为 keyShape
      const keyShape = group.addShape('path', {
        attrs: {
          ...style
        },
        draggable: true,
        name: 'diamond-keyShape'
      })

      if (cfg.label) { // 如果有文本
      // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
      // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
      // style.text = cfg.label;
        group.addShape('text', {
        // attrs: style
          attrs: {
            x: 0, // 居中
            y: 0,
            textAlign: 'center',
            textBaseline: 'middle',
            text: cfg.label,
            fill: '#666'
          }
        })
      }
      // 返回 keyShape
      return keyShape
    },
    getAnchorPoints() {
      return [
        [0, 0], // 左侧中间
        [1, 1] // 右侧中间
      ]
    }
  },

  // 注意这里继承了 'single-node'
  'single-node'
)

const data1 = {
  nodes: [
    { id: 'node1', x: 50, y: 100, type: 'diamond', color: 'blue' }, // 最简单的
    { id: 'node2', x: 150, y: 100, type: 'diamond', size: [50, 100] }, // 添加宽高
    { id: 'node3', x: 250, y: 100, color: 'red', type: 'diamond' }, // 添加颜色
    { id: 'node4', x: 350, y: 100, label: '菱形', type: 'diamond' } // 附加文本
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
    },
    update() {
      this.graph.update()
    }
  }
}

</script>
<style>

</style>
