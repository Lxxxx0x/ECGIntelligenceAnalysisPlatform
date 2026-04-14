<script setup>
import { ref, reactive } from 'vue';
import { Search, Refresh } from '@element-plus/icons-vue';

defineOptions({ name: "QualityDevice" });

const queryParams = reactive({
  mac: '',
  deviceStatus: ''
});

const mockData = [
  { id: 1, mac: 'ECG-A-001', model: 'M-120', dept: '心内科', checkTime: '2023-09-01', nextCheckTime: '2024-09-01', passRate: '98%', status: '正常' },
  { id: 2, mac: 'ECG-B-023', model: 'H-600', dept: '急诊科', checkTime: '2023-05-15', nextCheckTime: '2023-11-15', passRate: '85%', status: '需校准' },
  { id: 3, mac: 'ECG-A-005', model: 'M-120', dept: '呼吸科', checkTime: '2023-08-10', nextCheckTime: '2024-08-10', passRate: '99%', status: '正常' },
  { id: 4, mac: 'ECG-C-011', model: 'P-100', dept: 'ICU', checkTime: '2022-10-01', nextCheckTime: '2023-10-01', passRate: '70%', status: '报修' },
];

const tableData = ref([...mockData]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(mockData.length);

const handleSearch = () => {
  let res = mockData;
  if (queryParams.mac) {
    res = res.filter(item => item.mac.includes(queryParams.mac) || item.dept.includes(queryParams.mac));
  }
  if (queryParams.deviceStatus) {
    res = res.filter(item => item.status === queryParams.deviceStatus);
  }
  tableData.value = res;
  total.value = res.length;
};

const handleReset = () => {
  queryParams.mac = '';
  queryParams.deviceStatus = '';
  handleSearch();
};
</script>

<template>
  <div class="page-container">
    <div class="search-wrapper">
      <el-form :inline="true" :model="queryParams" class="form-inline">
        <el-form-item label="设备编号">
          <el-input v-model="queryParams.mac" placeholder="设备号/科室" clearable @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="设备状态">
          <el-select v-model="queryParams.deviceStatus" placeholder="请选择状态" clearable style="width: 150px">
            <el-option label="正常" value="正常" />
            <el-option label="需校准" value="需校准" />
            <el-option label="报修" value="报修" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table-wrapper">
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="mac" label="设备编号" width="150" />
        <el-table-column prop="model" label="设备型号" width="120" />
        <el-table-column prop="dept" label="归属科室" width="150" />
        <el-table-column prop="checkTime" label="上次校准时间" width="150" align="center" />
        <el-table-column prop="nextCheckTime" label="下次校准时间" width="150" align="center" />
        <el-table-column prop="passRate" label="数据合格率" width="120" align="center" />
        <el-table-column prop="status" label="当前状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === '报修' ? 'danger' : row.status === '正常' ? 'success' : 'warning'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right" align="center">
          <template #default>
            <el-button type="primary" link size="small">记录详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-wrapper">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  background: var(--el-bg-color-overlay);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  .search-wrapper {
    margin-bottom: 16px;
    padding: 16px;
    background-color: var(--el-fill-color-light);
    border-radius: 8px;
    
    .el-form-item { margin-bottom: 0; }
  }

  .table-wrapper {
    flex: 1;
    overflow: hidden;
  }

  .pagination-wrapper {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>