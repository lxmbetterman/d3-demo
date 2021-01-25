1[SVG 教程 w3c]: https://www.w3school.com.cn/svg/index.asp
2[SVG教程]: https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial

- 什么是SVG？
  SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
  SVG 用来定义用于网络的基于矢量的图形
  SVG 使用 XML 格式定义图形
  SVG 图像在放大或改变尺寸的情况下其图形质量不会有所损失
  SVG 是万维网联盟的标准
  SVG 与诸如 DOM 和 XSL 之类的 W3C 标准是一个整体

- 与其他图像格式相比，使用 SVG 的优势在于：

  SVG 可被非常多的工具读取和修改（比如记事本）
  SVG 与 JPEG 和 GIF 图像比起来，尺寸更小，且可压缩性更强。
  SVG 是可伸缩的
  SVG 图像可在任何的分辨率下被高质量地打印
  SVG 可在图像质量不下降的情况下被放大
  SVG 图像中的文本是可选的，同时也是可搜索的（很适合制作地图）
  SVG 可以与 Java 技术一起运行
  SVG 是开放的标准
  SVG 文件是纯粹的 XML

  

  ## SVG 形状

  SVG 有一些预定义的形状元素，可被开发者使用和操作：

  矩形 <rect>

  圆形 <circle>

  椭圆 <ellipse>

  线 <line>

  折线 <polyline>

  多边形 <polygon>

  路径 <path>

  

  1. 矩形 <rect>

     ```html
     <svg width="100%" height="100" version="1.1" xmlns="http://www.w3.org/2000/svg">
       <rect width="300" height="100"  x="20" y="20" style="fill:rgb(0,0,255);stroke-width:1; stroke:rgb(0,0,0)"/>
     </svg>
     ```

     - rect 元素的 width 和 height 属性可定义矩形的高度和宽度
     - style 属性用来定义 CSS 属性
     - CSS 的 fill 属性定义矩形的填充颜色（rgb 值、颜色名或者十六进制值）
     - CSS 的 stroke-width 属性定义矩形边框的宽度
     - CSS 的 stroke 属性定义矩形边框的颜色
     - x 属性定义矩形的左侧位置（例如，x="0" 定义矩形到浏览器窗口左侧的距离是 0px）
     - y 属性定义矩形的顶端位置（例如，y="0" 定义矩形到浏览器窗口顶端的距离是 0px）
     - CSS 的 fill-opacity 属性定义填充颜色透明度（合法的范围是：0 - 1）
     - CSS 的 stroke-opacity 属性定义笔触颜色的透明度（合法的范围是：0 - 1）
     - rx 和 ry 属性可使矩形产生圆角。
       

  2. 圆形 <circle>

     ```xml
     <svg width="100%" height="100" version="1.1" xmlns="http://www.w3.org/2000/svg">
       <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red"/>
     </svg>
     ```

     - cx 和 cy 属性定义圆点的 x 和 y 坐标。如果省略 cx 和 cy，圆的中心会被设置为 (0, 0)

     - r 属性定义圆的半径。

  3. 椭圆 <ellipse>

     ```xml
     <svg width="100%" height="300" version="1.1" xmlns="http://www.w3.org/2000/svg">
       <ellipse cx="300" cy="100" rx="200" ry="80" style="fill:rgb(200,100,50); stroke:rgb(0,0,100);stroke-width:2"/>
     </svg>
     ```

     - cx 属性定义圆点的 x 坐标
     - cy 属性定义圆点的 y 坐标
     - rx 属性定义水平半径
     - ry 属性定义垂直半径
     - 元素靠后层级靠上
       

  4. 线 <line>

     ```xml
     <svg width="100%" height="300" version="1.1" xmlns="http://www.w3.org/2000/svg">
     	<line x1="0" y1="0" x2="300" y2="300" style="stroke:rgb(99,99,99);stroke-width:2"/>
     </svg>
     ```

     - x1 属性在 x 轴定义线条的开始
     - y1 属性在 y 轴定义线条的开始
     - x2 属性在 x 轴定义线条的结束
     - y2 属性在 y 轴定义线条的结束
       

  5. 折线polyline

     ```xml
     <svg width="100%" height="100" version="1.1" xmlns="http://www.w3.org/2000/svg">
       <polyline points="0,0 0,20 20,20 20,40 40,40 40,60" style="fill:white;stroke:red;stroke-width:2"/>
       <polyline points="0,0 0,20 20,20 20,0 0,0" fill='blue' style="stroke:red;stroke-width:10"/>
     </svg>
     ```

     

  6. 多边形<polygon>

     ```xml
     <svg width="100%" height="300" version="1.1" xmlns="http://www.w3.org/2000/svg">
     	<polygon points="220,100 300,210 170,250" style="fill:#cccccc; stroke:#000000;stroke-width:1"/>
     </svg>
     ```

     - points 属性定义多边形每个角的 x,y 坐标. 空格分割为一组

  7. 路径 <path>

     ```xml
     <svg width="100%" height="400" version="1.1" xmlns="http://www.w3.org/2000/svg">
       <path d="M153 334
       C153 334 151 334 151 334
       C151 339 153 344 156 344
       C164 344 171 339 171 334
       C171 322 164 314 156 314
       C142 314 131 322 131 334
       C131 350 142 364 156 364
       C175 364 191 350 191 334
       C191 311 175 294 156 294
       C131 294 111 311 111 334
       C111 361 131 384 156 384
       C186 384 211 361 211 334
       C211 300 186 274 156 274"
       style="fill:white;stroke:red;stroke-width:2"/>
     </svg>
     ```

     路径类型解析 ：https://www.jianshu.com/p/c819ae16d29b

     Path 的d属性定义路径

     有以下类型：

     - M = moveto
     - L = lineto
     - H = horizontal lineto
     - V = vertical lineto
     - C = curveto
     - S = smooth curveto
     - Q = quadratic Belzier curve
     - T = smooth quadratic Belzier curveto
     - A = elliptical Arc
     - Z = closepath

  8. 

  ## svg滤镜

  - 

  ## svg渐变

  - 

  ## 实例练习：https://www.w3school.com.cn/svg/svg_examples.asp

  

  ## 参考svg元素：https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element

  1. <a>

  2. <animate>
     

  3. Svg: 如果svg不是根元素，`svg` 元素可以用于在当前文档（比如说，一个HTML文档）内嵌套一个独立的svg片段 。 这个独立片段拥有独立的视口和坐标系统.
     

  4. 1

  5. a

  6. a

  7. a

  8. a

  9. SVG 复用（defs、symbol、use）：https://blog.csdn.net/chy555chy/article/details/53364561

     Defs 设置样式

     ```scss
     <defs><style>circle.highlighted { stroke: orangered; fill: orangered; }</style></defs>
     ```

     

  10. SVG进阶|SVG过滤器（SVG Filters） http://www.weikejianghu.com/web_design/html5/201812/247764.html

  11. 1

  