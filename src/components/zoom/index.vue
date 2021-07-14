<!--  -->
<template>
  <div>
    <DelaunayfindZoom />
    <China />
    <ZoomableAreaChart />
    <Divzoom />
  </div>
</template>

<script>
import DelaunayfindZoom from './components/delaunayfindZoom'
import China from './components/china'
import ZoomableAreaChart from './components/zoomableAreaChart'
import Divzoom from './components/divzoom'
export default {
  name: '',

  components: { DelaunayfindZoom, China, ZoomableAreaChart, Divzoom },
  data() {
    return {
    }
  },

  computed: {},

  mounted() {

  },

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
