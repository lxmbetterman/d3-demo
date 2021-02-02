<!--  -->
<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="调色板">
        <el-select v-model="palette" placeholder="请选择颜色" @change="changePalette">
          <el-option
            v-for="item in ColorPalette"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="离散度">
        <el-slider v-model="deviation" :min="0" :max="5" :step="0.2" style="width:150px" @change="changeParam" />
      </el-form-item>
      <el-form-item label="轮廓宽度">
        <el-slider v-model="stroke" :min="0" :max="8" :step="0.1" style="width:150px" @change="changeParam" />
      </el-form-item>
      <el-form-item label="模糊度">
        <el-slider v-model="outerBlurAmount" :min="0" :max="3" :step="0.1" style="width:150px" @change="changeParam" />
      </el-form-item>
      <el-form-item label="云纹度">
        <el-slider v-model="fractalNoise" :min="0" :max="0.03" :step="0.01" style="width:150px" @change="changeParam" />
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="init">重新渲染</el-button>
      </el-form-item> -->
    </el-form>
    <div id="WaterColorChina" />
  </div>
</template>

<script>
// topojson.feature - convert TopoJSON to GeoJSON.
import * as d3 from 'd3'
import * as topojson from 'topojson-client'

const width = 1000
const height = 1000

const data = require('../data/chinageoTopo')

const provinces = topojson.feature(data, 'chinageo').features
const neighbors = topojson.neighbors(data.objects.chinageo.geometries) // 返回一个数组 数字的index表示当前省份 在provinces重的index

const palettes = ({
  'Wes Anderson': ['#ff4848', '#00cdb1', '#ffc638', '#ffa641', '#a0d8e7'],
  Blues: ['#0c96da', '#be98ad', '#77d7e3', '#f4cdcd', '#01ccd9', '#f4e2c6'],
  'rag-taj': ['#73d5c1', '#e29ba0', '#ba1e6b', '#ffbe45'],
  'rag-mysore': ['#e8ac52', '#639aa0', '#ec6c26', '#613a53'],
  iiso_zeitung: ['#f3df76', '#00a9c0', '#f7ab76', '#ee8067'],
  'present-correct': ['#fe7646', '#ffbb51', '#7356ac', '#fe737a', '#a0ccbb'],
  verena: ['#936ead', '#3e78e1', '#f37265', '#f6bc25', '#16b069'],
  iiso_daily: ['#7f8cb6', '#f0d967', '#ef9640', '#1daeb1', '#e76c4a']
})
export default {
  name: 'WaterColorChina',

  components: {},
  data() {
    return {
      deviation: 3, // shape deviation
      stroke: 1.5, // stroke width
      outerBlurAmount: 0.1, // 外部阴影
      fractalNoise: 0.01, // 分型噪音 ：是指一个粗糙或零碎的几何形状，可分为数个部分，且每一部分都（至少会大略）是整体缩小尺寸的形状。
      palette: 'Blues',
      ColorPalette: [
        'Wes Anderson',
        'Blues',
        'verena',
        'iiso_daily',
        'iiso_zeitung',
        'present-correct',
        'rag-taj',
        'rag-mysore'
      ],
      svg: null
    }
  },

  computed: {},

  mounted() {
    this.handleProvinceColor()
    this.createSvg()
    this.init()
  },

  methods: {
    drawMesh() { // 网状物（相当于铅笔描边的效果）

    },
    changeParam() {
      this.init()
    },
    changePalette() {
      this.handleProvinceColor()
      //   this.createSvg()
      this.init()
    },
    handleProvinceColor() { // 处理省份数据 为省份添加相邻不重复的颜色
      const colors = d3.shuffle(palettes[this.palette].slice(0)) // 选中一组颜色
      provinces.forEach((province, index) => {
        const color = colors.find(c => {
          return !neighbors[index].some(n => provinces[n].properties.color === c)
        }) || colors[0]
        colors.push(colors.shift())
        province.properties.color = color
      })
    },
    createSvg() {
      const svg = d3.select('#WaterColorChina').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]) // 实现显示的移动
        .attr('class', 'waterColor')
      this.svg = svg
    },
    init() {
    //   this.handleProvinceColor()
      d3.select('svg').selectAll('*').remove()

      const defs = this.svg.append('defs')

      defs
        .append('filter')
        .attr('id', 'comfilter')
        .html(
          `${
            this.fractalNoise
              ? `<feTurbulence
                    type="fractalNoise"
                    baseFrequency="${this.fractalNoise}"
                    numOctaves="4"
                ></feTurbulence>
                <feColorMatrix
                    values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -0.9 1.2"
                    result="texture"
                ></feColorMatrix>
                <feComposite
                    in="SourceGraphic"
                    in2="texture"
                    operator="in"
                ></feComposite>`
              : ``
          }<feGaussianBlur stdDeviation="${this.outerBlurAmount}"></feGaussianBlur>`
        )

      const projection = d3.geoMercator() // 设置一个project
        .center([105, 48]) // 经纬度
        .scale(height * 0.85)

      const path = d3.geoPath().projection(projection)

      const groups = this.svg
        .selectAll()
        .data(provinces)
        .enter()
        .append('g')
        .attr('class', 'provinces')
        .attr('filter', 'url(#comfilter)')

      const paths = groups
        .append('path')
        .attr('d', path)
        .attr('fill', d => d.properties.color)
        .attr('stroke', d => d.properties.color)
        .attr('stroke-width', this.stroke)
        .attr('filter', d => {
          return `url(#${d.id})`
        })

      const blurScale = d3
        .scaleLinear()
        .domain([0, 2000])
        .range([this.deviation, this.deviation * 3.5])
        .clamp(true)
      defs
        .selectAll()
        .data(provinces)
        .enter()
        .append('filter')
        .attr('id', d => {
          return d.id
        })
        .html(
          d =>
            `<feGaussianBlur
                in="SourceGraphic"
                stdDeviation="${blurScale(path.area(d))}"
                result="blur"
            ></feGaussianBlur>
            <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="threshold"
            ></feColorMatrix>
            <feComposite
                in="SourceGraphic"
                in2="threshold"
                operator="atop"
            ></feComposite>`
        )
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
