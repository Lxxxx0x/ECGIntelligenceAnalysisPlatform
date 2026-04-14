<script setup>
import { ref } from 'vue';
defineOptions({ name: "DeviceBasicLedger" });
const tableData = ref([
  { id: 1, code: 'DEV-001', name: '12导心电图机', sn: 'SN12345678', dept: '心内科', status: '在用' }
]);
</script>
<template>
  <div class="page-container">
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column prop="code" label="设备编号" />
        <el-table-column prop="name" label="设备名称" />
        <el-table-column prop="sn" label="出厂序列号(SN)" />
        <el-table-column prop="dept" label="归属科室" />
        <el-table-column prop="status" label="使用状态" />
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>.page-container { padding: 20px; height: 100%; box-sizing: border-box; background: var(--el-bg-color-overlay); border-radius: 12px; } .table-wrapper { height: 100%; }</style>