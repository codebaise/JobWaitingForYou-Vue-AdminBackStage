<template>
  <el-drawer
    title="审核历史"
    :visible.sync="drawerData.showDrawer"
    direction="rtl"
    size="50%">
    <el-table :data="drawerData.items">
      <el-table-column property="date" label="日期" width="200"></el-table-column>
      <el-table-column show-overflow-tooltip property="comment" label="comment"></el-table-column>
    </el-table>
  </el-drawer>
</template>

<script>
export default {
  name: 'ReviewHistoryDrawer',
  props: {
    drawerData: Object
  }
}
</script>

<style scoped>

</style>
