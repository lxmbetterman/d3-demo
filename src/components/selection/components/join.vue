<!--  -->
<template>
  <div>
    <div id="join" />
    <div id="join2" />
  </div>
</template>

<script>
import * as d3 from 'd3'

function randomLetters() {
  return d3.shuffle('abcdefghijklmnopqrstuvwxyz'.split(''))
    .slice(0, Math.floor(6 + Math.random() * 20))
    .sort()
}

export default {
  name: '',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    this.init()
    this.init2()
  },

  methods: {
    init() {
      const svg = d3.select('#join').append('svg')
        .attr('width', 500)
        .attr('height', 100)
        // .attr('viewBox', `-20 -20 ${500} 100`)

      setInterval(function() {
        svg.selectAll('text')
          .data(randomLetters(), d => d)
          .join(
            enter => enter.append('text')
              .attr('fill', 'green')
              .text(d => d),
            update => update
              .attr('fill', 'red')
          )
          .attr('x', (d, i) => i * 16)
          .attr('y', 20)
          .text(d => d)
      }, 2000)
    },
    init2() {
      const svg = d3.select('#join2').append('svg')
        .attr('width', 500)
        .attr('height', 100)
        // .attr('viewBox', `-20 -20 ${500} 100`)

      setInterval(function() {
        svg.selectAll('text')
          .data(randomLetters(), d => d)
          .join(
            enter => enter.append('text')
              .attr('fill', 'green')
              .attr('x', (d, i) => i * 16)
              .text(d => d)
              .call(enter => enter.transition(10000).attr('y', 20)),
            update => update
              .attr('fill', 'black')
              .attr('y', 20)
              .call(update => update.transition(10000).attr('x', (d, i) => i * 16)),
            exit => exit
              .attr('fill', 'brown')
              .call(exit => exit.transition(10000).remove())
          )
      }, 1000)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
