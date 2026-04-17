<script setup>
defineOptions({
  name: "SupplierList",
});
</script>

<template>
  <div class="page-container">
    <div class="header-title">供应商列表</div>
    <div class="content-box">
      <el-empty description="供应商列表 内容开发中..." />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  background: var(--el-bg-color-overlay);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: var(--el-text-color-primary);

  .header-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 24px;
    color: var(--el-text-color-primary);
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
