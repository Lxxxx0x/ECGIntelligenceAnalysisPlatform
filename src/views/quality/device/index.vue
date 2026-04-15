<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Search, Refresh } from '@element-plus/icons-vue';
import { apiEcgDeviceList } from '@/apis/quality/device';

defineOptions({ name: "QualityDevice" });

const queryParams = reactive({
  mac: '',
  deviceStatus: '',
  pageNum: 1,
  pageSize: 20
});

const loading = ref(false);
const tableData = ref([]);
const total = ref(0);

const getList = async () => {
  loading.value = true;
  try {
    const res = await apiEcgDeviceList();
    if (res.success) {
      tableData.value = res.data.list;
      total.value = res.data.total;
      queryParams.pageNum = res.data.pageNum;
      queryParams.pageSize = res.data.pageSize;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  queryParams.pageNum = 1;
  getList();
};

const handleReset = () => {
  queryParams.mac = '';
  queryParams.deviceStatus = '';
  handleSearch();
};

onMounted(() => {
  getList();
});
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
      <el-table v-loading="loading" :data="tableData" border stripe height="100%">
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="mac" label="设备编号" width="150" />
        <el-table-column prop="model" label="设备型号" width="180" />
        <el-table-column prop="dept" label="归属科室" width="150" />
        <el-table-column prop="checkTime" label="上次校准时间" width="180" align="center" />
        <el-table-column prop="nextCheckTime" label="下次校准时间" width="150" align="center" />
        <el-table-column prop="passRate" label="数据合格率" width="120" align="center">
          <template #default="{ row }">
            {{ row.passRate }}%
          </template>
        </el-table-column>
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
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :total="total"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="getList"
        @current-change="getList"
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