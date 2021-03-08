<template>
  <div id="sticky-force-layout">
    <p>去掉link的force</p>
    <el-button @click="test">111</el-button>
    <el-button @click="test2">222</el-button>
  </div>
</template>

<script>
import * as d3 from 'd3'
const width = 1000
const height = 500
const margin = ({ top: 30, right: 0, bottom: 30, left: 40 })

const graph = ({
  nodes: [{ fx: 100, fy: 100 }, { fx: 200, fy: 200 }, { fx: 300, fy: 200 }, { fx: 300, fy: 300 }],
  links: [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
    { source: 2, target: 0 },
    { source: 1, target: 3 }

  ]
})
console.log(graph)

function clamp(x, lo, hi) {
  return x < lo ? lo : x > hi ? hi : x
}
export default {
  name: 'StickyForceLayout',

  components: {},
  data() {
    return {
      simulation: null
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    test() {
      this.simulation.stop()
    },
    test2() {
      this.simulation.restart()
    },
    init() {
      const svg = d3.select('#sticky-force-layout').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])

      const link = svg
        .selectAll('.link')
        .data(graph.links)
        .join('line')
        .classed('link', true)
      const node = svg
        .selectAll('.node')
        .data(graph.nodes)
        .join('circle')
        .attr('r', 12)
        .classed('node', true)
        .classed('fixed', d => d.fx !== undefined)
      console.log(node)

      const simulation = d3
        .forceSimulation()
        .nodes(graph.nodes)
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('link', d3.forceLink(graph.links))
        .on('tick', tick)
      this.simulation = simulation

      const drag = d3
        .drag()
        .on('start', dragstart)
        .on('drag', dragged)

      node.call(drag).on('click', click)

      function tick() {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y)
        node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
      }

      function click(event, d) {
        // delete d.fx
        // delete d.fy
        d3.select(this).classed('fixed', false)
        simulation.alpha(1).restart()
      }

      function dragstart() {
        d3.select(this).classed('fixed', true)
      }

      function dragged(event, d) {
        d.fx = clamp(event.x, 0, width)
        d.fy = clamp(event.y, 0, height)
        simulation.alpha(1).restart()
      }
    }
  }
}

</script>
<style>
#sticky-force-layout .link {
  stroke: #000;
  stroke-width: 1.5px;
}

#sticky-force-layout .node {
  cursor: move;
  fill: #ccc;
  stroke: #000;
  stroke-width: 1.5px;
}

#sticky-force-layout .node.fixed {
  fill: #f00;
}
</style>
