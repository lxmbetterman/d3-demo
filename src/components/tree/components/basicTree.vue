<!--  -->
<template>
  <div style="min-width:1000px">
    <p>basicTree</p>
    <div id="BasicTree" />
  </div>
</template>

<script>
const treeData = require('./data/baiscTree.json')
// console.log(treeData)

import * as d3 from 'd3'
console.log(treeData)
const width = 1000

let root = null
export default {
  name: 'BasicTree',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    const table = [
      { 'name': 'Eve', 'parent': '' },
      { 'name': 'Cain', 'parent': 'Eve' },
      { 'name': 'Seth', 'parent': 'Eve' },
      { 'name': 'Enos', 'parent': 'Seth' },
      { 'name': 'Noam', 'parent': 'Seth' },
      { 'name': 'Abel', 'parent': 'Eve' },
      { 'name': 'Awan', 'parent': 'Eve' },
      { 'name': 'Enoch', 'parent': 'Awan' },
      { 'name': 'Azura', 'parent': 'Eve' }
    ]

    var root = d3.stratify()
      .id(function(d) { return d.name })
      .parentId(function(d) { return d.parent })(table)
    // console.log(root, 'stratify')
    this.init()
  },

  methods: {
    init() {
      function length(path) { // 计算path的长度 ！！
        return d3.create('svg:path').attr('d', path).node().getTotalLength()
      }
      const linkLine = d3.linkHorizontal()
        .x(d => {
          return d.y
        })
        .y(d => d.x)
      // const l = length(linkLine(data))

      const that = this
      const svg = d3.select(this.$el).append('svg')

      const tree = data => {
        const root = d3.hierarchy(data)
        root.dx = 20
        root.dy = width / (root.height + 1)
        return d3.tree().nodeSize([root.dx, root.dy])(root)
      }

      root = tree(treeData) //

      let x0 = Infinity
      let x1 = -x0
      root.each(d => {
        if (d.x > x1) x1 = d.x
        if (d.x < x0) x0 = d.x
      })

      svg
        .style('min-width', '1000px')
        .attr('viewBox', [0, 0, width, x1 - x0 + root.dx * 2])

      const g = svg.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('transform', `translate(${root.dy / 3},${root.dx - x0})`)

      var t = d3.transition()
        .duration(750)
        .ease(d3.easeLinear)

      const link = g.append('g')
        .attr('fill', 'none')
        .attr('stroke', '#555')
        .attr('stroke-opacity', 0.4)
        .attr('stroke-width', 1.5)
        .selectAll('path')
        .data(root.links())
        .join('path')

      link
        .attr('d', (d, i) => {
          const linkPath = linkLine(d)
          d.pathLength = length(linkPath)
          return linkPath
        })
        .attr('stroke-dasharray', d => `0,${d.pathLength}`)
        .transition(t)
        .delay(function(d, i) {
          return d.source.depth * 600
        })
        .attr('stroke-dasharray', d => `${d.pathLength},${d.pathLength}`)

      const node = g.append('g')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-width', 3)
        .selectAll('g')
        .data(root.descendants()) // root.descendants() 和 d3.stratify 相反，获取平级数据
        .join('g')
        .attr('transform', d => `translate(${d.y},${d.x})`)
        .on('click', (event, d) => {
          // console.log(d)
          that.$emit('node-click', d)
        })

      const circles = node.append('circle')

      circles.transition(t)
        .delay(function(d, i) { return i * 5 })
        .attr('fill', d => d.children ? '#555' : '#999')
        .attr('r', 5)
        .attr('cursor', 'pointer')

      circles
        .on('mousemove', (event, d) => {
          // console.log(event)
          d3.select('#menuTreeTips')
            .style('position', 'absolute')
            .style('pointer-events', 'none')
            .style('top', `${event.offsetY - 50}px`)
            .style('left', `${event.offsetX + 10}px`)
            .style('display', 'block')
            .style('pointer-events', 'none')
            .raise()
        })
        .on('mouseleave', function(d) {
          d3.select('#menuTreeTips')
            .style('display', 'none')
        })

      node.append('text')
        .attr('dy', '0.31em')
        .attr('x', d => d.children ? -6 : 6)
        .attr('text-anchor', d => d.children ? 'end' : 'start')
        .text(d => d.data.name)
        .attr('fill', d => {
          // console.log(d)
          return d.data.name.includes('co') ? null : null
        })
        .clone(true).lower()
        .attr('stroke', 'white')
    }

  }
}

</script>
<style lang='css'>
.test{
    cursor: pointer;
}
.test:hover{
    stroke:red;
    stroke-width:5;
}
</style>
