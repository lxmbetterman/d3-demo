<!--  -->
<template>
  <div>
    <el-button>el-button</el-button>
    <div id="ZoomableAreaChart" />

  </div>
</template>

<script>
const data = require('../data/zoomableAreaChart').map(item => {
  item.date = new Date(item.date)
  return item
})
// console.log(data)
import * as d3 from 'd3'

const width = 1000
const height = 500
const margin = ({ top: 30, right: 30, bottom: 90, left: 40 })
export default {
  name: 'ZoomableAreaChart',

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
      var strictIsoParse = d3.timeFormat('%Y/%m/%d')
      const svg = d3.select('#ZoomableAreaChart').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]) // 实现显示的移动

      svg.append('clipPath')
        .attr('id', 'rectClipPath')
        .append('rect')
        .attr('x', margin.left)
        .attr('y', margin.top)
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)

      const x = d3.scaleUtc()
        .domain(d3.extent(data, d => d.date)) // x轴的 domain
        .range([margin.left, width - margin.right])

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)]).nice()
        .range([height - margin.bottom, margin.top])

      const xAxis = (g, zoomx) => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(zoomx).tickFormat(d => {
          return strictIsoParse(d)
        }).ticks().tickSizeOuter(0))

      const yAxis = (g, y) => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, 's'))
        .call(g => g.select('.domain').remove())
        .call(g => g.select('.tick:last-of-type text').clone()
          .attr('x', 3)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .text(data.y))

      const area = (data, zoomedX) => d3.area() // 这个area 需要自定义处理zoom
        .curve(d3.curveStepAfter) // 很多折线类型
        .x(d => zoomedX(d.date))
        .y0(y(0))
        .y1(d => y(d.value))(data)

      const path = svg.append('path')
        .attr('clip-path', 'url(#rectClipPath)')
        .attr('fill', 'steelblue')
        .attr('d', area(data, x))

      const gx = svg.append('g')
        .call(xAxis, x)

      // gx.selectAll(' text').attr('transform', 'translate(56,56) rotate(20)')

      svg.append('g')
        .call(yAxis, y)

      function zoomed(event) { // event.transform.rescaleX
        const zoomedX = event.transform.rescaleX(x)
        path.attr('d', area(data, zoomedX))
        gx.call(xAxis, zoomedX) //
        gx.selectAll(' text').attr('transform', 'translate(10,50) rotate(-45)')
      }

      const zoom = d3.zoom()
        .scaleExtent([1, Infinity])
        .extent([[margin.left, 0], [width - margin.right, height]])
        .translateExtent([[margin.left, -Infinity], [width - margin.right, Infinity]])
        .on('zoom', zoomed)

      svg.call(zoom)
        .transition()
        .duration(750)
        .call(zoom.scaleTo, 4, [x(Date.UTC(2001, 8, 1)), 0])
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
