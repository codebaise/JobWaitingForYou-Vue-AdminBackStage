<template>
  <div>
    <!--    为了美观 -->
    <div style="margin-bottom: 10px" />
    <notify-item
      v-for="item in pageInfo.records"
      :key="item.createTime"
      :title="item.title"
      :content="item.content"
      :createTime="item.createTime"
    />
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
import NotifyItem from '@/views/notify/ReviewNotify/NotifyItem'

export default {
  components: {
    NotifyItem
  },
  data() {
    return {
      pageInfo: {},
      listLoading: false
    }
  },
  created() {
    this.fetchData(1)
  },
  methods: {
    fetchData(page) {
      this.listLoading = true
      getList('/message', { page }).then((response) => {
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
    handleCurrentChange(val) {
      this.fetchData(val)
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.el-pagination.is-background {
  width: 50%;
  margin-top: 20px;
  margin-left: 30%;
  margin-bottom: 20px;
}

.infinite-list li {
  list-style: none;
}

ul {
  margin: 0;
  padding: 0;
}

</style>
