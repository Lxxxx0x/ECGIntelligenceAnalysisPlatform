<template>
  <div class="integrated-container">
    <el-tabs v-model="activeTab" class="demo-tabs">
      <el-tab-pane label="设备基础台账" name="basicLedger">
        <BasicLedger />
      </el-tab-pane>
      <el-tab-pane label="设备绑定检查" name="binding">
        <DeviceBinding />
      </el-tab-pane>
      <el-tab-pane label="设备维保校准" name="maintenance">
        <DeviceMaintenance />
      </el-tab-pane>
      <el-tab-pane label="设备状态监控" name="status">
        <DeviceStatus />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BasicLedger from './basicLedger/index.vue'
import DeviceBinding from './binding/index.vue'
import DeviceMaintenance from './maintenance/index.vue'
import DeviceStatus from './status/index.vue'

const activeTab = ref('basicLedger')
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
