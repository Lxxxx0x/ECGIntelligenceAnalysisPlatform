<script setup>
import { ref } from 'vue';
defineOptions({ name: "ConsumableTraceability" });
const tableData = ref([
  { id: 1, name: '一次性心电电极片', amount: 5, dept: '心内科', applicant: '王护士', time: '2023-10-10 09:00' }
]);
</script>
<template>
  <div class="page-container">
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column prop="name" label="耗材名称" />
        <el-table-column prop="amount" label="领用数量" />
        <el-table-column prop="dept" label="领用科室" />
        <el-table-column prop="applicant" label="领用人" />
        <el-table-column prop="time" label="领用时间" />
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>.page-container { padding: 20px; height: 100%; box-sizing: border-box; background: var(--el-bg-color-overlay); border-radius: 12px; } .table-wrapper { height: 100%; }</style>