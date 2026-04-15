<template>
  <div class="integrated-container">
    <el-tabs v-model="activeTab" class="demo-tabs">
      <el-tab-pane label="采购申请订单" name="order">
        <ProcurementOrder />
      </el-tab-pane>
      <el-tab-pane label="采购验收管理" name="acceptance">
        <ProcurementAcceptance />
      </el-tab-pane>
      <el-tab-pane label="采购台账统计" name="statistics">
        <ProcurementStatistics />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProcurementOrder from './order/index.vue'
import ProcurementAcceptance from './acceptance/index.vue'
import ProcurementStatistics from './statistics/index.vue'

const activeTab = ref('order')
</script>

<style scoped>
.integrated-container {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.demo-tabs {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  flex: 1;
}
:deep(.el-tabs__content) {
  flex: 1;
  overflow: auto;
}
</style>
