<!--  -->
<template>
  <div>mapcolor</div>
</template>

<script>
import * as d3 from 'd3'
import * as topojson from 'topojson-client'

const width = 1000
const height = 500
const margin = ({ top: 30, right: 30, bottom: 30, left: 40 })
const world = require('../assets/world')
console.log(world, 'world 数据')
console.log(world.objects.countries, 'world.objects.countries')
console.log(topojson.feature(world, world.objects.countries).features, 'topojson.feature(world, world.objects.countries).features')
console.log(topojson.neighbors(world.objects.countries.geometries), 'topojson.neighbors(world.objects.countries.geometries)')

export default {
  name: '',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
