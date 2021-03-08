<!--  /* 相关API
d3.forceSimulation - 创建一个力模拟。
simulation.restart - 重启力模拟。
simulation.stop - 停止力模拟。
simulation.tick - 将力模拟向前推进一步。
simulation.nodes - 设置力模拟的节点。
simulation.alpha - 设置当前的α值。
simulation.alphaMin -设置α最小阈值。
simulation.alphaDecay - 设置α指数衰减率。
simulation.alphaTarget - 设置目标α。
simulation.drag - 设置曳引系数。
simulation.force - 添加或移除力。
simulation.fix - 固定节点位置。
simulation.unfix - 释放固定的节点。
simulation.find - 查找给定位置最近的节点。
simulation.on - 添加或移除事件监听器。
force - 应用力模拟。
force.initialize - 使用给定的节点初始化力布局。
d3.forceCenter - 创建一个力中心。
center.x - 设置中心的x-坐标。
center.y - 设置中心的y-坐标。
d3.forceCollide - 创建一个圆碰撞力。
collide.radius - 设置圆的半径。
collide.strength - 设置碰撞检测强度。
collide.iterations - 设置迭代次数。
d3.forceLink - 创建连接力。
link.links - 设置连接数组。
link.id - 连接数组。
link.distance - 设置连接距离。
link.strength - 设置连接强度。
link.iterations - 设置迭代次数。
d3.forceManyBody - 创建多体力。
manyBody.strength - 设置力强度。
manyBody.theta - 设置Barnes-Hut近似精度。
manyBody.distanceMin - 当节点关闭限制力。
manyBody.distanceMax - 当节点太远限制力。
d3.forceX - 创建x-定位力。
x.strength - 设置力强度。
x.x - 设置目标x-坐标。
d3.forceY - 创建y-定位力。
y.strength - 设置力强度。
y.y - 设置目标y-坐标。
*/

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

 -->
<template>
  <div id="sticky-force-layout">
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
  nodes: Array.from({ length: 13 }, () => ({})),
  links: [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
    { source: 2, target: 0 },
    { source: 1, target: 3 },
    { source: 3, target: 2 },
    { source: 3, target: 4 },
    { source: 4, target: 5 },
    { source: 5, target: 6 },
    { source: 5, target: 7 },
    { source: 6, target: 7 },
    { source: 6, target: 8 },
    { source: 7, target: 8 },
    { source: 9, target: 4 },
    { source: 9, target: 11 },
    { source: 9, target: 10 },
    { source: 10, target: 11 },
    { source: 11, target: 12 },
    { source: 12, target: 10 }
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
        delete d.fx
        delete d.fy
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
