<script setup>
import { ref } from 'vue';
defineOptions({ name: "VendorDeviceLedger" });
const tableData = ref([
  { id: 1, vendorName: '迈瑞医疗', deviceModel: 'BeneVision N17', deviceType: '心电监护仪', totalSupply: 50 }
]);
</script>
<template>
  <div class="page-container">
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column prop="vendorName" label="厂商名称" />
        <el-table-column prop="deviceModel" label="设备型号" />
        <el-table-column prop="deviceType" label="设备类型" />
        <el-table-column prop="totalSupply" label="累计供给数量" />
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>.page-container { padding: 20px; height: 100%; box-sizing: border-box; background: var(--el-bg-color-overlay); border-radius: 12px; } .table-wrapper { height: 100%; }</style>