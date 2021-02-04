<!--  -->
<template>
  <div>
    <p>Zoomable Sunburst</p>
    <el-button @click="test" />
    <div id="ZoomableSunburst" />
  </div>
</template>

<script>
// zoomableSunburst / d3.partition create a new partition (icicle or sunburst) layout.

import * as d3 from 'd3'
const width = 1000
const height = 1000
const margin = ({ top: 30, right: 0, bottom: 30, left: 40 })
const radius = width / 6

const data = require('../data/zoomableSunburst')

function partition(data) {
  const root = d3.hierarchy(data)
    .sum(d => d.value) // 设置每个节点的value 总和
    .sort((a, b) => b.value - a.value) // 排序
  return d3.partition() // 和tree 类似
    .size([2 * Math.PI, root.height + 1])(root) // height 数据层数 // 计算x0y0 / x1y1 位置数据
}
const root = partition(data)
root.each(d => { d.current = d }) // 类似于tree的each 遍历所有node
const arc = d3.arc() // arc() 只关注x0 x1 y0 y1
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .padAngle(0.005)
  .padRadius(radius * 1.5)
  .innerRadius(d => d.y0 * radius)
  .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1)) // 离散刻度尺
// 不指定domain 每次调用color('name'),都会把name 加到domain里！！！

const format = d3.format(',d')
export default {
  name: 'ZoomableSunburst',

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
    test() {
      console.log(color.domain())
    },
    init() {
      const svg = d3.select('#ZoomableSunburst').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]) // 实现显示的移动
        .attr('style', 'background-color:#ddd')

      const g = svg.append('g')
        .attr('transform', `translate(${width / 2},${width / 2})`)

      const path = g.append('g')
        .selectAll('path')
        .data(root.descendants().slice(1)) // descendants 绑定平级数据
        .join('path')
        .attr('fill', d => {
          if (d.depth >= 1) {
            return color(d.parent.data.name)
          }
        })
        .attr('fill-opacity', d => arcVisible(d.current) ? (d.children ? 0.7 : 0.3) : 0)
        .attr('d', d => arc(d.current))

      path.filter(d => d.children)
        .style('cursor', 'pointer')
        .on('click', clicked)

      path.append('title')
        .text(d => `${d.ancestors().map(d => d.data.name).reverse().join('/')}\n${format(d.value)}`)

      const label = g.append('g')
        .attr('pointer-events', 'none')
        .attr('text-anchor', 'middle')
        .style('user-select', 'none')
        .selectAll('text')
        .data(root.descendants().slice(1))
        .join('text')
        .attr('dy', '0.35em')
        .attr('fill-opacity', d => +labelVisible(d.current))
        .attr('transform', d => labelTransform(d.current))
        .text(d => d.data.name + '' + d.height)

      const parent = g.append('circle')
        .datum(root)
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('click', clicked) // 记住：绑定事件 listener的参数一始终是event 参数二参数参入的d

      function arcVisible(d) { // 控制可见扇叶的层数
        // 解释： 对于同级 每个node下的height表示children含有多少层。depth表示离顶节点的层数差
        // 而y0 y1 和height是相反的，最顶层的y0===0；y1===1
        return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0
      }

      function labelVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03
      }
      function labelTransform(d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI
        const y = (d.y0 + d.y1) / 2 * radius
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})` // 文字transform 的顺序？
      }

      function clicked(event, p) { // p===currentNode：点击的当前节点的parent作为新数据源
        parent.datum(p.parent || root) // 设置圆心的数据源

        // p 点击的扇叶
        root.each(d => { // 核心算法 d是全体数据，我们只是在操作current/target
          d.target = { // 去掉上层数据，并把扇扩展到2PI  设置d.target (d和p 是内外层的关系)
            x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI, // ??
            x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI, // ??
            y0: Math.max(0, d.y0 - p.depth), // ??
            y1: Math.max(0, d.y1 - p.depth) // ?？
          }
        })

        console.log(root, '!!!!!!!')

        const t = g.transition().duration(7500)

        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        path.transition(t)
          .tween('data', d => { // tween('props',d=>{// 给元素从新绑定值}) props可以随意制定 主要是为了设置 d.current = i(t)  这一步
            const i = d3.interpolate(d.current, d.target)
            return t => { d.current = i(t) } // 设置d.current!!!
          })
          .filter(function(d) { // filter 怎么用？？？？
            return +this.getAttribute('fill-opacity') || arcVisible(d.target) // 过滤掉可见的数据提高性能？？
          })
          .attr('fill-opacity', d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
          .attrTween('d', d => () => arc(d.current)) // 记住.attrTween('d'）的用法

        label.filter(function(d) { // 数据变了，那么就可以调用seletion的transition了
          return +this.getAttribute('fill-opacity') || labelVisible(d.target)
        }).transition(t)
          .attr('fill-opacity', d => +labelVisible(d.target))
          .attrTween('transform', d => () => labelTransform(d.current))
      }
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
