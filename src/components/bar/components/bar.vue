<!--  -->
<template>
  <div id="barEL">
    <p>bar 基础例子</p>
    <div>api学习：d3.scaleBand / d3.scaleLinear / d3.max/ d3.range(data.length)返回数组/ </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
// const data = [99, 71, 78, 25, 36, 92]

const data = [
  { name: 'E', value: 0.12702 },
  { name: 'E', value: 0.10702 },
  { name: 'E', value: 0.12702 },
  { name: 'E', value: 0.12702 },
  { name: 'E', value: 0.12702 },
  { name: 'E', value: 0.16702 }
]
const color = 'steelblue'
const height = 500
const width = 500
const margin = ({ top: 30, right: 0, bottom: 30, left: 40 })

export default {
  name: 'NonVueLineChart',
  mounted() {
    this.init()

    // var x = d3.scaleLinear()
    //   .domain([10, 130])
    //   .range([0, 960])
    // console.log(x.invert(81.22))
    // console.log(x(81.22))
  },
  methods: {
    init() {
      const svg = d3.select(this.$el).append('svg')
        .attr('width', 500)
        .attr('height', 500)

      const x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.4)

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)]).nice() // 线性的scale 可以用nice处理 小数位数
        .range([height - margin.bottom, margin.top])

      const xAxis = g => g // 处理成回调函数
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => data[i].name).tickSizeOuter(20)) //  y轴延长线

      const yAxis = g => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, data.format)) // 参数1 刻度的个数 / 参数2 刻度单位
        .call(g => g.select('.domain').remove())
        .call(g => g.append('text')
          .attr('x', -margin.left)
          .attr('y', 10)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text('1111'))

      svg.append('g')
        .attr('fill', color)
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', (d, i) => x(i))
        .attr('y', d => y(d.value))
        .attr('height', d => y(0) - y(d.value))
        .attr('width', x.bandwidth())

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
