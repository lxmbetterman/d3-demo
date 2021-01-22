<!--  -->
<template>
  <div>
    <p>Area Chart</p>
    <AreaChart />
    <p>ridgelinePolt 山脊线</p>
    <RidgelinePlot />
    <p>canvas滚动area图</p>
    <RealtimeHorizonChart />
  </div>
</template>

<script>
import AreaChart from './components/areaChart'
import RidgelinePlot from './components/ridgelinePlot'
import RealtimeHorizonChart from './components/realtimeHorizonChart'
export default {
  name: '',

  components: { AreaChart, RidgelinePlot, RealtimeHorizonChart },
  data() {
    return {
    }
  },

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
