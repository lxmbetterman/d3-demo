<!--  -->
<template>
  <div id="g6Basic3">
    800*500
    <div id="mountNode" style="border:1px solid #ddd" />
  </div>
</template>

<script>
import G6 from '@antv/g6'

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
      y: 100,
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
      y: 100,
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

export default {
  name: 'G6Basic3',

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
        container: 'mountNode',
        width: 1500,
        height: 300,
        defaultNode: {
          // type: 'circle',  // 在数据中已经指定 type，这里无需再次指定
          style: {
            fill: '#bae637',
            stroke: '#eaff8f',
            lineWidth: 5
          },
          linkPoints: {
            top: true,
            bottom: true,
            left: true,
            right: true,
            fill: '#fff',
            size: 5
          },
          icon: {
            show: true,
            // img: '...', 可更换为其他图片地址
            width: 15,
            height: 15
          }
        }
      })
      graph.data(data)
      graph.render()
    }
  }
}

</script>
<style>

</style>
