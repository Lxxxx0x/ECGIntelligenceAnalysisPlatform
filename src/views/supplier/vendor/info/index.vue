<script setup>
import { ref, reactive } from 'vue';
import { Search, Refresh, Plus } from '@element-plus/icons-vue';

defineOptions({ name: "VendorInfo" });

const queryParams = reactive({ vendorName: '' });
const tableData = ref([
  { id: 1, code: 'V-001', name: '迈瑞医疗', type: '设备制造商', contact: '张三', phone: '13800001111', status: '合作中' },
  { id: 2, code: 'V-002', name: '理邦仪器', type: '设备制造商', contact: '李四', phone: '13900002222', status: '合作中' },
  { id: 3, code: 'V-003', name: '飞利浦医疗', type: '设备制造商', contact: '王五', phone: '13700003333', status: '合作中' },
  { id: 4, code: 'V-004', name: '通用电气医疗', type: '设备制造商', contact: '赵六', phone: '13600004444', status: '黑名单' },
  { id: 5, code: 'V-005', name: '上海微创', type: '耗材供应商', contact: '陈七', phone: '13500005555', status: '合作中' },
  { id: 6, code: 'V-006', name: '鱼跃医疗', type: '设备制造商', contact: '钱八', phone: '13400006666', status: '中止合作' },
  { id: 7, code: 'V-007', name: '威高集团', type: '耗材供应商', contact: '孙九', phone: '13300007777', status: '合作中' },
  { id: 8, code: 'V-008', name: '雅培医疗', type: '设备制造商', contact: '周十', phone: '13200008888', status: '合作中' },
  { id: 9, code: 'V-009', name: '美敦力', type: '耗材供应商', contact: '吴十一', phone: '13100009999', status: '合作中' },
  { id: 10, code: 'V-010', name: '西门子医疗', type: '设备制造商', contact: '郑十二', phone: '13000000000', status: '合作中' }
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