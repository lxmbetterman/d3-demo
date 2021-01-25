<!--  -->
<template>
  <div id="MultiLine" />
</template>

<script>
import * as d3 from 'd3'
const data = require('../data/multiLine')
// const data = require('../data/lineChart2') // missing data
console.log(data)
data.dates = data.dates.map(date => new Date(date)) // 对于时间数据，提前处理成时间对象，这样有助于提高时间轴相关的性能

const width = 1000
const height = 500
const margin = ({ top: 80, right: 30, bottom: 60, left: 30 })
export default {
  name: 'MultiLine',

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
      const svg = d3.select('#MultiLine').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]) // 实现显示的移动
        .attr('fill', 'rgba(0, 0, 0, 0.1)')

      const x = d3.scaleUtc()
        .domain(d3.extent(data.dates))
        .range([margin.left, width - margin.right])

      const y = d3.scaleLinear()
        .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
        .range([height - margin.bottom, margin.top])

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

      const line = d3.line()
        .defined(d => !isNaN(d))
        .x((d, i) => x(data.dates[i]))
        .y(d => y(d))

      svg.append('g')
        .call(xAxis)

      svg.append('g')
        .call(yAxis)

      const path = svg.append('g')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .selectAll('path')
        .data(data.series)
        .join('path') // path 是一个selection 个数和data.length相关
        .style('mix-blend-mode', 'multiply')
        .attr('d', d => line(d.values))

      // hover 相关操作
      function hover(svg, path) {
        if ('ontouchstart' in document) {
          svg
            .style('-webkit-tap-highlight-color', 'transparent')
            .on('touchmove', moved)
            .on('touchstart', entered)
            .on('touchend', left)
        } else {
          svg // svg 绑定mousemove / mouseenter /mouseleave 等事件的处理
            .on('mousemove', moved)
            .on('mouseenter', entered)
            .on('mouseleave', left)
        }

        const dot = svg.append('g')
          .attr('display', 'none')

        dot.append('circle')
          .attr('r', 2.5)

        dot.append('text')
          .attr('font-family', 'sans-serif')
          .attr('font-size', 10)
          .attr('text-anchor', 'middle')
          .attr('y', -8)

        function moved(event) {
        //   console.log(event)
          event.preventDefault() // 禁止默认的moved操作
          const pointer = d3.pointer(event)
          //   console.log(pointer)
          const xdomain = x.invert(pointer[0]) // invert 转换range值 对应的 domain值
          // 证明pointer的值代表的不是mouse事件的x y 值，而是 domain值
          const ydomain = y.invert(pointer[1])
          //   console.log(xdomain) // 是个时间对象
          const i = d3.bisectCenter(data.dates, xdomain) // Returns the index of the closest value to xdomain in the given sorted array
          // d3.least 根据指定的比较器或访问器返回指定可迭代对象中最小的元素
          const s = d3.least(data.series, d => Math.abs(d.values[i] - ydomain))

          // path 是一个selection 每一个path绑定了对应的一个data
          path.attr('stroke', d => d === s ? null : '#ddd').filter(d => d === s).raise() // 理解这段代码的含义
          dot.attr('transform', `translate(${x(data.dates[i])},${y(s.values[i])})`)
          dot.select('text').text(s.name)
        }
        function entered() {
          path.style('mix-blend-mode', null).attr('stroke', '#ddd')
          dot.attr('display', null)
        }
        function left() {
          path.style('mix-blend-mode', 'multiply').attr('stroke', null)
          dot.attr('display', 'none')
        }
      }

      svg.call(hover, path)
    }

  }
}

</script>
<style lang='scss' scoped>
</style>
