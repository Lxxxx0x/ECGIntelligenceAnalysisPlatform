<script setup>
import { ref } from 'vue';
defineOptions({ name: "DeviceBasicLedger" });
const tableData = ref([
  { id: 1, code: 'DEV-001', name: '12导心电图机', sn: 'SN12345678', dept: '心内科', status: '在用' },
  { id: 2, code: 'DEV-002', name: '多参数监护仪', sn: 'SN12345679', dept: '急诊科', status: '在用' },
  { id: 3, code: 'DEV-003', name: '除颤仪', sn: 'SN12345680', dept: '重症医学科', status: '维修中' },
  { id: 4, code: 'DEV-004', name: '便携式心电监护', sn: 'SN12345681', dept: '呼吸内科', status: '在用' },
  { id: 5, code: 'DEV-005', name: '动态心电图仪(Holter)', sn: 'SN12345682', dept: '心电图室', status: '闲置' },
  { id: 6, code: 'DEV-006', name: '心脏彩超', sn: 'SN12345683', dept: '超声科', status: '在用' },
  { id: 7, code: 'DEV-007', name: '18导心电图机', sn: 'SN12345684', dept: '体检中心', status: '在用' },
  { id: 8, code: 'DEV-008', name: '胎心监护仪', sn: 'SN12345685', dept: '妇产科', status: '在用' },
  { id: 9, code: 'DEV-009', name: '输液泵', sn: 'SN12345686', dept: '神经内科', status: '报废' },
  { id: 10, code: 'DEV-010', name: '麻醉机', sn: 'SN12345687', dept: '神外ICU', status: '在用' },
  { id: 11, code: 'DEV-011', name: '无创呼吸机', sn: 'SN12345688', dept: '急诊科', status: '调配中' },
  { id: 12, code: 'DEV-012', name: '床旁血气仪', sn: 'SN12345689', dept: '检验科', status: '在用' }
]);
</script>
<template>
  <div class="page-container">
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column prop="code" label="设备编号" />
        <el-table-column prop="name" label="设备名称" />
        <el-table-column prop="sn" label="出厂序列号(SN)" />
        <el-table-column prop="dept" label="归属科室" />
        <el-table-column prop="status" label="使用状态" />
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>.page-container { padding: 20px; height: 100%; box-sizing: border-box; background: var(--el-bg-color-overlay); border-radius: 12px; } .table-wrapper { height: 100%; }</style>