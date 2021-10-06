<template>
  <el-drawer
    title="就职经历 :"
    :visible.sync="data.workExperienceTable"
    direction="rtl"
    size="50%"
  >
    <el-table
      :data="data.seekerWorkExperience"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" />
      <el-table-column property="companyName" label="就职公司" width="100" />
      <el-table-column property="position" label="职位" width="70" />
      <el-table-column property="startTime" label="入职时间" width="100" />
      <el-table-column property="endTime" label="离职时间" width="100" />
      <el-table-column property="description" show-overflow-tooltip label="简述" />
      <el-table-column label="就职评价" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-search" circle @click="getPositionComments(scope.row.userId, scope.row.positionId)" />
        </template>
      </el-table-column>
    </el-table>
    <position-comments :data="innerDrawerData" />
  </el-drawer>
</template>

<script>
import { getPositionComments } from '@/api/user'
import PositionComments from '@/views/detailListTables/SeekerList/WorkExceptionPositionComments'

export default {
  components: {
    PositionComments
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      expandStatus: false,
      // 传递给 下层的 PositionComments 组件的data
      innerDrawerData: {
        openDraw: false,
        comments: {}
      }
    }
  },
  methods: {
    // 获取 当前就职经历的评论列表
    getPositionComments(userId, positionId) {
      if (positionId === null || positionId === undefined || positionId === ""){
        this.$message({
          message: "该记录为用户自行添加",
          type: 'warning'
        })
        return
      }

      console.log(userId)
      getPositionComments(userId, positionId).then((response) => {
        this.innerDrawerData.comments = response.data.items
        this.innerDrawerData.openDraw = true
      })
    }
  }
}
</script>

<style scoped>

</style>
