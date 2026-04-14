<script setup>
import { ref } from 'vue';
defineOptions({ name: "DeviceBinding" });
const tableData = ref([
  { id: 1, code: 'DEV-001', patient: '张三', bindTime: '2023-10-10 10:00', status: '采集中' }
]);
</script>
<template>
  <div class="page-container">
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column prop="code" label="设备编号" />
        <el-table-column prop="patient" label="绑定患者" />
        <el-table-column prop="bindTime" label="绑定时间" />
        <el-table-column prop="status" label="采集状态" />
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>.page-container { padding: 20px; height: 100%; box-sizing: border-box; background: var(--el-bg-color-overlay); border-radius: 12px; } .table-wrapper { height: 100%; }</style>