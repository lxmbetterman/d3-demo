<template>
  <div style="width:100%;height:100%">
    <p>rect（rectangle）</p>
    <svg
      width="100%"
      height="200"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="300"
        height="100"
        x="20"
        y="20"
        rx="20"
        ry="20"
        style="fill:rgb(0,0,255);stroke-width:1; stroke:rgb(0,0,0);fill-opacity:0.1;stroke-opacity:0.1"
      >
        <animate
          attributeName="rx"
          values="0;50;0"
          dur="10s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>

    <p>circle标签</p>
    <svg
      width="100%"
      height="100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="100"
        cy="50"
        r="40"
        stroke="black"
        stroke-width="2"
        fill="red"
      />
    </svg>

    <p>ellipse</p>
    <svg
      width="100%"
      height="300"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="300"
        cy="100"
        rx="200"
        ry="80"
        style="fill:rgb(200,100,50); stroke:rgb(0,0,100);stroke-width:2"
      />
    </svg>

    <p>line</p>
    <svg
      width="100%"
      height="300"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0"
        y1="0"
        x2="300"
        y2="300"
        style="stroke:rgb(99,99,99);stroke-width:2"
      />
    </svg>

    <p>polyline</p>
    <svg
      width="100%"
      height="100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        points="0,0 0,20 20,20 20,40 40,40 40,60"
        style="fill:white;stroke:red;stroke-width:2"
      />
      <polyline
        points="0,0 0,20 20,20 20,0 0,0"
        fill='blue'
        style="stroke:red;stroke-width:10"
      />
    </svg>

    <p>polygon</p>
    <svg
      width="100%"
      height="300"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <a href="">
        <polygon
          points="220,100 300,210 170,250"
          style="fill:#cccccc; stroke:#000000;stroke-width:1"
        />
      </a>

    </svg>

    <p>path 路径</p>
    <svg
      width="100%"
      height="400"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M153 334
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
        style="fill:white;stroke:red;stroke-width:2"
      />
    </svg>

    <p>animateMotion</p>
    <svg
      viewBox="0 0 400 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        stroke="red"
        d="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z"
      />

      <circle
        r="5"
        fill="red"
      >
        <animateMotion
          dur="200s"
          repeatCount="indefinite"
          path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z"
        />

      </circle>
    </svg>

    <p>animateTransform;type有 ：translate | scale | rotate | skewX | skewY</p>
    <p>rotate 的form ‘起始角度 x y’ 同理to</p>
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <polygon points="60,30 90,90 30,90">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 60 70"
          to="90 60 70"
          dur="10s"
          repeatCount="indefinite"
        />
      </polygon>
    </svg>

    <p>myClip 元素 定义一条剪切路径，可作为其他元素的 clip-path 属性的值。</p>
    <svg viewBox="0 0 200 100">
      <clipPath id="myClip">
        <!-- 圆圈外的所有东西都会被裁剪掉，因此不可见。-->
        <circle
          cx="40"
          cy="35"
          r="35"
        />
      </clipPath>

      <!-- 作为引用元素（英文原文：for reference）的黑色心形 -->
      <path
        id="heart"
        d="M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 Z"
      />

      <!-- 和上述黑色心形形状相同的红色心形，剪切路径是上面定义的圆； 红色心形只有在圆内的部分可见。 -->
      <use
        clip-path="url(#myClip)"
        xlink:href="#heart"
        fill="red"
      />
    </svg>

    <p>defs：SVG 允许我们定义以后需要重复使用的图形元素。 建议把所有需要再次使用的引用元素定义在defs元素里面。这样做可以增加SVG内容的易读性和可访问性。</p>
    <svg
      width="80px"
      height="30px"
      viewBox="0 0 80 30"
      xmlns="http://www.w3.org/2000/svg"
    >

      <defs>
        <linearGradient id="Gradient01">
          <stop
            offset="20%"
            stop-color="#39F"
          />
          <stop
            offset="90%"
            stop-color="#F3F"
          />
        </linearGradient>
      </defs>

      <rect
        x="10"
        y="10"
        width="60"
        height="10"
        fill="url(#Gradient01)"
      />
    </svg>

    <p>title/descs ：如果当前的SVG文档片段在视媒体中呈现，desc元素不会呈现为图形的一部分</p>
    <svg
      width="500"
      height="300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <title>SVG Title Demo example</title>
        <rect
          x="10"
          y="10"
          width="200"
          height="50"
          style="fill:none; stroke:blue; stroke-width:1px"
        />
      </g>
    </svg>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@keyframes openYourHeart {
  from {
    r: 0;
  }
  to {
    r: 60px;
  }
}

#myClip circle {
  animation: openYourHeart 15s infinite;
}
</style>
