<script setup>
import { ref, reactive } from 'vue';
import { Search, Refresh, Plus } from '@element-plus/icons-vue';

defineOptions({ name: "VendorInfo" });

const queryParams = reactive({ vendorName: '' });
const tableData = ref([
  { id: 1, code: 'V-001', name: '迈瑞医疗', type: '设备制造商', contact: '张三', phone: '13800001111', status: '合作中' },
  { id: 2, code: 'V-002', name: '理邦仪器', type: '设备制造商', contact: '李四', phone: '13900002222', status: '合作中' }
]);

const handleSearch = () => {};
const handleReset = () => { queryParams.vendorName = ''; };
</script>
<template>
  <div class="page-container">
    <div class="search-wrapper">
      <el-form :inline="true">
        <el-form-item label="厂商名称"><el-input v-model="queryParams.vendorName" placeholder="请输入名称" @keyup.enter="handleSearch" /></el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" :icon="Plus">新增厂商</el-button>
    </div>
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column prop="code" label="厂商编号" width="120" />
        <el-table-column prop="name" label="厂商名称" min-width="150" />
        <el-table-column prop="type" label="厂商类型" width="120" />
        <el-table-column prop="contact" label="联系人" width="100" />
        <el-table-column prop="phone" label="联系电话" width="150" />
        <el-table-column prop="status" label="状态" width="100" />
        <el-table-column label="操作" width="150" align="center">
          <template #default><el-button link type="primary" size="small">编辑</el-button></template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-container { padding: 20px; display: flex; flex-direction: column; height: 100%; box-sizing: border-box; background: var(--el-bg-color-overlay); border-radius: 12px; }
.search-wrapper { margin-bottom: 16px; display: flex; justify-content: space-between; }
.table-wrapper { flex: 1; overflow: hidden; }
</style>