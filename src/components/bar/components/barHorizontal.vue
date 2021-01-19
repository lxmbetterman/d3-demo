<!-- 水平柱状图 -->
<template>
  <div id="HorizontalBar" />
</template>

<script>
import * as d3 from 'd3'
const width = 500
const height = 500
const margin = ({ top: 30, right: 0, bottom: 30, left: 40 })
const data = [
  { name: 'E', value: 0.12702 },
  { name: 'E', value: 0.10702 },
  { name: 'E', value: 0.12702 },
  { name: 'E', value: 0.12702 },
  { name: 'E', value: 0.12702 },
  { name: 'E', value: 0.16702 }
]

export default {
  name: 'HorizontalBar',
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
      const svg = d3.select('#HorizontalBar').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])

      const x = d3.scaleLinear() // x scale线性尺
        .domain([0, d3.max(data, d => d.value)])
        .range([margin.left, width - margin.right])

      const y = d3.scaleBand() // y scaleBand 尺
        .domain(d3.range(data.length))
        .rangeRound([margin.top, height - margin.bottom]) // range / rangeRound四舍五入吧？
        .padding(0.1)

      const xAxis = g => g
        .attr('transform', `translate(0,${margin.top})`)
        .call(d3.axisTop(x).ticks(width / 80, data.format))
        .call(g => g.select('.domain').remove())

      const yAxis = g => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSizeOuter(0))

      svg.append('g')
        .attr('fill', 'steelblue')
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', x(0))
        .attr('y', (d, i) => y(i))
        .attr('width', d => x(d.value) - x(0))
        .attr('height', y.bandwidth())

      svg.append('g') // 设置字体 所有text为一组 g上设置的熟悉 text同时生效
        .attr('fill', 'red')
        .attr('text-anchor', 'end') // 字体right to left
        .attr('font-family', 'sans-serif')
        .attr('font-size', 20)
        .selectAll('text')
        .data(data)
        .join('text')
        .attr('x', d => x(d.value))
        .attr('y', (d, i) => y(i) + y.bandwidth() / 2)
        .attr('dy', '0.35em')
        .attr('dx', -4)
        .text(d => (d.value)) // format
        .call(text => text.filter(d => x(d.value) - x(0) < 20) // short bars
          .attr('dx', +4)
          .attr('fill', 'black')
          .attr('text-anchor', 'start'))

      svg.append('g')
        .call(xAxis)

      svg.append('g')
        .call(yAxis)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
