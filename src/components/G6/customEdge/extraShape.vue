<!--  -->
<template>
  <div>
    <div id="extraShape">/customEdge/extraShape</div>
    <div id="menuTest">menu</div>
  </div>
</template>

<script>
import G6 from '@antv/g6'

import insertCss from 'insert-css'

// define the CSS with the id of your menu

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
  #contextMenu {
    position: absolute;
    list-style-type: none;
    padding: 10px 8px;
    left: -150px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
  }
  #contextMenu li {
    cursor: pointer;
		list-style-type:none;
    list-style: none;
    margin-left: 0px;
  }
  #contextMenu li:hover {
    color: #aaa;
  }
`)
export default {
  name: 'ExtraShape',

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
      // custom the edge with an extra rect
      G6.registerEdge(
        'extra-shape-edge',
        {
          afterDraw(cfg, group) {
            // get the first shape in the graphics group of this edge, it is the path of the edge here
            // 获取图形组中的第一个图形，在这里就是边的路径图形
            const shape = group.get('children')[0]
            // get the coordinate of the mid point on the path
            // 获取路径图形的中点坐标
            const midPoint = shape.getPoint(0.5)
            const rectColor = cfg.midPointColor || '#333'
            // add a rect on the mid point of the path. note that the origin of a rect shape is on its lefttop
            // 在中点增加一个矩形，注意矩形的原点在其左上角
            group.addShape('rect', {
              attrs: {
                width: 10,
                height: 10,
                fill: rectColor || '#333',
                // x and y should be minus width / 2 and height / 2 respectively to translate the center of the rect to the midPoint
                // x 和 y 分别减去 width / 2 与 height / 2，使矩形中心在 midPoint 上
                x: midPoint.x - 5,
                y: midPoint.y - 5
              },
              name: 'circle-shape'
            })

            // get the coordinate of the quatile on the path
            // 获取路径上的四分位点坐标
            const quatile = shape.getPoint(0.25)
            const quatileColor = cfg.quatileColor || '#333'
            // add a circle on the quatile of the path
            // 在四分位点上放置一个圆形
            group.addShape('circle', {
              attrs: {
                r: 5,
                fill: quatileColor || '#333',
                x: quatile.x,
                y: quatile.y
              }
            })
          },
          update: undefined
        },
        'cubic'
      )

      const data = {
        nodes: [
          {
            id: 'node1',
            x: 100,
            y: 100
          },
          {
            id: 'node2',
            x: 300,
            y: 100
          },
          {
            id: 'node3',
            x: 300,
            y: 200
          }
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
            midPointColor: '#f00',
            quatileColor: '#f00'
          },
          {
            source: 'node1',
            target: 'node3',
            midPointColor: '#0f0',
            quatileColor: '#0f0'
          }
        ]
      }

      const container = document.getElementById('extraShape')
      const width = container.scrollWidth
      const height = 500

      const contextMenu = new G6.Menu({
        getContent(evt) {
          let header
          if (evt.target && evt.target.isCanvas && evt.target.isCanvas()) {
            header = 'Canvas ContextMenu'
            return ''
          } else if (evt.item) {
            const itemType = evt.item.getType()
            header = `${itemType.toUpperCase()} ContextMenu`
          }
          return `
            <h3>${header}</h3>
            <ul>
            <li title='1'>li 1</li>
            <li title='2'>li 2</li>
            <li>li 3</li>
            <li>li 4</li>
            <li>li 5</li>
            </ul>`
        },
        handleMenuClick: (target, item) => {
          console.log(target, item)
        },
        // offsetX and offsetY include the padding of the parent container
        // 需要加上父级容器的 padding-left 16 与自身偏移量 10
        offsetX: 16 + 10,
        // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
        offsetY: 0,
        // the types of items that allow the menu show up
        // 在哪些类型的元素上响应
        itemTypes: ['node', 'edge']
      })

      const graph = new G6.Graph({
        container: 'extraShape',
        width,
        height,
        plugins: [contextMenu],
        // translate the graph to align the canvas's center, support by v3.5.1
        fitCenter: true,
        modes: {
          default: ['drag-node', 'drag-canvas']
        },
        defaultEdge: {
          type: 'extra-shape-edge',
          style: {
            stroke: '#F6BD16'
          }
        }
      })
      graph.data(data)
      graph.render()

      graph.on('circle-shape:click', (evt) => {
        console.log(evt)
        const { item } = evt
        item.showMenu = true
        console.log(item, '!!!')
        // graph.updateItem(item, {})
      })

      if (typeof window !== 'undefined') {
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight) return
          graph.changeSize(container.scrollWidth, container.scrollHeight)
        }
      }
    }
  }
}

</script>
<style lang='scss' scoped>
#menuTest{
    position: absolute;
}
</style>
