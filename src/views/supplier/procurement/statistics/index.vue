<script setup>
import { ref } from 'vue';
defineOptions({ name: "ProcurementStatistics" });
const tableData = ref([
  { id: 1, month: '2023-09', totalAmount: '¥ 125,000.00', deviceCount: 3, consumableCount: 5000 }
]);
</script>
<template>
  <div class="page-container">
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column prop="month" label="统计月份" />
        <el-table-column prop="totalAmount" label="采购总额" />
        <el-table-column prop="deviceCount" label="新增设备数量" />
        <el-table-column prop="consumableCount" label="消耗品入库数量" />
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>.page-container { padding: 20px; height: 100%; box-sizing: border-box; background: var(--el-bg-color-overlay); border-radius: 12px; } .table-wrapper { height: 100%; }</style>