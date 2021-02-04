<!--  -->
<template>
  <div>
    <p>mapcolor</p>
    <div id="category" />
    <p>知识点1: 序数(离散)比例尺 d3.scaleOrdinal(range) domain()</p>
    <p>知识点2: Sequential scales 连续比例尺</p>
  </div>
</template>

<script>
import * as d3 from 'd3'

// import * as topojson from 'topojson-client'

// const width = 1000
// const height = 500
// const margin = ({ top: 30, right: 30, bottom: 30, left: 40 })
// const world = require('../assets/world')
// console.log(world, 'world 数据')
// console.log(world.objects.countries, 'world.objects.countries')
// console.log(topojson.feature(world, world.objects.countries).features, 'topojson.feature(world, world.objects.countries).features')
// console.log(topojson.neighbors(world.objects.countries.geometries), 'topojson.neighbors(world.objects.countries.geometries)')

export default {
  name: 'Mapcolor',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    this.seqScale()
  },

  methods: {
    category() {
      var color = d3.scaleOrdinal(d3.schemeCategory10)
      console.log(color)
      color.domain('A list of ten words to explore this scale’s domain'.split(/ /))
      console.log(color.domain())

      'A list of ten words to explore this scale’s domain'
        .split(/ /).map(function(item) {
          console.log(color(item))
        })

      // d3.range(10).map(function(item) {
      //   console.log(color(item))
      // })
    },
    seqScale() {
      const interpolator = t => `hello ${t}` // 所谓的interpolator 就是一个接受一个时间参数的函数
      const hello = d3.scaleSequential(interpolator) // 如果不设置range和domain
      console.log(hello(-0.1), hello(0.5), hello(1), hello(2))
      const hello200 = d3.scaleSequential(interpolator).domain([100, 200]) // 只设置domain
      console.log(hello200(50), hello200(100), hello200(150), hello200(200), hello200(250))
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
