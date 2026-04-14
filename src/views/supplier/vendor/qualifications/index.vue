<script setup>
import { ref } from 'vue';
defineOptions({ name: "VendorQualifications" });
const tableData = ref([
  { id: 1, vendorName: '迈瑞医疗', certName: '医疗器械生产许可证', expireDate: '2026-12-31', status: '有效' }
]);
</script>
<template>
  <div class="page-container">
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column prop="vendorName" label="厂商名称" />
        <el-table-column prop="certName" label="资质名称" />
        <el-table-column prop="expireDate" label="有效期至" />
        <el-table-column prop="status" label="状态" />
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>.page-container { padding: 20px; height: 100%; box-sizing: border-box; background: var(--el-bg-color-overlay); border-radius: 12px; } .table-wrapper { height: 100%; }</style>