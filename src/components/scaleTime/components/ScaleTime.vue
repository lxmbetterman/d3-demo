<!--  -->
<template>
  <div>
    <p>ScaleTime 的理解学习</p>
    <div id="ScaleTime" />
  </div>
</template>

<script>
import * as d3 from 'd3'

const width = 1000
const height = 200
const margin = ({ top: 30, right: 30, bottom: 30, left: 40 })
export default {
  name: 'ScaleTime',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    const localtime = d3.scaleTime()
    console.log(localtime.domain()) // 默认时间
    console.log(localtime.range()) // 默认range [0, 1]
    this.init()
  },

  methods: {
    init() {
      const svg = d3.select('#ScaleTime').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]) // 实现显示的移动

      const x = d3.scaleTime().domain([Date.now(), Date.now() + 24 * 60 * 60 * 1000]).range([margin.left, width - margin.right])
      const xAxis = g => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(null).tickSizeOuter(0))

      svg.append('g')
        .call(xAxis)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
