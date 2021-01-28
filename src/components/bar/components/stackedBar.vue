<!--  -->
<template>
  <div id="stackedBar" />
</template>

<script>
import EleResize from '@/utils/resize.js'
import * as d3 from 'd3'
const width = 1000
const height = 500
const margin = ({ top: 30, right: 0, bottom: 30, left: 40 })
const data = [
  { name: 'Ca', '<10': 5038433, '10-19': 5170341, '20-29': 5809455, '30-39': 5354112, '40-49': 5179258, '50-59': 5042094, '60-69': 3737461, '70-79': 2011678, '≥80': 1311374, total: 38654206 },
  { name: 'Cb', '<10': 1038433, '10-19': 5170341, '20-29': 5809455, '30-39': 5354112, '40-49': 5179258, '50-59': 5042094, '60-69': 3737461, '70-79': 2011678, '≥80': 1311374, total: 38654206 },
  { name: 'Cc', '<10': 2038433, '10-19': 5170341, '20-29': 5809455, '30-39': 5354112, '40-49': 5179258, '50-59': 5042094, '60-69': 3737461, '70-79': 2011678, '≥80': 1311374, total: 38654206 },
  { name: 'Cd', '<10': 3038433, '10-19': 5170341, '20-29': 5809455, '30-39': 5354112, '40-49': 5179258, '50-59': 5042094, '60-69': 3737461, '70-79': 2011678, '≥80': 1311374, total: 38654206 }
]
const keys = ['<10', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '≥80']
export default {
  name: 'StackedBar',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    // 理解 stacked 数据结构的转换的例子
    this.learnStacked()

    this.init()
  },

  methods: {
    // 示例代码段
    learnStacked() {
      // 第一个例子
      var data = [
        { month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400 },
        { month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400 },
        { month: new Date(2015, 2, 1), apples: 640, bananas: 960, cherries: 640, dates: 400 },
        { month: new Date(2015, 3, 1), apples: 320, bananas: 480, cherries: 640, dates: 400 }
      ]
      var stack = d3.stack()
        .keys(['apples', 'bananas', 'cherries', 'dates'])
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone)

      var series = stack(data)
      // console.log(series)

      // 第二个例子
      var tem = [
        {
          'state': 'columnOne',
          'a': 1,
          'b': 1,
          'c': 1,
          'd': 1,
          'e': 1,
          'f': 1
        },
        {
          'state': 'columnTwo',
          'a': 1,
          'b': 1,
          'c': 1,
          'd': 1,
          'e': 1,
          'f': 1
        },
        {
          'state': 'columnThree',
          'a': 1,
          'b': 1,
          'c': 1,
          'd': 1,
          'e': 1,
          'f': 1
        },
        {
          'state': 'columnFor',
          'a': 1,
          'b': 1,
          'c': 1,
          'd': 1,
          'e': 1,
          'f': 1
        },
        {
          'state': 'columnFive',
          'a': 1,
          'b': 1,
          'c': 1,
          'd': 1,
          'e': 1,
          'f': 1
        }
      ]
      var Keys = ['d', 'e', 'f']
      var result = d3.stack().keys(Keys)(tem)
      // console.log(result)
    // 转化之后：var result = d3.stack().keys(Keys)(tem)
    // Stack 数据处理其实就是把多维的数据tem做下统计，按 Keys中的"d"拉出来一个分组,按"e"拉出来一个分组,按"f"拉出来一个分组，
    // 每个小组里边的数组的长度和tem的长度相同
    },

    init() {
      const series = d3.stack().keys(keys)(data)
      // console.log(series)

      const svg = d3.select('#stackedBar').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])

      const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([margin.left, width - margin.right])
        .padding(0.1)

      const y = d3.scaleLinear()
        .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
        .rangeRound([height - margin.bottom, margin.top]) // range的顺序问题

      const xAxis = g => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .call(g => g.selectAll('.domain').remove())

      const yAxis = g => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, 's')) // s 格式化符号
        .call(g => g.selectAll('.domain').remove())

      const color = d3.scaleOrdinal()
        .domain(series.map(d => d.key))
        .range(d3.schemeSpectral[series.length])
        .unknown('#ccc')

      const formatValue = x => isNaN(x) ? 'N/A' : x.toLocaleString('en')

      svg.append('g')
        .selectAll('g')
        .data(series)
        .join('g')
        .attr('fill', d => color(d.key))
        .selectAll('rect')
        .data(d => d)
        .join('rect')
        .attr('x', (d, i) => x(d.data.name))
        .attr('y', d => y(d[1])) // 1 ：range 值域是反的
        .attr('height', d => { return y(d[0]) - y(d[1]) })
        .attr('width', x.bandwidth())
        .append('title')
        .text(d => `${d.data.name} ${d.key}${formatValue(d.data[d.key])}`)

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
