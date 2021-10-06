<template>
  <div class="card system-item">
    <div class="top">
      <span class="title"> {{ title }}</span>
      <span class="time"> {{ createTime }}</span>
    </div>
    <div class="bottom">
      <span class="text">
        <span> {{ content }}</span>
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'NotifyItem',
  props: {
    title: String,
    content: String,
    createTime: String
  }
}
</script>

<style scoped>
 .card {
   padding: 24px 16px;
   background-color: #fff;
   -webkit-box-shadow: 0 2px 4px 0 rgb(121 146 185 / 54%);
   box-shadow: 0 2px 4px 0 rgb(121 146 185 / 54%);
   margin-bottom: 10px;
   margin-left: 10px;
   margin-right: 10px;
   border-radius: 4px;
   font-size: 14px;
 }
 .system-item {
   line-height: 24px;
   position: relative;
 }
 .title {
   color: #333;
   font-weight: 700;
 }
 .time {
   color: #999;
   font-size: 12px;
   line-height: 22px;
   margin: 0 10px;
 }
 .bottom {
   color: #666;
   padding-left: 8px;
   font-size: 13px;
 }
 .text {
   word-break: break-word;
 }
</style>
