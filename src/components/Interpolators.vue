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
  },

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
