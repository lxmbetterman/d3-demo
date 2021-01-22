<!--  -->
<template>
  <div id="RidgelinePlot" />
</template>

<script>
import * as d3 from 'd3'
const data = require('../data/ridgelinePlot')
console.log(data)

const width = 1500
const height = 1000
const margin = ({ top: 80, right: 30, bottom: 60, left: 150 })
const overlap = 8
export default {
  name: 'RidgelinePlot',

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
      const svg = d3.select('#RidgelinePlot').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]) // 实现显示的移动

      const x = d3.scaleTime()
        .domain(d3.extent(data.dates.map(item => new Date(item)))) // 基于时间对象的操作
        .range([margin.left, width - margin.right])

      const y = d3.scalePoint()
        .domain(data.series.map(d => d.name))
        .range([margin.top, height - margin.bottom])

      const xAxis = g => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x)
          .ticks()
          .tickSizeOuter(0))

      const yAxis = g => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickSize(0).tickPadding(4))
        // .call(g => g.select('.domain').remove())

      svg.append('g')
        .call(xAxis)

      svg.append('g')
        .call(yAxis)

      const z = d3.scaleLinear()
        .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
        .range([0, -overlap * y.step()])

      const area = d3.area()
        .curve(d3.curveBasis)
        .defined(d => !isNaN(d))
        .x((d, i) => x(new Date(data.dates[i])))
        .y0(0)
        .y1(d => z(d))

      const group = svg.append('g')
        .selectAll('g')
        .data(data.series)
        .join('g')
        .attr('transform', d => `translate(0,${y(d.name) + 1})`)

      group.append('path')
        .attr('fill', '#ddd')
        .attr('d', d => area(d.values))

      const line = area.lineY1()

      group.append('path')
        .attr('fill', 'none')
        .attr('stroke', '#666')
        .attr('d', d => line(d.values))
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
