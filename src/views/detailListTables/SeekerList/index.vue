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
          <el-form label-position="left" inline class="demo-table-expand">
            <div>
              <el-divider content-position="left">基本信息</el-divider>
            </div>
            <el-form-item label="姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="年龄">
              <span>{{ props.row.age }}</span>
            </el-form-item>
            <el-form-item label="用户身份">
              <span>{{ props.row.userIdentity | userIdentityFilter }}</span>
            </el-form-item>
            <el-form-item label="当前求职状态">
              <span>{{ props.row.currentStatus | currentStatusFilter(props.row.userIdentity) }}</span>
            </el-form-item>
            <el-form-item label="期望职位">
              <span>{{ props.row.expectPosition }}</span>
            </el-form-item>
            <el-form-item label="期望城市">
              <span>{{ props.row.expectCity }}</span>
            </el-form-item>
            <div>
              <el-divider content-position="left">教育经历</el-divider>
            </div>
            <el-form-item label="学校名称">
              <span>{{ props.row.schoolName }}</span>
            </el-form-item>
            <el-form-item label="学历">
              <span>{{ props.row.education | educationFilter }}</span>
            </el-form-item>
            <el-form-item label="专业">
              <span>{{ props.row.domain }}</span>
            </el-form-item>
            <el-form-item label="入学时间">
              <span>{{ props.row.startTime }}</span>
            </el-form-item>
            <el-form-item label="毕业时间">
              <span>{{ props.row.endTime }}</span>
            </el-form-item>
            <div>
              <el-divider content-position="left">查询更多</el-divider>
            </div>
            <el-form-item label="MoreInfos" style="width: 100%">
              <el-button type="primary" plain size="mini" icon="el-icon-search" @click="getWorkExperience(props.row.seekerId)">就职经历</el-button>
              <el-button type="primary" plain size="mini" icon="el-icon-search" @click="getDeliver(props.row.seekerId)">投递记录</el-button>
            </el-form-item>
          </el-form>
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
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="用户身份" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userIdentity | userIdentityFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="期望职位" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.expectPosition }}</span>
        </template>
      </el-table-column>
      <el-table-column label="期望城市" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.expectCity }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Status"
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
    <seeker-work-exception :data="seekerWorkExperienceData" />
    <position-drawer :data="seekerDeliverData" />
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
import SeekerWorkException from '@/views/detailListTables/SeekerList/WorkException'
import PositionDrawer from '@/views/detailListTables/components/PositionDrawer'
export default {
  components: {
    SeekerWorkException,
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
    userIdentityFilter(userIdentity) {
      return userIdentity === 0 ? '应届生' : '职场人士'
    },
    currentStatusFilter(currentStatus, userIdentity) {
      if (userIdentity === 0) {
        return ''
      }
      const currentStatusMap = {
        0: '离职找工作',
        1: '在职找工作',
        2: '在职看机会',
        3: '暂时不找工作'
      }
      return currentStatusMap[currentStatus]
    },
    educationFilter(education) {
      const educationRule = {
        0: '不限',
        1: '初中及以下',
        2: '中专/中技',
        3: '高中',
        4: '大专',
        5: '本科',
        6: '硕士',
        7: '博士'
      }
      return educationRule[education]
    }
  },
  data() {
    return {
      pageInfo: {},
      // 传递给seekerWorkException 组件的data
      seekerWorkExperienceData: {
        workExperienceTable: false,
        seekerWorkExperience: []
      },
      // 传递给 seekerDeliverList 组件的data
      seekerDeliverData: {
        title: '投递记录',
        showDrawer: false,
        items: []
      },
      listLoading: true
    }
  },
  created() {
    this.fetchData(1)
  },
  methods: {
    fetchData(page) {
      this.listLoading = true
      getList('/backStageManagement/seekers', { page }).then((response) => {
        this.pageInfo = response.data.items
        this.listLoading = false
        this.parseStringToIntPage()
      })
    },
    parseStringToIntPage() {
      this.pageInfo.current = parseInt(this.pageInfo.current)
      this.pageInfo.total = parseInt(this.pageInfo.total)
      this.pageInfo.pages = parseInt(this.pageInfo.pages)
      this.pageInfo.size = parseInt(this.pageInfo.size)
    },
    // 获取 工作经历 List
    getWorkExperience(userId) {
      getList(`/seeker/${userId}/workExperiences`).then((response) => {
        this.seekerWorkExperienceData.seekerWorkExperience = response.data.items
        this.seekerWorkExperienceData.workExperienceTable = true
      })
    },
    // 获取 投递记录 List
    getDeliver(userId) {
      getList(`/seeker/${userId}/delivers`).then((response) => {
        this.seekerDeliverData.items = response.data.items
        this.seekerDeliverData.showDrawer = true
      })
    },
    // 换页 事件
    handleCurrentChange(val) {
      this.fetchData(val)
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
