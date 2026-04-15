<script setup>
import { ref } from 'vue';
defineOptions({ name: "ConsumableTraceability" });
const tableData = ref([
  { id: 1, name: '一次性心电电极片', amount: 50, dept: '心电图室', applicant: '张医生', time: '2026-04-10 08:30' },
  { id: 2, name: '导电膏', amount: 5, dept: '心内科', applicant: '李护士', time: '2026-04-10 09:15' },
  { id: 3, name: '超声耦合剂', amount: 10, dept: '超声科', applicant: '王医生', time: '2026-04-10 10:00' },
  { id: 4, name: '一次性无菌注射器', amount: 100, dept: '急诊科', applicant: '赵护士长', time: '2026-04-11 08:45' },
  { id: 5, name: '医用手套', amount: 20, dept: '检验科', applicant: '孙医生', time: '2026-04-12 11:20' },
  { id: 6, name: '动态心电图记录纸', amount: 15, dept: '心电图室', applicant: '张医生', time: '2026-04-13 14:05' },
  { id: 7, name: '除颤仪电极板', amount: 2, dept: '重症医学科', applicant: '林护士长', time: '2026-04-14 09:50' },
  { id: 8, name: '血氧探头', amount: 3, dept: '呼吸内科', applicant: '郑护士', time: '2026-04-15 08:10' }
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