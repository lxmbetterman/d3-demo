<!--  -->
<template>
  <div>
    <DelaunayfindZoom />
    <China />
    <ZoomableAreaChart />
  </div>
</template>

<script>
import DelaunayfindZoom from './components/delaunayfindZoom'
import China from './components/china'
import ZoomableAreaChart from './components/zoomableAreaChart'
export default {
  name: '',

  components: { DelaunayfindZoom, China, ZoomableAreaChart },
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
