<script setup>
import { ref } from 'vue';
defineOptions({ name: "ProcurementAcceptance" });
const tableData = ref([
  { id: 1, orderNo: 'PO-20230915', itemName: '一次性电极片', amount: 1000, receiver: '库房李', date: '2023-09-20', status: '已入库' }
]);
</script>
<template>
  <div class="page-container">
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column prop="orderNo" label="关联单号" />
        <el-table-column prop="itemName" label="物资名称" />
        <el-table-column prop="amount" label="到货数量" />
        <el-table-column prop="receiver" label="验收人" />
        <el-table-column prop="date" label="验收日期" />
        <el-table-column prop="status" label="状态" />
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>.page-container { padding: 20px; height: 100%; box-sizing: border-box; background: var(--el-bg-color-overlay); border-radius: 12px; } .table-wrapper { height: 100%; }</style>