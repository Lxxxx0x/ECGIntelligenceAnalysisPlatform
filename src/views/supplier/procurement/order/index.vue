<script setup>
import { ref } from 'vue';
defineOptions({ name: "ProcurementOrder" });
const tableData = ref([
  { id: 1, orderNo: 'PO-20231001', itemName: '心电图机', amount: 2, vendor: '理邦仪器', status: '待审批', date: '2023-10-01' }
]);
</script>
<template>
  <div class="page-container">
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column prop="orderNo" label="申请单号" />
        <el-table-column prop="itemName" label="请购物资" />
        <el-table-column prop="amount" label="数量" />
        <el-table-column prop="vendor" label="建议供应商" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="date" label="申请日期" />
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>.page-container { padding: 20px; height: 100%; box-sizing: border-box; background: var(--el-bg-color-overlay); border-radius: 12px; } .table-wrapper { height: 100%; }</style>