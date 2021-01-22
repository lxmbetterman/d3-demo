<!--  -->
<template>
  <div id="LineChart" />
</template>

<script>
import * as d3 from 'd3'
const data = require('../data/lineChart')
// const data = require('../data/lineChart2') // missing data
// console.log(data)

const width = 1000
const height = 500
const margin = ({ top: 80, right: 30, bottom: 60, left: 30 })
export default {
  name: 'LineChart',

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
      const svg = d3.select('#LineChart').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]) // 实现显示的移动

      const x = d3.scaleUtc()
        .domain(d3.extent(data, d => new Date(d.date)))
        .range([margin.left, width - margin.right])

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)]).nice()
        .range([height - margin.bottom, margin.top])

      const xAxis = g => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks().tickSizeOuter(0))

      const yAxis = g => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select('.domain').remove())
        .call(g => g.select('.tick:last-of-type text').clone()
          .attr('x', 3)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .text(data.y))

      const line = d3.line()
        .defined(d => !isNaN(d.value))
        .x(d => x(new Date(d.date)))
        .y(d => y(d.value))

      svg.append('g')
        .call(xAxis)

      svg.append('g')
        .call(yAxis)

      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', line)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
