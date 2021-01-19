<!--  -->
<template>
  <div>
    <div>柱状图相关demo</div>
    <Bar />
    <hr>
    <p>水平 bar </p>
    <HorizontalBar />
    <p>对比 bar</p>
    <DevergeBar />
    <p>stacked bar</p>
    <p>https://blog.csdn.net/weixin_33851604/article/details/91367671</p>
    <StackedBar />
    <p>Grouped Bar</p>
    <GroupedBar />
  </div>
</template>

<script>
import Bar from './components/bar'
import HorizontalBar from './components/barHorizontal'
import DevergeBar from './components/devergeBar'
import StackedBar from './components/stackedBar'
import GroupedBar from './components/groupedBar'
export default {
  name: '',

  components: { Bar, HorizontalBar, DevergeBar, StackedBar, GroupedBar },
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
