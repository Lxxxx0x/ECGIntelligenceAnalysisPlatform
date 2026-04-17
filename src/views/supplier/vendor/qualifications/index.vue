<script setup>
import { ref } from 'vue';
defineOptions({ name: "VendorQualifications" });
const tableData = ref([
  { id: 1, vendorName: '迈瑞医疗', certName: '医疗器械生产许可证', expireDate: '2026-12-31', status: '有效' },
  { id: 2, vendorName: '理邦仪器', certName: '医疗器械经营企业许可证', expireDate: '2025-05-20', status: '有效' },
  { id: 3, vendorName: '飞利浦医疗', certName: '营业执照', expireDate: '2099-12-31', status: '有效' },
  { id: 4, vendorName: '通用电气医疗', certName: '医疗器械注册证', expireDate: '2023-10-01', status: '已过期' },
  { id: 5, vendorName: '上海微创', certName: '税务登记证', expireDate: '2028-06-15', status: '有效' },
  { id: 6, vendorName: '鱼跃医疗', certName: '医疗器械生产许可证', expireDate: '2024-01-10', status: '已过期' },
  { id: 7, vendorName: '美敦力', certName: '排污许可证', expireDate: '2027-09-09', status: '有效' },
  { id: 8, vendorName: '西门子医疗', certName: '医疗器械注册证', expireDate: '2026-04-30', status: '即将过期' }
]);
</script>
<template>
  <div class="page-container">
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column prop="vendorName" label="厂商名称" />
        <el-table-column prop="certName" label="资质名称" />
        <el-table-column prop="expireDate" label="有效期至" />
        <el-table-column prop="status" label="状态" />
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>.page-container { padding: 20px; height: 100%; box-sizing: border-box; background: var(--el-bg-color-overlay); border-radius: 12px; } .table-wrapper { height: 100%; }</style>