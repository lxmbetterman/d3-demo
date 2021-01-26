<!--  -->
<template>
  <div>
    <div class="apple" style="width:100px;height:100px" />
    <p>stackedToGroupedBars</p>
    <div id="StackedToGroupedBars" />
  </div>
</template>

<script>

const xz = require('../data/xz') // x轴值  1-57
const yz = require('../data/yz') // y轴值  1-57 对应的值
const y01z = require('../data/y01z') // stack值
const n = 5
const m = 28
console.log(xz, 'xz')
console.log(yz, 'yz')
console.log(y01z, 'y01z')

import * as d3 from 'd3'
const width = 1000
const height = 500
const margin = ({ top: 30, right: 0, bottom: 30, left: 40 })

export default {
  name: 'StackedToGroupedBars',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    this.init()

    var t = d3.transition()
      .duration(750)
      .ease(d3.easeLinear)

    d3.selectAll('.apple').transition(1000)
      .style('fill', 'red')

    d3.selectAll('.orange').transition(t)
      .style('fill', 'orange')
  },

  methods: {
    init() {
      const svg = d3.select('#StackedToGroupedBars').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]) // 实现显示的移动

      const yMax = d3.max(yz, y => d3.max(y))
      const y1Max = d3.max(y01z, y => d3.max(y, d => d[1]))
      const x = d3.scaleBand() // x轴
        .domain(xz)
        .rangeRound([margin.left, width - margin.right])
        .padding(0.08)

      const y = d3.scaleLinear()
        .domain([0, y1Max])
        .range([height - margin.bottom, margin.top])
      //   console.log(d3.interpolateBlues)
      const z = d3.scaleSequential(d3.interpolateBlues) // 一个基于 interpolateBlues 连续颜色sacle
        .domain([-0.5 * n, 1.5 * n])

      const xAxis = svg => svg.append('g') //
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(() => ''))

      const rect = svg.selectAll('g')
        .data(y01z)
        .join('g')
        .attr('fill', (d, i) => z(i))
        .selectAll('rect')
        .data(d => {
          console.log(d)
          return d
        }) // 五个组的数据
        .join('rect')
        .attr('x', (d, i) => {
          console.log(d)
          return x(i)
        })
        .attr('y', margin.bottom)
        .attr('width', x.bandwidth())
        .attr('height', 1)

      svg.append('g')
        .call(xAxis)

      function transitionGrouped() { // 逻辑和数据结构有关，关注transition的用法
        y.domain([0, yMax])
        rect.transition() // 这里有5个rect
          .duration(500)
          .delay((d, i) => i * 20)
          .attr('x', (d, i) => x(i) + x.bandwidth() / n * d[2])
          .attr('width', x.bandwidth() / n)
          .transition()
          .attr('y', d => y(d[1] - d[0]))
          .attr('height', d => y(0) - y(d[1] - d[0]))
      }

      function transitionStacked() {
        y.domain([0, y1Max])

        rect.transition()
          .duration(200)
          .delay((d, i) => i * 20)
          .attr('y', d => y(d[1]))
          .attr('height', d => y(d[0]) - y(d[1]))
          .transition() // transition只控制紧跟着的属性!!（错，都控制）
          .attr('x', (d, i) => x(i))
          .attr('width', x.bandwidth())
      }

      transitionGrouped()
      setTimeout(function() {
        transitionStacked()
      }, 4000)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
