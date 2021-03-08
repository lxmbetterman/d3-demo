<!--  -->
<template>
  <div id="spline-editor">C</div>
</template>

<script>
import * as d3 from 'd3'
const width = 1000
const height = 500
const margin = ({ top: 30, right: 0, bottom: 30, left: 40 })

const points = d3.range(1, 5).map((item, i) => {
  const arr = [i * width / 5, 50 + Math.random() * (height - 100)]
  console.log(arr)
  return arr
})

export default {
  name: 'SplineEditor',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {},

  methods: {
    init() {
      const selected = points[0]
      const svg = d3.select('#spline-editor').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
