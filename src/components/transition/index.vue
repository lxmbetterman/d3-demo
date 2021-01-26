<!--  -->
<template>
  <div id="transiton">
    <p>transition 的用法</p>
    <div id="test1" />
    <div id="test2" />
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: '',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    // d3.selectAll('#transiton')

    //   .transition() // First fade to green.
    //   .duration(5000)
    //   .style('background-color', 'green')
    //   .attr('stroke', 'black')
    //   .style('background-color', 'red')
    //   .transition() // Wait one second. Then brown, and remove.
    //   .delay(1000)
    //   .style('background-color', 'blue')
    //   .remove()

    // this.test2()

    this.test1()
  },

  methods: {
    test1() { // 结论： transition 后面所有可transition的属性同时生效
      const svg = d3.select('#test1').append('svg')
        .attr('width', 500)
        .attr('height', 500)

      const circles = svg.append('circle')

        .attr('r', 100)
        .attr('cx', 200)
        .attr('cy', 200)
        .transition()
        .duration(2000)
        // .style('fill', 'red') // 从黑色过渡到red
        .attrTween('fill', function() {
          return d3.interpolateRgb('red', 'blue') // 按照颜色插入器进行颜色过渡
        })

      svg.append('text')
        .attr('fill', 'black')
        .attr('x', 200)
        .attr('y', 200)
        .attr('text-anchor', 'middle')
        .transition()
        .duration(2000)
        .textTween(function(d, i) {
          // console.log(d, i)
          return d3.interpolateRound(0, 100)
        })
    },
    test2() { // https://bl.ocks.org/mbostock/70d5541b547cc222aa02
      const svg = d3.select('#test2').append('svg')
        .attr('width', 500)
        .attr('height', 500)
      var n = 4002

      var whiteblue = d3.interpolateRgb('#eee', 'steelblue')
      var blueorange = d3.interpolateRgb('steelblue', 'orange')
      var orangewhite = d3.interpolateRgb('orange', '#eee')

      d3.select('#test2').selectAll('div')
        .data(d3.range(n))
        .enter().append('div')
        .transition()
        .delay(function(d, i) { return i + Math.random() * n / 4 })
        .ease(d3.easeLinear)
        .on('start', function repeat() {
          d3.active(this)
            .styleTween('background-color', function() { return whiteblue })
            .transition()
            .delay(1000)
            .styleTween('background-color', function() { return blueorange })
            .transition()
            .delay(1000)
            .styleTween('background-color', function() { return orangewhite })
            .transition()
            .delay(n)
            .on('start', repeat)
        })
    }
  }
}

</script>
<style lang='css'>
#transiton #test2{
  max-width: 960px;
  margin: 1px;
}
#test2 div {
  width: 10px;
  height: 10px;
  margin: 1px 0 0 1px;
  background: #eee;
  display: inline-block;
}
</style>
