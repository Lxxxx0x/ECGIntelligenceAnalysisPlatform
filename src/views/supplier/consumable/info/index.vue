<script setup>
import { ref } from 'vue';
defineOptions({ name: "ConsumableInfo" });
const tableData = ref([
  { id: 1, code: 'C-001', name: '一次性心电电极片', spec: '成人用', unit: '包', brand: '3M' }
]);
</script>
<template>
  <div class="page-container">
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column prop="code" label="耗材编号" />
        <el-table-column prop="name" label="耗材名称" />
        <el-table-column prop="spec" label="规格型号" />
        <el-table-column prop="brand" label="品牌" />
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>.page-container { padding: 20px; height: 100%; box-sizing: border-box; background: var(--el-bg-color-overlay); border-radius: 12px; } .table-wrapper { height: 100%; }</style>