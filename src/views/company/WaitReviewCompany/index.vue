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
              <el-divider content-position="left">其他信息</el-divider>
            </div>
            <el-form-item label="描述信息" style="width: 100%">
              <span>{{ props.row.description }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column align="center" label="ID" width="100px">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="公司名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="简称" align="center">
        <template slot-scope="scope">
          {{ scope.row.simpleName }}
        </template>
      </el-table-column>
      <el-table-column label="领域" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.domain }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规模" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.scale + '人' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="信息登记状态"
        align="center"
        :filters="[{ text: '审核未通过', value: 1 }, { text: '审核通过', value: 2 }]"
        :filter-method="filterAuditStatus"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.auditStatus | auditStatusFilter"
          >
            {{ scope.row.auditStatus + 3 | auditStatusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="success" icon="el-icon-check" @click="accessCompany(scope.row.id)" />
          <el-button size="small" type="danger" icon="el-icon-delete" @click="showDialog(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <ban-review-dialog
      :dialogFormVisible="dialogFormVisible"
      :companyId="companyId"
      @closeDialog="closeDialog"
      @dropBanCompany="dropReviewedCompany"
    />
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :total="pageInfo.total"
      :current-page="pageInfo.current"
      :hide-on-single-page="hideOnSinglePage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getList } from '@/api/table'
import BanReviewDialog from '@/views/company/component/BanReviewDialog'
import { accessCompany } from '@/api/company'

export default {
  components: {
    BanReviewDialog
  },
  filters: {
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
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      companyId: 0,
      pageInfo: {},
      auditStatus: 0,
      // 传递给seekerWorkException 组件的data
      publishPositionData: {
        title: '发布的职位',
        showDrawer: false,
        items: []
      },
      listLoading: true,
      hideOnSinglePage: true,
      reviewContent: {
        companyId: 0,
        comment: ''
      }
    }
  },
  created() {
    this.fetchData(1)
  },
  methods: {
    fetchData(page) {
      this.listLoading = true
      getList('/backStageManagement/companies', { page, auditStatus: this.auditStatus }).then((response) => {
        this.pageInfo = response.data.items
        this.listLoading = false
        this.parseStringToIntPage()
      })
    },
    filterAuditStatus(value, row) {
      return row.auditStatus === value
    },
    parseStringToIntPage() {
      this.pageInfo.current = parseInt(this.pageInfo.current)
      this.pageInfo.total = parseInt(this.pageInfo.total)
      this.pageInfo.pages = parseInt(this.pageInfo.pages)
      this.pageInfo.size = parseInt(this.pageInfo.size)
    },
    // 换页 事件
    handleCurrentChange(val) {
      this.fetchData(val)
    },
    accessCompany(companyId) {
      this.companyId = companyId
      accessCompany(companyId).then((response) => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        if (response.code === 200) {
          this.dropReviewedCompany()
        }
      })
    },
    showDialog(companyId) {
      this.companyId = companyId
      this.dialogFormVisible = true
    },
    closeDialog() {
      this.dialogFormVisible = false
    },
    dropReviewedCompany() {
      this.pageInfo.records = this.pageInfo.records.filter(item => item.id !== this.companyId)
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
