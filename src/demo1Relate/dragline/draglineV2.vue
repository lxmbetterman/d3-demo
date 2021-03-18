<!--  -->
<template>
  <div id="draglines">dragline</div>
</template>

<script>
import * as d3 from 'd3'
const width = 1000
const height = 500
const margin = ({ top: 30, right: 0, bottom: 30, left: 40 })
const size = 60
const nodes = [
  { id: 'node1', x: 100, y: 200, r: 3 },
  { id: 'node2', x: 500, y: 300, r: 3 },
  { id: 'node3', x: 300, y: 200, r: 3 }
]
let edges = [
  { id: 'edge1', source: 'node1', target: 'node2', movePonit: null }
]

const edgeTarget = nodes[0]

export default {
  name: 'Draglines',

  components: {},
  data() {
    return {
      svg: null
    }
  },

  computed: {},

  mounted() {
    this.handleEdges()
    this.init()
  },

  methods: {
    init() {
      const that = this
      const drag = () => { // 封装drag 的写法
        function dragstarted(event, d) {
          console.log('start')
          d3.select(this).raise()
        }

        function dragged(event, d) {
          const g = d3.select(this)
          g.attr('transform', d => {
            d.x = event.x
            d.y = event.y

            // console.log(d, edgeTarget, 'edgeTarget')
            return `translate(${d.x},${d.y})`
          })
          that.updateEdges()
        }

        function dragended(event, d) {
        }

        return d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      }

      // const that = this
      const svg = d3.select('#draglines').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
      this.svg = svg

      const zoomG = svg.append('g')

      const nodeGroup = zoomG.selectAll('g')
        .data(nodes)
        .join('g')
        .attr('transform', d => {
          return `translate(${d.x},${d.y})`
        })
        .call(drag())
      nodeGroup.append('rect')
        .attr('class', 'rect')
        .attr('transform', `translate(${-size / 2},${-size / 2})`)
        .attr('width', size)
        .attr('height', size)
        .attr('stroke', 'red')
        .attr('fill', 'transparent')
        // .call(drag())

      this.drawNodeAnchor(nodeGroup)
      this.drawEdge(zoomG)
      this.applyZoom(svg, zoomG)
    },
    applyZoom(svg, applyEle) {
      function zoomed(event) {
        const { transform } = event
        applyEle.attr('transform', transform)
      }
      const zoom = d3.zoom() // d3.zoom() return a zoom that is both an object and a function
        .scaleExtent([0.8, 2])
        .on('zoom', zoomed)

      svg.call(zoom)
    },
    drawNodeAnchor(nodes) {
      const drag2 = () => { // 封装drag 的写法
        function dragstarted(event, d) {
          console.log('drag2 start')
        }

        function dragged(event, d) {
          console.log('drag2 dragging')
        }

        function dragended(event, d) {
          console.log('drag2 draggeded')
          console.log(event, 'keyup')
        }

        return d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      }
      nodes
        .append('circle')
        .attr('class', 'circle')
        // .attr('cx', d => d.x)
        // .attr('cy', d => d.y)
        .attr('r', d => {
          return 3
        })
        .attr('stroke', 'red')
        .attr('fill', 'blue')
        .call(drag2())
    },
    handleEdges() {
      edges = edges.map(edge => {
        console.log(nodes.find(node => edge.target === node.id), 'target')
        console.log(nodes.find(node => edge.source === node.id), 'source')
        return {
          ...edge,
          target: nodes.find(node => edge.target === node.id),
          source: nodes.find(node => edge.source === node.id)
        }
      })
    },
    drawEdge(zoomG) {
      const line = d3.line()
        .x(d => d)
        .y(d => d)
      const edgeGroup = zoomG.append('g')
        .selectAll('path')
        .data(edges)
        .join('path')
        .attr('d', d => {
          return `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`
        })
        .attr('stroke', 'red')
    },
    updateEdges() {
      this.svg.select('path')
        .attr('d', d => {
          return `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`
        })
    }

  }
}

</script>
<style lang='scss' scoped>
</style>
