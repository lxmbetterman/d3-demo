<!--  -->
<template>
  <div>
    <BasicTree />
    <CollapsibleTree />
  </div>
</template>

<script>
import BasicTree from './components/basicTree'
import CollapsibleTree from './components/collapsibleTree'
export default {
  name: '',

  components: { CollapsibleTree, BasicTree },
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
