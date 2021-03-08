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

G6.registerNode('diamond', {
  draw(cfg, group) {
    // 如果 cfg 中定义了 style 需要同这里的属性进行融合
    const shape = group.addShape('path', {
      attrs: {
        path: this.getPath(cfg), // 根据配置获取路径
        stroke: cfg.color || '#ddd' // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
      }
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
    return shape
  },
  // 返回菱形的路径
  getPath(cfg) {
    const size = cfg.size || [40, 40] // 如果没有 size 时的默认大小
    const width = size[0]
    const height = size[1]
    //  / 1 \
    // 4     2
    //  \ 3 /
    const path = [
      ['M', 0, 0 - height / 2], // 上部顶点??
      ['L', width / 2, 0], // 右侧顶点
      ['L', 0, height / 2], // 下部顶点??
      ['L', -width / 2, 0], // 左侧顶点
      ['Z'] // 封闭
    ]
    return path
  },
  update(cfg, node) { // update性能优化，替代draw
    console.log(node)
    const group = node.getContainer() // 获取容器
    const shape = group.get('children')[0] // 按照添加的顺序
    const style = {
      path: this.getPath(cfg),
      stroke: cfg.color
    }
    shape.attr(style) // 更新属性
    // 更新文本的逻辑类似，但是需要考虑 cfg.label 是否存在的问题
    // 通过 label.attr() 更新文本属性即可
  }
})

const data1 = {
  nodes: [
    { id: 'node1', x: 50, y: 100, type: 'diamond', color: 'blue' }, // 最简单的
    { id: 'node2', x: 150, y: 100, type: 'diamond', size: [50, 100] }, // 添加宽高
    { id: 'node3', x: 250, y: 100, color: 'red', type: 'diamond' }, // 添加颜色
    { id: 'node4', x: 350, y: 100, label: '菱形', type: 'diamond' } // 附加文本
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
