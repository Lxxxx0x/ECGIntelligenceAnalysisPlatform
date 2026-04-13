<script setup>
defineOptions({
  name: "AbnormalMetrics",
});
</script>

<template>
  <div class="page-container">
    <div class="header-title">异常指标管理</div>
    <div class="content-box">
      <el-empty description="异常指标管理 内容开发中..." />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: #333;

  .header-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 24px;
    color: #333;
  }

  .content-box {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #e0e0e0;
    border-radius: 12px;
    background: #f8f9fa;
  }
}
</style>
