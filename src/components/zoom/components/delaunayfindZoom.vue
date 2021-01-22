<!--  -->
<template>
  <div>
    <p>delaunayfindZoom 最基础的缩放学习！</p>
    <div id="DelaunayfindZoom" />
  </div>
</template>

<script>
import * as d3 from 'd3'
const width = 1000
const height = 500
const margin = ({ top: 30, right: 0, bottom: 30, left: 40 })

const random = d3.randomNormal(0, 1)
const data = Array.from({ length: 300 }, () => [random(), random()])
console.log(data, 'data')
export default {
  name: 'DelaunayfindZoom',

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
      const svg = d3.select('#DelaunayfindZoom').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .style('cursor', 'crosshair')

      const x = d3.scaleLinear([0, 1], [0, 100])
      const y = d3.scaleLinear([0, 1], [0, 100])

      // data 的point点 是坐标系下的坐标，而不是数据（需要把数据转换为坐标系数据）
      const delaunay = d3.Delaunay.from(data, d => x(d[0]), d => y(d[1])) // 运用这个算法 为了找到某个数据的index：delaunay.find(x,y)
      svg.append('defs').append('style') // 设置css 样式
        .text(`circle.highlighted { stroke: orangered; fill: orangered; }`)

      const g = svg.append('g')

      const points = g
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', d => x(d[0]))
        .attr('cy', d => y(d[1]))

      let transform

      const zoom = d3.zoom().on('zoom', e => {
        console.log(e.transform)
        g.attr('transform', (transform = e.transform)) // 给g 添加 transform 属性
        g.style('stroke-width', 3 / Math.sqrt(transform.k))
        points.attr('r', 3 / Math.sqrt(transform.k))
      })
      //   console.log(zoom, 'zooom') //zoom  是一个函数 传入selection（需要缩放的selection，这里是svg）

      svg
        .call(zoom)
        .call(zoom.transform, d3.zoomIdentity) // 相当于 zoom.transform(svg, d3.zoomIdentity)
        .on('pointermove', event => { // pointermove 相当于mousemove
          //  console.log(event)
          // 如果没有transform 则用x.revert(..)/y.revert(..) ;transform.invert 在这个基础上加上了 k缩放
          const p = transform.invert(d3.pointer(event)) // d3.pointer(event) 事件基于x y 的坐标； // 很强大
          console.log(p, 'p')
          const i = delaunay.find(...p)
          points.classed('highlighted', (_, j) => i === j) // 满足条件的添加class = highlighted
          //   d3.select(points.nodes()[i]).raise()
        })
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
