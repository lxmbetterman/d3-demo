<!--  -->
<template>
  <div id="SpikeMap" />
</template>

<script>
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
const data = require('../../../assets/chinageoTopo.json')
console.log(data, 'datatat')
const provinces = topojson.feature(data, 'chinageo').features

// new Map 的用法new Map([[key,value],[key,value]])
// const features = new Map(topojson.feature(data, data.objects.chinageo).features.map(d => [d.id, d]))
console.log(provinces) // .map(d => [d.id, d])

const width = 1000
const height = 600
const margin = ({ top: 30, right: 30, bottom: 30, left: 40 })
export default {
  name: 'SpikeMap',

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
      const svg = d3.select('#SpikeMap').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]) // 实现显示的移动
        .style('background-color', '#dedede')
        .style('border', '3px solid red')

      // 创建geopath函数，用于绘制地图path
      const projection = d3.geoMercator() // 设置一个project
        .center([105, 40]) // 经纬度
        .scale(height)

      console.log(projection([105, 40]), '1111') // 用于经纬度转 x,y
      const path = d3.geoPath().projection(projection)
      const groups = svg
        .selectAll()
        .data(provinces)
        .enter()
        .append('g')
        .attr('fill', '#333')
      const paths = groups
        .append('path')
        .attr('d', path)

      const centerPositons = provinces.map(feature => {
        return path.centroid(feature)
      })
      console.log(centerPositons)
      svg.append('g')
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
        .attr('r', 5)
        .append('title')
        .text((d, i) => `${i}`)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
