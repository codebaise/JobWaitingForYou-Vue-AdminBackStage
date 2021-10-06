<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="form" label-width="120px">
      <el-form-item label="通知类型" prop="type">
        <el-select v-model="form.type" placeholder="please select type">
          <el-option v-for="type in notifyTypes" :key="type.value" :label="type.label" :value="type.value" />
        </el-select>
      </el-form-item>
      <!--      is Time start -->
      <el-form-item label="定时通知" prop="isTimed">
        <el-switch v-model="form.isTimed" />
      </el-form-item>
      <el-form-item v-if="form.isTimed" label="Activity time" prop="date">
        <el-date-picker v-model="form.date" type="datetime" placeholder="Pick a date" style="width: 50%;" />
      </el-form-item>
      <!--      is Time end -->
      <el-form-item label="通知标题" prop="title">
        <el-input v-model="form.title" :class="device === 'mobile' ? 'mobile_style' : 'desktop_style'" />
      </el-form-item>
      <el-form-item label="通知内容" prop="content">
        <el-input v-model="form.content" :class="device === 'mobile' ? 'mobile_style' : 'desktop_style'" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendMessage">发布</el-button>
        <el-button @click="resetForm">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { sendMessage } from '@/api/notify'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      // announcement公告/remind提醒/message私信
      notifyTypes: [
        { label: '公告', value: 'announcement' },
        { label: '提醒', value: 'remind' },
        // { label: '私信', value: 'message' }
      ],
      form: {
        type: 'announcement',
        title: '',
        isTimed: false,
        date: new Date(),
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters(['device'])
  },

  methods: {
    formatDate(date) {
      const new_date = new Date(date)
      return new_date.getFullYear() + '-' + (new_date.getMonth() + 1) + '-' + new_date.getDate() +
        ' ' + new_date.getHours() + ':' + new_date.getMinutes() + ':' + new_date.getSeconds()
    },
    sendMessage() {
      this.form.date = this.formatDate(this.form.date)
      sendMessage(this.form).then(response => {
        if (response.code === 200){
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.resetForm()
        } else {
          this.$message({
            message: response.msg,
            type: 'danger'
          })
        }

      })
    },
    resetForm() {
      console.log(this.$refs)
      this.$refs['ruleForm'].resetFields()
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}

.mobile_style {
  width: 100%;
}

.desktop_style {
  width: 70%;
}
</style>
