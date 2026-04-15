<template>
  <div class="integrated-container">
    <el-tabs v-model="activeTab" class="demo-tabs">
      <el-tab-pane label="厂商信息管理" name="info">
        <VendorInfo />
      </el-tab-pane>
      <el-tab-pane label="厂商资质管理" name="qualifications">
        <VendorQualifications />
      </el-tab-pane>
      <el-tab-pane label="厂商设备台账" name="deviceLedger">
        <VendorDeviceLedger />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VendorInfo from './info/index.vue'
import VendorQualifications from './qualifications/index.vue'
import VendorDeviceLedger from './deviceLedger/index.vue'

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
/* 解决子组件内如果本身有内边距和背景色，可能会导致双重背景边距的问题 */
:deep(.el-tab-pane > div) {
  box-shadow: none !important;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
