<!--  -->
<template>
  <div id="AreaChart" />
</template>

<script>

var dayjs = require('dayjs')
// import dayjs from 'dayjs' // ES 2015
import * as d3 from 'd3'

const width = 1000
const height = 500
const margin = ({ top: 30, right: 30, bottom: 30, left: 40 })

const data = require('../data/areaChart')
// .map(item => {
//   item.date = dayjs(item.date).format('YYYY-MM-DD')
//   return item
// })
console.log(data, '111')
export default {
  name: 'AreaChart',

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
      const svg = d3.select('#AreaChart').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]) // 实现显示的移动

      //   console.log(d3.extent(data, d => dayjs(d.date))[0].valueOf(), '@@@@')
      const x = d3.scaleTime()
        .domain(d3.extent(data, d => dayjs(d.date))) // domain js时间对象的数组
        .range([margin.left, width - margin.right])
      //   console.log(x('2012-04-16'))

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)]).nice()
        .range([height - margin.bottom, margin.top])

      const curve = d3.curveLinear // 一种曲线类型 d3定义了很多曲线类型 这是最基础的

      const area = d3.area()
        .curve(d3.curveStep)
        .x(d => {
        //   console.log(d.date)
        //   console.log(x(d.date), 'x(d.date)')
          return x(dayjs(d.date)) // 参数传入时间对象 不能使用时间字符串
        })
        .y0(y(0)) // 试试 .y0(d => y(d.value / 2))
        .y1(d => y(d.value))

      const xAxis = g => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

      const yAxis = g => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select('.domain').remove())
        .call(g => g.select('.tick:last-of-type text').clone()
          .attr('x', 3)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .text(data.y))
      svg.append('path')
        .datum(data)
        .attr('fill', 'steelblue')
        .attr('d', d => {
        //   console.log(d, '!!!')
        //   console.log(area(d)) // area 的path 数据
          return area(d)
        })

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
