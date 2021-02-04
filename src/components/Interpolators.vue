<!--  -->
<template>
  <div>
    <p>插入器</p>
  </div>
</template>

<script>
import * as d3 from 'd3'
import dayjs from 'dayjs'
export default {
  name: 'Interpolators',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    const a = d3.interpolateNumber(1, 10.1) // value = a + (b – a) t.
    console.log(a(0.51))

    const b = d3.interpolateRound(1, 10.1)
    console.log(b(0.51)) // 返回interpolateNumber后 四舍五入的结果

    const c = d3.interpolateDate(dayjs(), dayjs().add(10))
    console.log(c(0.2))

    var whiteblue = d3.interpolateRgb('#eee', 'steelblue')
    console.log(whiteblue(0.5))

    // 不同的插入器range(0，1) --> domain为不同的值
    console.log(d3.interpolateRainbow(0.5))

    // d3.quantize 按不同的插入器取样 d3.quantize(interpolator, n) n按等序取样的个数
  },

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
