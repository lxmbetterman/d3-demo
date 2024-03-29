<template>
  <div id="sticky-force-curve-layout">
    <p>曲线link的force</p>
  </div>
</template>

<script>
import * as d3 from 'd3'
const width = 600
const height = 600
const margin = ({ top: 30, right: 0, bottom: 30, left: 40 })
const data = {
  'nodes': [{ 'id': 'Microsoft' }, { 'id': 'Amazon' }, { 'id': 'HTC' }, { 'id': 'Samsung' }, { 'id': 'Apple' }, { 'id': 'Motorola' }, { 'id': 'Nokia' }, { 'id': 'Kodak' }, { 'id': 'Barnes & Noble' }, { 'id': 'Foxconn' }, { 'id': 'Oracle' }, { 'id': 'Google' }, { 'id': 'Inventec' }, { 'id': 'LG' }, { 'id': 'RIM' }, { 'id': 'Sony' }, { 'id': 'Qualcomm' }, { 'id': 'Huawei' }, { 'id': 'ZTE' }, { 'id': 'Ericsson' }],
  'links': [{ 'source': 'Microsoft', 'target': 'Amazon', 'type': 'licensing' }, { 'source': 'Microsoft', 'target': 'HTC', 'type': 'licensing' },
    { 'source': 'Samsung', 'target': 'Apple', 'type': 'suit' }, { 'source': 'Motorola', 'target': 'Apple', 'type': 'suit' }, { 'source': 'Nokia', 'target': 'Apple', 'type': 'resolved' }, { 'source': 'HTC', 'target': 'Apple', 'type': 'suit' }, { 'source': 'Kodak', 'target': 'Apple', 'type': 'suit' },
    { 'source': 'Microsoft', 'target': 'Barnes & Noble', 'type': 'suit' }, { 'source': 'Microsoft', 'target': 'Foxconn', 'type': 'suit' }, { 'source': 'Oracle', 'target': 'Google', 'type': 'suit' }, { 'source': 'Apple', 'target': 'HTC', 'type': 'suit' }, { 'source': 'Microsoft', 'target': 'Inventec', 'type': 'suit' }, { 'source': 'Samsung', 'target': 'Kodak', 'type': 'resolved' }, { 'source': 'LG', 'target': 'Kodak', 'type': 'resolved' },
    { 'source': 'RIM', 'target': 'Kodak', 'type': 'suit' }, { 'source': 'Sony', 'target': 'LG', 'type': 'suit' }, { 'source': 'Kodak', 'target': 'LG', 'type': 'resolved' }, { 'source': 'Apple', 'target': 'Nokia', 'type': 'resolved' }, { 'source': 'Qualcomm', 'target': 'Nokia', 'type': 'resolved' }, { 'source': 'Apple', 'target': 'Motorola', 'type': 'suit' }, { 'source': 'Microsoft', 'target': 'Motorola', 'type': 'suit' },
    { 'source': 'Motorola', 'target': 'Microsoft', 'type': 'suit' }, { 'source': 'Huawei', 'target': 'ZTE', 'type': 'suit' }, { 'source': 'Ericsson', 'target': 'ZTE', 'type': 'suit' }, { 'source': 'Kodak', 'target': 'Samsung', 'type': 'resolved' }, { 'source': 'Apple', 'target': 'Samsung', 'type': 'suit' }, { 'source': 'Kodak', 'target': 'RIM', 'type': 'suit' }, { 'source': 'Nokia', 'target': 'Qualcomm', 'type': 'suit' }
  ] }

const drag = simulation => { // 封装drag 的写法
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function dragged(event, d) {
    d.fx = event.x
    d.fy = event.y
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }

  return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended)
}

export default {
  name: 'StickyForceCurveLayout',

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
    init() {
      const svg = d3.select('#sticky-force-curve-layout').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .style('font', '12px sans-serif')

      const links = data.links.map(d => Object.create(d))
      const nodes = data.nodes.map(d => Object.create(d))

      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id))
        .force('charge', d3.forceManyBody().strength(-800))
        .force('x', d3.forceX())
        .force('y', d3.forceY())

      // Per-type markers, as they don't inherit styles.
      const types = Array.from(new Set(links.map(d => d.type)))
      const color = d3.scaleOrdinal(types, d3.schemeCategory10)

      svg.append('defs').selectAll('marker')
        .data(types)
        .join('marker')
        .attr('id', d => `arrow-${d}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 14)
        .attr('refY', -0.5)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('fill', color)
        .attr('d', 'M0,-5L10,0L0,5')

      const link = svg.append('g')
        .attr('fill', 'none')
        .attr('stroke-width', 1.5)
        .selectAll('path')
        .data(links)
        .join('path')
        .attr('stroke', d => color(d.type))
        .attr('marker-end', d => {
          return `url(#arrow-${d.type}`
        })

      const node = svg.append('g')
        .attr('fill', 'currentColor')
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round')
        .selectAll('g')
        .data(nodes)
        .join('g')
        .call(drag(simulation))

      node.append('circle')
        .attr('stroke', 'white')
        .attr('stroke-width', 1.5)
        .attr('r', 4)

      node.append('text')
        .attr('x', 8)
        .attr('y', '0.31em')
        .text(d => d.id)
        .clone(true).lower()
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-width', 3)

      function linkArc(d) {
        const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y)

        // console.log(d3.path.quadraticCurveTo(cpx, cpy, x, y))
        return `
        M${d.source.x},${d.source.y}
        ${d.target.x},${d.target.y}
        `
      }

      simulation.on('tick', () => {
        link.attr('d', linkArc)
          .attr('transform', d => {
            // console.log(d)
            return d.target.x - d.source.x > 0 ? 'translate(1, 1)' : 'translate(-1, -1)'
          })
        node.attr('transform', d => `translate(${d.x},${d.y})`)
      })
    }

  }
}

</script>
<style>

</style>
