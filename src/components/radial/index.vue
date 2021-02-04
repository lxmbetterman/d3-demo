<!--  -->
<template>
  <div>
    <p>饼图 雷达图 demo</p>

    <p>基础pie chart</p>
    <PieChart />
    <p>-------------------</p>
    <RadialStackedBarChart />

    <ZoomableSunburst />
  </div>
</template>

<script>
import PieChart from './components/pieChart'
import RadialStackedBarChart from './components/radialStackedBarChart'
import ZoomableSunburst from './components/zoomableSunburst'
export default {
  name: '',

  components: { PieChart, RadialStackedBarChart, ZoomableSunburst },
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
