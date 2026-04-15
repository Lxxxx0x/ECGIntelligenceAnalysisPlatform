<script setup>
import { ref } from 'vue';
defineOptions({ name: "DeviceStatus" });
const tableData = ref([
  { id: 1, code: 'DEV-001', battery: '85%', signal: '强', onlineStatus: '在线', lastActive: '2026-04-15 10:30' },
  { id: 2, code: 'DEV-002', battery: '45%', signal: '中', onlineStatus: '在线', lastActive: '2026-04-15 10:29' },
  { id: 3, code: 'DEV-003', battery: '12%', signal: '极弱', onlineStatus: '离线', lastActive: '2026-04-15 08:15' },
  { id: 4, code: 'DEV-004', battery: '100%', signal: '强', onlineStatus: '在线', lastActive: '2026-04-15 10:31' },
  { id: 5, code: 'DEV-005', battery: '0%', signal: '无', onlineStatus: '离线', lastActive: '2026-04-13 14:20' },
  { id: 6, code: 'DEV-006', battery: '66%', signal: '中', onlineStatus: '在线', lastActive: '2026-04-15 10:31' },
  { id: 7, code: 'DEV-007', battery: '23%', signal: '弱', onlineStatus: '在线', lastActive: '2026-04-15 10:25' },
  { id: 8, code: 'DEV-008', battery: '95%', signal: '强', onlineStatus: '在线', lastActive: '2026-04-15 10:30' }
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