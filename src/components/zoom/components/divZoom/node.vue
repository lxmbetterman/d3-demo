<!--  -->
<template>
  <div draggable="true" class="flow-node" :style="{transform:`translate(${position.x}px, ${position.y}px)`}">
    <!-- {{ node.x }} / {{ node.y }} -->
    <div class="flow-node-content">
      <div class="anchor-cilrcle" />
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'FlowNode',

  components: {},
  props: {
    node: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return { x: 0, y: 0 }
      }
    }
  },
  data() {
    return {
      position: { ...this.node }
    }
  },

  computed: {},

  mounted() {
    this.initDrag()
  },

  methods: {
    test() {
      // debugger
      // this.position.x = 1
    },
    initDrag() {
      const that = this
      const drag = () => { // 封装drag 的写法
        function dragstarted(event, d) {
          console.log('start')
          d3.select(this).raise()
        }

        // function dragged(event, d) {
        //   console.log('start')
        //   const g = d3.select(this)
        //   g.attr('transform', d => {
        //     d.x = event.x
        //     d.y = event.y
        //     return `translate(${d.x},${d.y})`
        //   })
        // }
        function dragged(event, d) {
          console.log('start')
          console.log(`translate(${event.x},${event.y})`)
          // that.position.x = event.x
          // that.position.y = event.y
        }

        function dragended(event, d) {
          console.log('start')
        }

        return d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      }
      d3.select(this.$el).select('.flow-node-content').call(drag())
      // console.log(d3.select(this.$el), '!!!')
    }

  }
}

</script>
<style lang='scss' scoped>
.flow-node{
  min-width: 100px;
  min-height: 100px;
  z-index: 100;
}
.flow-node-content{
    cursor: pointer;
    width: 100px;
    min-height: 30px;
    border-radius: 3px;
    border: 1px solid blue;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    transform: translate(-50%,-50%);
    pointer-events: auto;
    .anchor-cilrcle{
        width: 6px;
        height: 6px;
        border-radius: 3px;
        border: 1px solid red;
    }
}
</style>
