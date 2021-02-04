<!--  -->
<template>
  <div id="PieChart" />
</template>

<script>

import * as d3 from 'd3'

const data = require('../data/pieChart')
// console.log(data, 'data')

const width = 1000
const height = 1000
const margin = ({ top: 30, right: 30, bottom: 30, left: 40 })

export default {
  name: 'PieChart',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    this.init()
    // 练习代码
    var data = [1, 1, 2, 3, 5, 8, 13, 21]
    var arcs = d3.pie()(data)
    // console.log(arcs)

    var data1 = [
      { 'number': 4, 'name': 'Locke' },
      { 'number': 8, 'name': 'Reyes' },
      { 'number': 15, 'name': 'Ford' },
      { 'number': 16, 'name': 'Jarrah' },
      { 'number': 23, 'name': 'Shephard' },
      { 'number': 42, 'name': 'Kwon' }
    ]

    var arcs1 = d3.pie()
      .value(function(d) { return d.number })(data1)
  },

  methods: {
    init() {
      const svg = d3.select('#PieChart').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [-width / 2, -height / 2, width, height]) // 实现显示的移动

      const arc = d3.arc() // arc是一个回调函数 传入一个扇型 就会返回一个 path 值
        .innerRadius(100) // 定义内径
        .outerRadius(Math.min(width, height) / 4 - 1) // 定义外径

      const pie = d3.pie() // 饼状图
        .sort(null)
        .value(d => d.value)

      const arcs = pie(data)

      const color = d3.scaleOrdinal()
        .domain(data.map(d => d.name))
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())

      svg.append('g')
        .attr('stroke', 'black')
        .selectAll('path')
        .data(arcs)
        .join('path')
        .attr('fill', d => color(d.data.name))
        .attr('d', d => arc(d)) // d属性 ：定义path 的路径
        .append('title')
        .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`)

      function arcLabel() {
        const radius = Math.min(width, height) / 2 * 0.8
        return d3.arc().innerRadius(radius).outerRadius(radius)
      }

      svg.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .attr('text-anchor', 'middle')
        .selectAll('text')
        .data(arcs)
        .join('text')
        .attr('transform', d => {
          // console.log(d, arcLabel().centroid(d)) // centroid 中点位置
          return `translate(${arcLabel().centroid(d)})`
        })
        .call(text => text.append('tspan')
          .attr('y', '-0.4em')
          .attr('font-weight', 'bold')
          .text(d => d.data.name))
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append('tspan')
          .attr('x', 0)
          .attr('y', '0.7em')
          .attr('fill-opacity', 0.7)
          .text(d => d.data.value.toLocaleString()))
    }

  }
}

</script>
<style lang='scss' scoped>
</style>
