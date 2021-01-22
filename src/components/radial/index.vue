<!--  -->
<template>
  <div>
    <p>饼图 雷达图 demo</p>

    <p>基础pie chart</p>
    <PieChart />
    ----
    <RadialStackedBarChart />
  </div>
</template>

<script>
import PieChart from './components/pieChart'
import RadialStackedBarChart from './components/radialStackedBarChart'
export default {
  name: '',

  components: { PieChart, RadialStackedBarChart },
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
