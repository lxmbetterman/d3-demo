<!--  -->
<template>
  <div>
    dayjs使用练习
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: '',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.getFullyearDates()
    },
    getFullyearDates() { // 获取当年所有天的 时间对象
      var year = dayjs().year()
      console.log(dayjs(year + 1).subtract(1, 'day').dayOfYear())
      const yearLength = dayjs(year + 1).subtract(1, 'day').dayOfYear()
      const dateOffullYear = []
      for (let i = 1; i <= yearLength; i++) {
        const day = dayjs().year(year).dayOfYear(i)
        dateOffullYear.push(day)
      }
      dateOffullYear.forEach(item => {
        console.log(item.format('DD/MM/YYYY'))
      })
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
