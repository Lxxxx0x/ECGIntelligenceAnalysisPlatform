<script setup>
import { ref } from 'vue';
defineOptions({ name: "DeviceMaintenance" });
const tableData = ref([
  { id: 1, code: 'DEV-001', type: '定期保养', date: '2026-03-01', operator: '王工', result: '正常' },
  { id: 2, code: 'DEV-002', type: '精度校准', date: '2026-03-15', operator: '李工', result: '正常' },
  { id: 3, code: 'DEV-003', type: '除颤模块检测', date: '2026-03-20', operator: '张工', result: '需更换电池' },
  { id: 4, code: 'DEV-004', type: '日常维护', date: '2026-03-25', operator: '设备科/孙工', result: '正常' },
  { id: 5, code: 'DEV-005', type: '软硬件升级', date: '2026-04-02', operator: '厂家/陈工', result: '正常' },
  { id: 6, code: 'DEV-006', type: '电路板除尘', date: '2026-04-05', operator: '王工', result: '正常' },
  { id: 7, code: 'DEV-007', type: '定期维修', date: '2026-04-10', operator: '李工', result: '主板更换，待验收' },
  { id: 8, code: 'DEV-008', type: '探头灵敏度检查', date: '2026-04-12', operator: '张工', result: '信号良好' }
]);
</script>
<template>
  <div class="page-container">
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column prop="code" label="设备编号" />
        <el-table-column prop="type" label="维保类型" />
        <el-table-column prop="date" label="执行日期" />
        <el-table-column prop="operator" label="执行人" />
        <el-table-column prop="result" label="结果" />
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>.page-container { padding: 20px; height: 100%; box-sizing: border-box; background: var(--el-bg-color-overlay); border-radius: 12px; } .table-wrapper { height: 100%; }</style>