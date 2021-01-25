<!--  -->
<template>
  <div id="China">C</div>
</template>

<script>
const data = require('../geoJson/chinageo.json')
// console.log(data, '111')

import * as d3 from 'd3'
const width = 1000
const height = 600
const margin = ({ top: 30, right: 0, bottom: 30, left: 40 })

// console.log(d3.geoPath(data.features), '!!!!!')
export default {
  name: 'China',

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
      const svg = d3.select('#China').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]) // 实现显示的移动
        .attr('style', 'background-color:#ddd')
        // .attr('style', 'stroke:orange;stroke-width:5;stroke-opacity:0.5')
        .on('click', reset)

      const g = svg.append('g')

      const projection = d3.geoMercator() // 设置一个project
        .center([105, 48]) // 经纬度
        .scale(height * 0.7)

      console.log(projection([105, 40]), '1111') // 用于经纬度转 x,y

      const path = d3.geoPath()
        .projection(projection)

      // const states = g.append('g')
      //   .attr('fill', '#444')
      //   .attr('cursor', 'pointer')
      //   .selectAll('path')
      //   .data(topojson.feature(us, us.objects.states).features)
      //   .join('path')
      //   .on('click', clicked)
      //   .attr('d', path)
      const privince = g.append('g')
        .attr('fill', '#444')
        .attr('cursor', 'pointer')
        .selectAll('path')
        .data(data.features)
        .join('path')
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.2)
        .on('click', clicked)
        .attr('d', path)

      const pointersG = svg.append('g')
      const circles = pointersG
        .attr('fill', 'brown')
        .attr('fill-opacity', 0.5)
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5)
        .selectAll('circle')
        .data([projection([106.55612458203123, 29.57876823098924])])
        .join('circle')
        .attr('transform', d => {
          // console.log(d)
          return `translate(${d[0]},${d[1]})`
        })

      circles
        .attr('r', 2)
        .append('title')
        .text((d, i) => `${i}`)

      function clicked(event, d) {
        const [[x0, y0], [x1, y1]] = path.bounds(d) // 返回 path 的边界坐标 当前点击的province 的path
        console.log([x0, y0], [x1, y1])
        event.stopPropagation() // 冒泡
        privince.transition().style('fill', null) // style的fill和属性fill有两个控制fill颜色的
        d3.select(this).transition().style('fill', 'red')
        svg.transition().duration(750).call(
          zoom.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2) //
            .scale(Math.min(8, 0.2 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
          // d3.pointer(event)
        )
      }
      function reset() {
        privince.transition().style('fill', null)
        svg.transition().duration(750)
          .call(
            zoom.transform,
            d3.zoomIdentity // 参数1 固定值 k = 1, tx = ty = 0
            // d3.zoomTransform(svg.node()).invert([width / 2, height / 2]) // 参数2
          )
      }

      function zoomed(event) {
        const { transform } = event
        g.attr('transform', transform)
        g.attr('stroke-width', 1 / transform.k)
        pointersG.attr('transform', transform) // 给g 添加 transform 属性
        circles.attr('r', 2 / transform.k).attr('stroke-width', 0.5 / transform.k)
      }

      const zoom = d3.zoom()
        .scaleExtent([0.8, 8])
        .on('zoom', zoomed)

      svg.call(zoom)
    }
  }
}

</script>
<style lang='css' scoped>
#China{
  /* background-color: aqua; */
}
</style>
