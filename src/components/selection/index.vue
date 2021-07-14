<!--  -->
<template>
  <div>
    selection 相关api 练习
    <div id="seletion1">
      <p>ss</p>
    </div>
    <div id="seletion2">s</div>
    <hr>
    <p>join相关的用法,一个例子搞清楚</p>
    <Join />
  </div>
</template>

<script>
import * as d3 from 'd3'
import Join from './components/join'
export default {
  name: '',

  components: { Join },
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    // d3.selectAll('p')
    //   .attr('class', 'graf')
    //   .style('color', 'red')
    const p = d3.selectAll('p')
    p.attr('class', 'graf')
    p.style('color', 'red')

    // this.init()
    this.init2()
  },

  methods: {
    init() {
      d3.select('#seletion1')
        .append('svg')
        .attr('width', 960)
        .attr('height', 500)
        .append('g')
        .attr('transform', 'translate(20,20)')
        .append('rect')
        .attr('width', 920)
        .attr('height', 460)
    },

    init2() {
      const matrix = [
        [11975, 5871, 8916, 2868],
        [1951, 10048, 2060, 6171],
        [8010, 16145, 8090, 8045],
        [1013, 990, 940, 6907]
      ]

      d3.select('#seletion2')
        .append('table')
        .selectAll('tr') // 此处注意和使用append的区别
        .data(matrix)
        .join('tr')
        .selectAll('td')
        .data(d => d)
        .join('td')
        .text(d => d)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
