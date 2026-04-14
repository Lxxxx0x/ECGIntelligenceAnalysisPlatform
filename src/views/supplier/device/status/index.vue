<script setup>
import { ref } from 'vue';
defineOptions({ name: "DeviceStatus" });
const tableData = ref([
  { id: 1, code: 'DEV-001', battery: '85%', signal: '强', onlineStatus: '在线', lastActive: '2023-10-10 10:30' }
]);
</script>
<template>
  <div class="page-container">
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column prop="code" label="设备编号" />
        <el-table-column prop="battery" label="电量" />
        <el-table-column prop="signal" label="信号强度" />
        <el-table-column prop="onlineStatus" label="在线状态" />
        <el-table-column prop="lastActive" label="最后活跃时间" />
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>.page-container { padding: 20px; height: 100%; box-sizing: border-box; background: var(--el-bg-color-overlay); border-radius: 12px; } .table-wrapper { height: 100%; }</style>