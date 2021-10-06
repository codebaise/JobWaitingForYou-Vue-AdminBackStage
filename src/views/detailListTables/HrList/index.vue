<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="pageInfo.records"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form v-if="props.row.hrCompanyId !== 0" label-position="left" inline class="demo-table-expand">
            <div>
              <el-divider content-position="left">公司信息 {{ props.row.hrCompanyId }} </el-divider>
            </div>
            <el-form-item label="公司名称">
              <span>{{ props.row.companyName }}</span>
            </el-form-item>
            <el-form-item label="公司简称">
              <span>{{ props.row.simpleName }}</span>
            </el-form-item>
            <el-form-item label="主要领域">
              <span>{{ props.row.domain }}</span>
            </el-form-item>
            <el-form-item label="公司介绍">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="公司规模">
              <span>{{ props.row.scale + '人' }}</span>
            </el-form-item>
            <el-form-item label="公司审核状态">

              <el-tag
                :type="props.row.auditStatus | auditStatusFilter"
                effect="dark"
                size="small"
              >
                {{ props.row.auditStatus + 3 | auditStatusFilter }}
              </el-tag>
            </el-form-item>
            <div>
              <el-divider content-position="left">查询更多</el-divider>
            </div>
            <el-form-item label="MoreInfos" style="width: 100%">
              <el-button type="primary" plain size="mini" icon="el-icon-search" @click="getHrPublishPosition(props.row.hrId)">发布的职位</el-button>
            </el-form-item>
          </el-form>
          <span v-if="props.row.hrCompanyId === 0" style="margin: 0 40%"> 还未添加公司 </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="ID" width="100px">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="用户名(手机/邮箱)" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.hrName }}
        </template>
      </el-table-column>
      <el-table-column label="职位" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.curPosition }}</span>
        </template>
      </el-table-column>
      <el-table-column label="就职公司" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hrCompanyId == 0 ? '未添加公司' : scope.row.companyName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="信息登记状态" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status | userInfoEnrolStatusFilter"
          >
            {{ scope.row.status+2 | userInfoEnrolStatusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="AccountStatus"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.isDelete | statusFilter">{{ scope.row.isDelete + 2 | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isDelete === 0" size="small" type="danger" icon="el-icon-delete" circle @click="changeUserAccountStatus(scope.row.accountId, scope.$index)" />
          <el-button v-if="scope.row.isDelete === 1" size="small" type="success" icon="el-icon-check" circle @click="changeUserAccountStatus(scope.row.accountId, scope.$index)" />
        </template>
      </el-table-column>
    </el-table>
    <position-drawer :data="publishPositionData" />
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :total="pageInfo.total"
      :current-page="pageInfo.current"
      :hide-on-single-page="true"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { changeUserAccountStatus } from '@/api/user'
import PositionDrawer from '@/views/detailListTables/components/PositionDrawer'
export default {
  components: {
    PositionDrawer
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'danger',
        2: '正常',
        3: '封禁'
      }
      return statusMap[status]
    },
    auditStatusFilter(status) {
      const statusMap = {
        0: 'warning',
        1: 'danger',
        2: 'success',
        3: '审核中',
        4: '公司资质不达标',
        5: '审核通过'
      }
      return statusMap[status]
    },
    userInfoEnrolStatusFilter(status) {
      const userInfoEnrolStatusMap = {
        0: 'danger',
        1: 'success',
        2: '审核中',
        3: '审核成功'
      }
      return userInfoEnrolStatusMap[status]
    }
  },
  data() {
    return {
      pageInfo: {},
      // 传递给seekerWorkException 组件的data
      publishPositionData: {
        title: '发布的职位',
        showDrawer: false,
        items: []
      },
      // 传递给 seekerDeliverList 组件的data
      seekerDeliverData: {
        deliverTable: false,
        deliverList: []
      },
      listLoading: true,
      hideOnSinglePage: true
    }
  },
  created() {
    this.fetchData(1)
  },
  methods: {
    fetchData(page) {
      this.listLoading = true
      getList('/backStageManagement/hrs', { page }).then((response) => {
        this.pageInfo = response.data.items
        this.listLoading = false
        this.parseStringToIntPage()
      })
    },
    // 获取 seeker发布的职位
    getHrPublishPosition(hrId) {
      getList(`/hr/${hrId}/publishPosition`).then((response) => {
        this.publishPositionData.items = response.data.items
        this.publishPositionData.showDrawer = true
      })
    },
    // 换页 事件
    handleCurrentChange(val) {
      this.fetchData(val)
    },
    parseStringToIntPage() {
      this.pageInfo.current = parseInt(this.pageInfo.current)
      this.pageInfo.total = parseInt(this.pageInfo.total)
      this.pageInfo.pages = parseInt(this.pageInfo.pages)
      this.pageInfo.size = parseInt(this.pageInfo.size)
    },
    // 改变用户的账户状态
    changeUserAccountStatus(accountId, index) {
      changeUserAccountStatus(accountId).then((response) => {
        console.log(response)
        if (response.code === 200) {
          this.$message({
            message: 'Operation success !',
            type: 'success'
          })
          const deleteStatus = this.pageInfo.records[index].isDelete
          this.pageInfo.records[index].isDelete = deleteStatus === 0 ? 1 : 0
        }
      })
    }
  }
}
</script>

<style scoped>
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 30%;
}

.el-form-item {
  padding-left: 30px
}

.el-pagination.is-background {
  width: 50%;
  margin-top: 20px;
  margin-left: 30%;
}
</style>
