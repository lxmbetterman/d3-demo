<!--  -->
<template>
  <div id="draglines">dragline</div>
</template>

<script>
import * as d3 from 'd3'
const width = 1000
const height = 500
const margin = ({ top: 30, right: 0, bottom: 30, left: 40 })
const size = 60
const nodes = [
  { x: 100, y: 200, r: 3 },
  { x: 500, y: 300, r: 3 }
]

export default {
  name: 'Draglines',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const drag = () => { // 封装drag 的写法
        function dragstarted(event, d) {
          console.log('start')
        }

        function dragged(event, d) {
          const g = d3.select(this)
          g.selectAll('rect').attr('x', d.x = event.x).attr('y', d.y = event.y)
          g.selectAll('circle').attr('cx', d.x = event.x).attr('cy', d.y = event.y)
        }

        function dragended(event, d) {
        }

        return d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      }
      const drag2 = () => { // 封装drag 的写法
        function dragstarted(event, d) {
          console.log('drag2 start')
        }

        function dragged(event, d) {
          console.log('drag2 dragging')
        }

        function dragended(event, d) {
          console.log('drag2 draggeded')
        }

        return d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      }
      // const that = this
      const svg = d3.select('#draglines').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])

      const nodeGroup = svg.selectAll('g')
        .data(nodes)
        .join('g')
        .call(drag())
      nodeGroup.append('rect')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('transform', `translate(${-size / 2},${-size / 2})`)
        .attr('width', size)
        .attr('height', size)
        .attr('stroke', 'red')
        .attr('fill', 'transparent')
        // .call(drag())

      nodeGroup
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => {
          return 3
        })
        .attr('stroke', 'red')
        .attr('fill', 'blue')
        .call(drag2())
    }
    // addAnchor(rect, d) {
    //   rect.selectAll('circle').append('circle')
    //     .attr('cx', d => d.x)
    //     .attr('cy', d => d.y)
    //     .attr('r', d => d.r)
    //     .attr('stroke', 'red')
    //     .attr('fill', 'blue')
    // }

  }
}

</script>
<style lang='scss' scoped>
</style>
