<!--  -->
<template>
  <div id="GroupedBar" />
</template>

<script>
import * as d3 from 'd3'
const width = 1000
const height = 500
const margin = ({ top: 30, right: 0, bottom: 30, left: 40 })

const data = [
  { 'State': 'CA', 'Under 5 Years': 2704659, '5 to 13 Years': 4499890, '14 to 17 Years': 2159981, '18 to 24 Years': 3853788, '25 to 44 Years': 10604510, '45 to 64 Years': 8819342, '65 Years and Over': 4114496 },
  { 'State': 'TX', 'Under 5 Years': 2027307, '5 to 13 Years': 3277946, '14 to 17 Years': 1420518, '18 to 24 Years': 2454721, '25 to 44 Years': 7017731, '45 to 64 Years': 5656528, '65 Years and Over': 2472223 },
  { 'State': 'NY', 'Under 5 Years': 1208495, '5 to 13 Years': 2141490, '14 to 17 Years': 1058031, '18 to 24 Years': 1999120, '25 to 44 Years': 5355235, '45 to 64 Years': 5120254, '65 Years and Over': 2607672 },
  { 'State': 'FL', 'Under 5 Years': 1140516, '5 to 13 Years': 1938695, '14 to 17 Years': 925060, '18 to 24 Years': 1607297, '25 to 44 Years': 4782119, '45 to 64 Years': 4746856, '65 Years and Over': 3187797 },
  { 'State': 'IL', 'Under 5 Years': 894368, '5 to 13 Years': 1558919, '14 to 17 Years': 725973, '18 to 24 Years': 1311479, '25 to 44 Years': 3596343, '45 to 64 Years': 3239173, '65 Years and Over': 1575308 },
  { 'State': 'PA', 'Under 5 Years': 737462, '5 to 13 Years': 1345341, '14 to 17 Years': 679201, '18 to 24 Years': 1203944, '25 to 44 Years': 3157759, '45 to 64 Years': 3414001, '65 Years and Over': 1910571 }
]

const keys = ['Under 5 Years', '5 to 13 Years', '14 to 17 Years', '18 to 24 Years', '25 to 44 Years', '45 to 64 Years', '65 Years and Over']
export default {
  name: 'GroupedBar',
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
      const svg = d3.select('#GroupedBar').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])

      const x0 = d3.scaleBand()
        .domain(data.map(d => d['State'])) // 默认 state的值为刻度文字
        .rangeRound([margin.left, width - margin.right])
        .paddingInner(0.1)

      const x1 = d3.scaleBand()
        .domain(keys)
        .rangeRound([0, x0.bandwidth()])
        .padding(0.05)

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d3.max(keys, key => d[key]))]).nice() // max(值，比较规则) 寻找data中最大的值
        .rangeRound([height - margin.bottom, margin.top])

      const color = d3.scaleOrdinal()
        .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'])

      const xAxis = g => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x0).tickSizeOuter(0))
        .call(g => g.select('.domain').remove())

      const yAxis = g => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, 's'))
        .call(g => g.select('.domain').remove())
        .call(g => g.select('.tick:last-of-type text').clone()
          .attr('x', 3)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .text(data.y))

      svg.append('g')
        .call(xAxis)

      svg.append('g')
        .call(yAxis)

      svg.append('g')
        .selectAll('g')
        .data(data)
        .join('g')
        .attr('transform', d => `translate(${x0(d['State'])},0)`)
        .selectAll('rect')
        .data(d => keys.map(key => ({ key, value: d[key] })))
        .join('rect')
        .attr('x', d => x1(d.key))
        .attr('y', d => y(d.value))
        .attr('width', x1.bandwidth())
        .attr('height', d => y(0) - y(d.value))
        .attr('fill', d => color(d.key))
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
