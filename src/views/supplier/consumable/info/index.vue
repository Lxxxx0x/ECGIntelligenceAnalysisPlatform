<script setup>
import { ref } from 'vue';
defineOptions({ name: "ConsumableInfo" });
const tableData = ref([
  { id: 1, code: 'C-001', name: '一次性心电电极片', spec: '成人用', unit: '包', brand: '3M' },
  { id: 2, code: 'C-002', name: '一次性心电电极片', spec: '儿童用', unit: '包', brand: '3M' },
  { id: 3, code: 'C-003', name: '导电膏', spec: '250g/瓶', unit: '瓶', brand: '通用' },
  { id: 4, code: 'C-004', name: '动态心电图记录纸', spec: '50mm*20m', unit: '卷', brand: '索尼' },
  { id: 5, code: 'C-005', name: '超声耦合剂', spec: '250ml', unit: '瓶', brand: '威高' },
  { id: 6, code: 'C-006', name: '除颤仪电极板', spec: '一次性除颤垫', unit: '副', brand: '飞利浦' },
  { id: 7, code: 'C-007', name: '12导联心电导联线', spec: '香蕉插头/按扣', unit: '根', brand: '理邦' },
  { id: 8, code: 'C-008', name: '血氧探头', spec: '成人指夹式', unit: '根', brand: '迈瑞' },
  { id: 9, code: 'C-009', name: '一次性无菌注射器', spec: '5ml', unit: '支', brand: '康德莱' },
  { id: 10, code: 'C-010', name: '医用手套', spec: 'L码/乳胶/无粉', unit: '盒', brand: '麦迪斯' }
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