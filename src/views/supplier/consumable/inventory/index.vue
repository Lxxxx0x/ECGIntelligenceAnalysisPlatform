<script setup>
import { ref } from 'vue';
defineOptions({ name: "ConsumableInventory" });
const tableData = ref([
  { id: 1, name: '一次性心电电极片', stock: 500, unit: '包', warningLevel: 100, status: '充足' }
]);
</script>
<template>
  <div class="page-container">
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column prop="name" label="耗材名称" />
        <el-table-column prop="stock" label="当前库存" />
        <el-table-column prop="warningLevel" label="警戒库存" />
        <el-table-column prop="status" label="库存状态" />
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>.page-container { padding: 20px; height: 100%; box-sizing: border-box; background: var(--el-bg-color-overlay); border-radius: 12px; } .table-wrapper { height: 100%; }</style>