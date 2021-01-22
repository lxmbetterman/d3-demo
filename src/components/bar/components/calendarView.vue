<!--  -->
<template>
  <div>
    <p>这张图表显示了从2000年到2020年道琼斯工业平均指数的每日变化。指数上升的日子是绿色的，下降的日子是粉红色的。数据:雅虎财经</p>
    <div id="CalendarView" />
  </div>

</template>

<script>
import dayjs from 'dayjs'
var weekOfYear = require('dayjs/plugin/weekOfYear')
// import AdvancedFormat from 'dayjs/plugin/advancedFormat' // ES 2015

dayjs.extend(weekOfYear) // use plugin
// console.log(dayjs('2000-05-26T00:00:00.000Z').year())
// console.log(dayjs('2000-05-26T00:00:00.000Z').week(), "dayjs('2018-06-27').week()")
// console.log(dayjs('2000-05-21T00:00:00.000Z').day(), "dayjs('2018-06-27').day()")
const data = require('../../../assets/calendarViewData').slice(4600)
// close: 10299.240234
// date: "2000-05-26T00:00:00.000Z"
// value: -0.0023905346211962174
// console.log(data, 'ttt')
import * as d3 from 'd3'

const width = 1000
const height = 160
const margin = ({ top: 30, right: 30, bottom: 30, left: 40 })
const cellSize = 17
export default {
  name: 'CalendarView',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    this.init()

    // d3.group 的用法
    const data = [
      { name: 'jim', amount: '34.0', date: '11/12/2015' },
      { name: 'carl', amount: '120.11', date: '11/12/2015' },
      { name: 'stacy', amount: '12.01', date: '01/04/2016' },
      { name: 'stacy', amount: '34.05', date: '01/04/2016' }
    ]
    const a = d3.group(data, d => d.name)
    // console.log(a, '1111')
  },

  methods: {
    init() {
      const years = d3.groups(data, d => dayjs(d.date).year()).reverse()
      // console.log(years, 'year')

      const svg = d3.select('#CalendarView').append('svg')
        .attr('width', width)
        .attr('height', height * years.length)
        .attr('viewBox', [0, 0, width, height * years.length])

      const year = svg.selectAll('g')
        .data(years)
        .join('g')
        .attr('transform', (d, i) => `translate(40.5,${height * i + cellSize * 1.5})`)

      year.append('text')
        .attr('x', -5)
        .attr('y', -5)
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'end')
        .text(d => d[0])

      year.append('g')
        .attr('text-anchor', 'end')
        .selectAll('text')
        .data(d3.range(7))
        .join('text')
        .attr('x', -5)
        .attr('y', i => (i + 0.5) * cellSize)
        .attr('dy', '0.31em')
        .text(d => `  周${d + 1}`)

      year.append('g')
        .selectAll('rect')
        .data(([, values]) => values)
        .join('rect')
        .attr('width', cellSize - 1)
        .attr('height', cellSize - 1)
        .attr('x', d => dayjs(d.date).week() * cellSize + 0.5)
        .attr('y', d => (dayjs(d.date).day()) * cellSize + 0.5)
        .attr('fill', d => 'red')
        .append('title')
        .text(d => `${d.date}`)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
