<script setup>
import { ref } from 'vue';
defineOptions({ name: "ProcurementOrder" });
const tableData = ref([
  { id: 1, orderNo: 'PO-20260401', itemName: '心电图机', amount: 2, vendor: '理邦仪器', status: '待审批', date: '2026-04-01' },
  { id: 2, orderNo: 'PO-20260405', itemName: 'Holter分析软件', amount: 1, vendor: '迈瑞医疗', status: '已通过', date: '2026-04-05' },
  { id: 3, orderNo: 'PO-20260406', itemName: '一次性电极片', amount: 500, vendor: '3M', status: '采购中', date: '2026-04-06' },
  { id: 4, orderNo: 'PO-20260408', itemName: '动态心电记录仪', amount: 5, vendor: '理邦仪器', status: '已到货', date: '2026-04-08' },
  { id: 5, orderNo: 'PO-20260410', itemName: '中央监护站', amount: 1, vendor: '飞利浦医疗', status: '待审批', date: '2026-04-10' },
  { id: 6, orderNo: 'PO-20260411', itemName: '导电膏', amount: 100, vendor: '通用', status: '驳回', date: '2026-04-11' },
  { id: 7, orderNo: 'PO-20260412', itemName: '除颤仪', amount: 3, vendor: '迈瑞医疗', status: '采购中', date: '2026-04-12' },
  { id: 8, orderNo: 'PO-20260414', itemName: '血氧监护探头', amount: 50, vendor: '理邦仪器', status: '待审批', date: '2026-04-14' }
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