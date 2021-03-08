<!--  -->
<template>
  <div id="g6Basic2">
    800*500
    <div id="mountNode" style="border:1px solid #ddd" />
  </div>
</template>

<script>
import G6 from '@antv/g6'

const data = {
  nodes: [
    {
      x: 100,
      y: 100,
      label: 'rect',
      type: 'rect',
      style: {
        // 仅在 keyShape 上生效
        fill: 'lightblue',
        stroke: '#888',
        lineWidth: 1,
        radius: 7
      },
      linkPoints: {
        top: true,
        bottom: true,
        left: true,
        right: true
        // ... 四个圆的样式可以在这里指定
      }
      // labelCfg: {...} // 标签的样式可以在这里指定
    }
  ]
}

export default {
  name: 'G6Basic2',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    this.demo1()
  },

  methods: {
    demo1() {
      const graph = new G6.Graph({
        renderer: 'svg',
        container: 'mountNode',
        width: 500,
        height: 300,
        nodeStateStyles: {
          // 各状态下的样式，平铺的配置项仅在 keyShape 上生效。需要在其他 shape 样式上响应状态变化则写法不同，参见上文提到的 配置状态样式 链接
          hover: {
            fillOpacity: 0.5,
            lineWidth: 4
          }
        }
      })
      graph.data(data)
      graph.render()
      // 监听鼠标进入节点事件
      graph.on('node:mouseenter', (evt) => {
        const node = evt.item
        // 激活该节点的 hover 状态
        graph.setItemState(node, 'hover', true)
      })
      // 监听鼠标离开节点事件
      graph.on('node:mouseleave', (evt) => {
        const node = evt.item
        // 关闭该节点的 hover 状态
        graph.setItemState(node, 'hover', false)
      })
    }
  }
}

</script>
<style>

</style>
