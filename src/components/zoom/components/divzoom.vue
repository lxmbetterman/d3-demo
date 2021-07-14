/* eslint-disable vue/require-v-for-key */
<!--  -->
<template>
  <div>
    <p>div 的zoom 测试</p>
    <div id="zoomEventReceiver">
      <div id="transformG" class="transformG">
        <!-- <p v-for="(item,index) in nodes" :key="index">{{ item.x }}\{{ item.y }}</p> -->
        <!-- <FlowNode v-for="(item,index) in nodes" :key="index" class="test22" :node="item" /> -->
        <div v-for="(item,index) in nodes" :key="index" draggable="true" class="flow-node" :style="{transform:`translate(${item.x}px, ${item.y}px)`}">
          <!-- {{ node.x }} / {{ node.y }} -->
          <div class="flow-node-content">
            <div class="anchor-cilrcle" />
          </div>
        </div>
        <svg id="svg" />
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
// import FlowNode from './divZoom/node'

// console.log(data, 'data')
export default {
  name: 'Divzoom',
  components: { },
  data() {
    return {
      nodes: [
        { x: 100, y: 100 },
        { x: 400, y: 400 },
        { x: 400, y: 200 }
      ]
    }
  },

  computed: {},

  mounted() {
    this.init()
    // console.log(d3.geoPath)
    document.getElementById('transformG').addEventListener('dragstart', function(event) {
    // dataTransfer.setData()方法设置数据类型和拖动的数据
      console.log(event)
      event.stopPropagation()
      event.defaultPrevented()
    })
    this.initDrag()
  },

  methods: {
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
          console.log('start', event)
          console.log(`translate(${event.x},${event.y})`)
          // that.nodes[0].x = event.x
          // that.nodes[0].y = event.y
        }

        function dragended(event, d) {
          console.log('start')
        }

        return d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      }
      d3.select('#transformG').select('.flow-node-content').call(drag())
      // console.log(d3.select(this.$el), '!!!')
    },
    init() {
      const svg = d3.select('#svg')

      svg
        .append('g')
        .append('path')
        .attr('d', 'M100,100 L400,400L400,400')
        .attr('stroke', 'red')

      // -----------------
      const zoomEventReceiver = d3.select('#zoomEventReceiver')
      const transformG = d3.select('.transformG')

      let transform

      const container = d3.select('#zoomEventReceiver')
      const zoom = d3.zoom().on('zoom', e => {
        transformG.style('transform', 'translate(' + e.transform.x + 'px,' + e.transform.y + 'px) scale(' + e.transform.k + ')')
      })
      container.call(zoom)
    },
    test(e) {
      console.log(e)
    },
    test2() {
      alert(22)
    }
  }
}

</script>
<style lang='scss' scoped>
#zoomEventReceiver{
    width: 600px;
    height: 600px;
    margin: 200px auto;
    background-color: aqua;
    overflow: hidden;
    position: relative;
    .transformG{
        position: absolute;
        transform-origin: 0px 0px;
        pointer-events: none;
        backface-visibility: hidden;
        will-change: transform;
        width: 100%;
        height: 100%;
    }
}
// .node{
//     width: 50px;
//     height: 50px;
//     background-color: rgba(0,0,0,.1);
//     display: flex;
//     position: absolute;
//     align-items: center;
//     justify-content: center;
//     // transform: translate(-50%,-50%);
// }
#svg{
    overflow: visible;
    left: 0px;
    top: 0px;
    height: 100vh;
    width: 100vw;
    position: absolute;
}

.flow-node{
  // min-width: 100px;
  // min-height: 100px;
  // z-index: 100;
  position: absolute;
  pointer-events: auto;
  will-change: transform;

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
