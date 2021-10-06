<template>

  <el-drawer
    title="Comments :"
    :append-to-body="true"
    :visible.sync="data.openDraw"
    size="35%"
  >
    <el-table
      :data="data.comments"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" />
      <el-table-column property="hrPosition" label="hrPosition" width="100" />
      <el-table-column property="createTime" label="createTime" width="100" />
      <el-table-column property="comment" label="comment" show-overflow-tooltip />

    </el-table>
  </el-drawer>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
