<template>
  <el-dialog title="审核建议" :visible.sync="dialogFormVisible" center>
    <el-form :model="form">
      <el-form-item label="建议" :label-width="formLabelWidth">
        <el-input v-model="form.reviewContent" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="banReivewContentByCompanyId">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { banCompany } from '@/api/company'
export default {
  name: 'EditReviewDrawer',
  props: {
    dialogFormVisible: Boolean,
    companyId: {
      String,
      default: 0
    }
  },
  data() {
    return {
      form: {
        reviewContent: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    banReivewContentByCompanyId() {
      banCompany(this.companyId, this.form.reviewContent).then((response) => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.closeDialog()
        if (response.code === 200)
          this.dropBanCompany()
      })
    },
    closeDialog() {
      this.$emit("closeDialog")
    },
    dropBanCompany(){
      this.$emit("dropBanCompany", 1)
    }
  }
}
</script>

<style>
 .el-dialog--center .el-dialog__body{
    padding-bottom: 0;
  }
</style>
