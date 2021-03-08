<!--  -->
<template>
  <div id="g6RegisterNodeCustoDom">
    800*500
    <!-- <el-button @click="update">graph.update</el-button> -->
    <div id="mountNode" style="border:1px solid #ddd" />
  </div>
</template>

<script>
import G6 from '@antv/g6'

G6.registerNode(
  'customdom',
  {
    draw(cfg, group) {
      const keyShape = group.addShape('dom', {
        attrs: {
          width: cfg.size[0],
          height: cfg.size[1],
          // 传入 DOM 的 html
          html:
          `<div style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px; width: 
              ${cfg.size[0] - 5}px; height: ${cfg.size[1] - 5}px; display: flex;">
              <div style="height: 100%; width: 33%; background-color: #CDDDFD">
                <img alt="img" style="line-height: 100%; padding-top: 6px; padding-left: 8px;"
                 src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />  
              </div>
              <span style="margin:auto; padding:auto; color: #5B8FF9">${cfg.label}</span>
            </div>
          `
        },
        draggable: true
      })
      return keyShape
    }
  },
  'single-node'
)

const data = {
  nodes: [
    { id: 'node1', x: 50, y: 100, type: 'customdom' },
    { id: 'node2', x: 250, y: 100, type: 'customdom' }
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2'
    }
  ]
}

export default {
  name: 'G6RegisterNodeCustoDom',

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
        renderer: 'svg', // dom 需要svg renderer
        container: 'mountNode',
        width: 500,
        height: 500,
        defaultNode: {
          type: 'customdom',
          size: [120, 40]
        }
        // layout: {
        //   type: 'force',
        //   linkDistance: 300,
        //   preventOverlap: true, // 防止重叠
        //   nodeStrength: -30,
        //   edgeStrength: 0.1
        // }
      })
      this.graph = graph
      graph.data(data)
      graph.render()
    },
    update() {
      // this.graph.update()
    }
  }
}

</script>
<style>

</style>
