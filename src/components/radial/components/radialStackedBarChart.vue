<!--  -->
<template>
  <div id="RadialStackedBarChart" />
</template>

<script>
import * as d3 from 'd3'

const width = 1000
const height = 1000
const margin = ({ top: 30, right: 30, bottom: 30, left: 40 })
const innerRadius = 180
const outerRadius = 487.5

// const data = require('../data/radialStackedBarChart')
const data = require('../data/radialStackedBarChart').sort((a, b) => b.total - a.total)
const keys = ['Under 5 Years', '5 to 13 Years', '14 to 17 Years', '18 to 24 Years', '25 to 44 Years', '45 to 64 Years', '65 Years and Over']

export default {
  name: 'RadialStackedBarChart',

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
      const svg = d3.select('#PieChart').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [-width / 2, -height / 2, width, height]) // 实现显示的移动

      const z = d3.scaleOrdinal()
        .domain(keys)
        .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'])

      const y = d3.scaleRadial() // 半径方向的 y sacle
        .domain([0, d3.max(data, d => d.total)])
        .range([innerRadius, outerRadius])
      const x = d3.scaleBand() // 内圆环上的 角度尺
        .domain(data.map(d => d.State))
        .range([0, 2 * Math.PI])
        .align(0)

      const arc = d3.arc()
        .innerRadius(d => y(d[0]))
        .outerRadius(d => y(d[1]))
        .startAngle(d => x(d.data.State)) // 和饼状图数据不一样的是：需要计算startAngle和endAngle，饼状图的data数据模型里自带startAngle和endAngle，所有不用自己算
        .endAngle(d => x(d.data.State) + x.bandwidth())
        .padAngle(0.01)
        .padRadius(innerRadius)

      svg.append('g')
        .selectAll('g')
        .data(d3.stack().keys(keys)(data))
        .join('g')
        .attr('fill', d => z(d.key))
        .selectAll('path')
        .data(d => d)
        .join('path')
        .attr('d', arc)

      const xAxis = g => g
        .attr('text-anchor', 'middle') // 文字对齐方式
        .attr('font-size', '8px')
        .call(g => g.selectAll('g')
          .data(data)
          .join('g')
          .attr('transform', d => `
          rotate(${((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
          translate(${innerRadius},0)`)
          .call(g => g.append('line')
            .attr('x2', -5)
            .attr('stroke', '#000'))
          .call(g => g.append('text')
            .attr('transform', d => (x(d.State) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
              ? 'rotate(90)translate(0,16)'
              : 'rotate(-90)translate(0,-9)')
            .text(d => d.State)))

      const yAxis = g => g
        .attr('text-anchor', 'middle')
        .call(g => g.append('text')
          .attr('y', d => -y(y.ticks(5).pop()))
          .attr('dy', '-1em')
          .text('Population'))
        .call(g => g.selectAll('g')
          .data(y.ticks(5).slice(1))
          .join('g')
          .attr('fill', 'none')
          .call(g => g.append('circle')
            .attr('stroke', '#000')
            .attr('stroke-opacity', 0.5)
            .attr('r', y))
          .call(g => g.append('text')
            .attr('y', d => -y(d))
            .attr('dy', '0.35em')
            .attr('stroke', '#fff')
            .attr('stroke-width', 5)
            .text(y.tickFormat(5, 's'))
            .clone(true)
            .attr('fill', '#000')
            .attr('stroke', 'none')))

      const legend = g => g.append('g')
        .selectAll('g')
        .data(keys.reverse())
        .join('g')
        .attr('transform', (d, i) => `translate(-50,${(i - (keys.length - 1) / 2) * 20})`)
        .call(g => g.append('rect')
          .attr('width', 18)
          .attr('height', 18)
          .attr('fill', z))
        .call(g => g.append('text')
          .attr('x', 24)
          .attr('y', 9)
          .attr('dy', '0.35em')
          .text(d => d))

      svg.append('g')
        .call(xAxis)

      svg.append('g')
        .call(yAxis)

      svg.append('g')
        .call(legend)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
