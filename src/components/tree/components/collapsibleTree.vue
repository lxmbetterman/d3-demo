<!--  -->
<template>
  <div>
    <p>CollapsibleTree</p>
    <div id="CollapsibleTree" />
  </div>
</template>

<script>
const treeData = require('./data/baiscTree.json')
console.log(treeData)

import * as d3 from 'd3'
const height = 500
const width = 1000
const margin = ({ top: 30, right: 0, bottom: 30, left: 40 })
const dx = 10
const dy = width / 6
export default {
  name: 'CollapsibleTree',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const root = d3.hierarchy(treeData)
      console.log(root)

      // 设置一个根节点的原位置
      root.x0 = dy / 2
      root.y0 = 0

      root.descendants().forEach((d, i) => {
        d.id = i
        d._children = d.children
        if (d.depth && d.data.name.length !== 7) d.children = null
      })
      const svg = d3.select(this.$el).append('svg')
      svg
        .attr('viewBox', [-margin.left, -margin.top, width, dx])
        .style('font', '10px sans-serif')
        .style('user-select', 'none')

      const gLink = svg.append('g') // 连线的g
        .attr('fill', 'none')
        .attr('stroke', '#555')
        .attr('stroke-opacity', 0.4)
        .attr('stroke-width', 1.5)

      const gNode = svg.append('g') // node 的 g
        .attr('cursor', 'pointer')
        .attr('pointer-events', 'all')

      const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x) // diagonal(d) 生成一个连线的path ，然后赋值给 d属性
      const tree = d3.tree().nodeSize([dx, dy]) // Compute the new tree layout.

      // .attr('d', d3.linkHorizontal().x(d => d.y).y(d => d.x)) // linkHorizontal的固定用法

      function update(source) {
        const duration = 250
        const nodes = root.descendants().reverse() // 更新后的node数据
        const links = root.links() // 更新后的links数据

        // Compute the new tree layout.
        tree(root) // 设置树节点参数而已
        // console.log(root)

        let left = root
        let right = root
        root.eachBefore(node => { // 这一步就是记录最上面left/最下面right点node
          if (node.x < left.x) left = node
          if (node.x > right.x) right = node
          // Stash the old positions for transition.
          // 记录当前位置为x0 y0
          node.x0 = node.x
          node.y0 = node.y
        })

        const height = right.x - left.x + margin.top + margin.bottom

        const transition = svg.transition() // 定义一个transtion 可以在.transtion()方法中调用
          .duration(duration)
          .attr('viewBox', [-margin.left, left.x - margin.top, width, height])

        // 这一步没发现有什么实际作用，需要掌握transtion.tween()相关的用法
        // .tween('resize', window.ResizeObserver ? null : () => () => svg.dispatch('toggle'))

        // Update the nodes…
        const node = gNode.selectAll('g')
          .data(nodes, d => d.id)

        // Enter any new nodes at the parent's previous position. 把node点首先放到旧位置
        const nodeEnter = node.enter().append('g')
          .attr('transform', d => `translate(${source.y0},${source.x0})`)
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0)
          .on('click', (event, d) => {
            d.children = d.children ? null : d._children
            update(d)
          })

        nodeEnter.append('circle')
          .attr('r', 2.5)
          .attr('fill', d => d._children ? '#555' : '#999')
          .attr('stroke-width', 10)

        nodeEnter.append('text')
          .attr('dy', '0.31em')
          .attr('x', d => d._children ? -6 : 6)
          .attr('text-anchor', d => d._children ? 'end' : 'start')
          .text(d => d.data.name)
          .clone(true).lower()
          .attr('stroke-linejoin', 'round')
          .attr('stroke-width', 3)
          .attr('stroke', 'white')

        // Transition nodes to their new position. // 把node从就位置transition到新位置
        const nodeUpdate = node.merge(nodeEnter).transition(transition)
          .attr('transform', d => `translate(${d.y},${d.x})`)
          .attr('fill-opacity', 1)
          .attr('stroke-opacity', 1)

        // Transition exiting nodes to the parent's new position.
        const nodeExit = node.exit().transition(transition).remove()
          .attr('transform', d => `translate(${source.y},${source.x})`)
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0)

        // link 是相同的操作
        // Update the links…
        const link = gLink.selectAll('path')
          .data(links, d => d.target.id)

        // Enter any new links at the parent's previous position.
        const linkEnter = link.enter().append('path')
          .attr('d', d => {
            const o = { x: source.x0, y: source.y0 }
            return diagonal({ source: o, target: o })
          })

        // Transition links to their new position.
        link.merge(linkEnter).transition(transition)
          .attr('d', diagonal)

        // Transition exiting nodes to the parent's new position.
        link.exit().transition(transition).remove()
          .attr('d', d => {
            const o = { x: source.x, y: source.y }
            return diagonal({ source: o, target: o })
          })
      }

      update(root)
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
