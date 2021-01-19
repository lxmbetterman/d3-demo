<!--  -->
<template>
  <div id="devergeBar" />
</template>

<script>
import * as d3 from 'd3'
const width = 1000
const height = 500
const margin = ({ top: 30, right: 0, bottom: 30, left: 40 })
const data = [
  { name: 'West Virginia', value: -0.032881380080021845 },
  { name: 'West Virginia', value: -0.022881380080021845 },
  { name: 'West Virginia', value: -0.022881380080021845 },
  { name: 'West Virginia', value: -0.012881380080021845 },
  { name: 'New York', value: 0.0038940346170125433 },
  { name: 'New York', value: 0.0028940346170125433 },
  { name: 'New York', value: 0.0018940346170125433 },
  { name: 'New York', value: 0.0038940346170125433 },
  { name: 'North Carolina', value: 0.09990065526832778 }

]

// const tickFormat = metric === "absolute" ? d3.formatPrefix("+.1", 1e6) : format

export default {
  name: 'DevergeBar',

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
      const svg = d3.select('#devergeBar').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])

      const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.value)) // d3.extent: compute the minimum and maximum value in an iterable.
        .rangeRound([margin.left, width - margin.right])

      const y = d3.scaleBand()
        .domain(d3.range(data.length))
        .rangeRound([margin.top, height - margin.bottom])
        .padding(0.1)

      const xAxis = g => g
        .attr('transform', `translate(0,${margin.top})`)
        .call(d3.axisTop(x).ticks(width / 80)) // tickFormat(tickFormat)
        .call(g => g.select('.domain').remove()) // 移除掉x轴的横线

      const yAxis = g => g
        .attr('transform', `translate(${x(0)},0)`)
        .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSize(0).tickPadding(6)) // tickSize刻度的长度，tickPadding文字离刻度的padding
        .call(g => g.selectAll('.tick text').filter(i => data[i].value < 0)
          .attr('text-anchor', 'start')
          .attr('x', 6))

      svg.append('g')
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('fill', d => d3.schemeSet1[d.value > 0 ? 1 : 0])
        .attr('x', d => x(Math.min(d.value, 0)))
        .attr('y', (d, i) => y(i))
        .attr('width', d => Math.abs(x(d.value) - x(0)))
        .attr('height', y.bandwidth())

      svg.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .selectAll('text')
        .data(data)
        .join('text')
        .attr('text-anchor', d => d.value < 0 ? 'end' : 'start')
        .attr('x', d => x(d.value) + Math.sign(d.value - 0) * 4)
        .attr('y', (d, i) => y(i) + y.bandwidth() / 2)
        .attr('dy', '0.35em')
        .text(d => (d.value))

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
