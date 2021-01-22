<!--  -->
<template>
  <div>
    <p>line</p>
    <LineChart />
    <p>MultiLine</p>
    <MultiLine />
  </div>
</template>

<script>
import LineChart from './components/lineChart'
import MultiLine from './components/multiLine'
export default {
  name: '',

  components: { LineChart, MultiLine },
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
