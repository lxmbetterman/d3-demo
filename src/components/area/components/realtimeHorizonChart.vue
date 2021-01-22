<!-- 例子不好 暂时放弃 -->
<template>
  <div id="RealtimeHorizonChart" style="position:relative;" />
</template>

<script>
function walk(v) {
  return Math.max(0, Math.min(1, v + (Math.random() - 0.5) * 0.05))
}

const data = (function() { // 生产一组数据
  const n = 5; const m = 300
  const data = new Array(n)
  for (let i = 0; i < n; ++i) {
    const d = data[i] = new Float64Array(m)
    for (let j = 0, v = 0; j < m; ++j) {
      d[j] = v = walk(v)
    }
  }
  console.log((data), '@11@@')
  return data
})()
console.log(data)

// 基础数据
import * as d3 from 'd3'

const width = 1500
const height = 1000
const margin = ({ top: 80, right: 30, bottom: 60, left: 150 })
const step = 29
const overlap = 6
export default {
  name: 'RealtimeHorizonChart',

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
    repeat() {
      const period = 250; const m = data[0].length
      const tail = data.map(d => d.subarray(m - 1, m))
    },
    init() {
      const x = d3.scaleTime()
        .range([0, width])
      const y = d3.scaleLinear()
        .rangeRound([0, -overlap * step])
      const color = i => {
        // console.log(scheme, 'scheme')
        return d3['schemeGreens'][Math.max(3, overlap)][i + Math.max(0, 3 - overlap)]
      }

      // const canvas = d3.select('#RealtimeHorizonChart')
      //   .selectAll('canvas')
      //   .data(data)
      //   .enter().append('canvas')
      //   .attr('width', width)
      //   .style('position', 'absolute')
      //   .style('image-rendering', 'pixelated')
      //   .style('top', (d, i) => `${i * (step + 1) + margin.top}px`)
      //   .property('context', function() { return this.getContext('2d') })
      //   .each(horizon)

      const canvas = d3.select('#RealtimeHorizonChart')
        .selectAll('canvas')
        .data(data)
        .enter().append('canvas')
        .attr('width', width)
        .style('position', 'absolute')
        .style('image-rendering', 'pixelated')
        .style('top', (d, i) => `${i * (step + 1) + margin.top}px`)
        .property('context', function() { return this.getContext('2d') })
        .each(horizon)

      const svg = d3.select('#RealtimeHorizonChart').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]) // 实现显示的移动
        .style('position', 'relative')
        .style('font', '10px sans-serif')

      const gX = svg.append('g')

      svg.append('g')
        .selectAll('text')
        .data(data)
        .join('text')
        .attr('x', 4)
        .attr('y', (d, i) => (i + 0.5) * (step + 1) + margin.top)
        .attr('dy', '0.35em')
        .text((d, i) => i)

      const rule = svg.append('line')
        .attr('stroke', '#000')
        .attr('y1', margin.top - 6)
        .attr('y2', height - margin.bottom - 1)
        .attr('x1', 0.5)
        .attr('x2', 0.5)

      svg.on('mousemove touchmove', (event) => {
        const x = d3.pointer(event, svg.node())[0] + 0.5
        rule.attr('x1', x).attr('x2', x)
      })

      function horizon(d) {
        const { context } = this
        const { length: k } = d
        if (k < width) context.drawImage(this, k, 0, width - k, step, 0, 0, width - k, step)
        context.fillStyle = '#fff'
        context.fillRect(width - k, 0, k, step)
        for (let i = 0; i < overlap; ++i) {
          context.save()
          context.translate(width - k, (i + 1) * step)
          context.fillStyle = color(i)
          for (let j = 0; j < k; ++j) {
            context.fillRect(j, y(d[j]), 1, -y(d[j]))
          }
          context.restore()
        }
      }

      // setInterval(function() {
      //   canvas.data(data).each(horizon)
      // }, 10000)

      const xAxis = g => g
        .attr('transform', `translate(0,${margin.top})`)
        .call(d3.axisTop(x).ticks(width / 80).tickSizeOuter(0))
        .call(g => g.selectAll('.tick').filter(d => x(d) < margin.left || x(d) >= width - margin.right).remove())
        .call(g => g.select('.domain').remove())

      gX.call(xAxis)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
