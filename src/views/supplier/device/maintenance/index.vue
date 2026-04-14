<script setup>
import { ref } from 'vue';
defineOptions({ name: "DeviceMaintenance" });
const tableData = ref([
  { id: 1, code: 'DEV-001', type: '定期校准', date: '2023-09-01', operator: '李工', result: '正常' }
]);
</script>
<template>
  <div class="page-container">
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column prop="code" label="设备编号" />
        <el-table-column prop="type" label="维保类型" />
        <el-table-column prop="date" label="执行日期" />
        <el-table-column prop="operator" label="执行人" />
        <el-table-column prop="result" label="结果" />
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>.page-container { padding: 20px; height: 100%; box-sizing: border-box; background: var(--el-bg-color-overlay); border-radius: 12px; } .table-wrapper { height: 100%; }</style>