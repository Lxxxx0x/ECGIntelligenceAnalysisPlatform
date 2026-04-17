<template>
  <div class="integrated-container">
    <el-tabs v-model="activeTab" class="demo-tabs">
      <el-tab-pane label="耗材信息管理" name="info">
        <ConsumableInfo />
      </el-tab-pane>
      <el-tab-pane label="耗材库存管理" name="inventory">
        <ConsumableInventory />
      </el-tab-pane>
      <el-tab-pane label="耗材领用追溯" name="traceability">
        <ConsumableTraceability />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ConsumableInfo from './info/index.vue'
import ConsumableInventory from './inventory/index.vue'
import ConsumableTraceability from './traceability/index.vue'

const activeTab = ref('info')
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
