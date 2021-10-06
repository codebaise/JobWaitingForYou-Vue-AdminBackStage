<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }} <br>token: {{ token }}</div>
    <button @click="showList">showRouteList</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'token'
    ])
  },
  methods: {
    showList() {
      console.log(this.$router.options.routes)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
