<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Search, Refresh } from '@element-plus/icons-vue';
import { apiEcgQualityList } from '@/apis/quality/data';

defineOptions({ name: "QualityData" });

const queryParams = reactive({
  patientId: '',
  qualityLevel: '',
  pageNum: 1,
  pageSize: 20
});

const loading = ref(false);
const tableData = ref([]);
const total = ref(0);

const getList = async () => {
  loading.value = true;
  try {
    const res = await apiEcgQualityList();
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
  queryParams.patientId = '';
  queryParams.qualityLevel = '';
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
        <el-form-item label="患者信息">
          <el-input v-model="queryParams.patientId" placeholder="姓名/病历号" clearable @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="质量等级">
          <el-select v-model="queryParams.qualityLevel" placeholder="请选择等级" clearable style="width: 150px">
            <el-option label="A" value="A" />
            <el-option label="B" value="B" />
            <el-option label="C" value="C" />
            <el-option label="D" value="D" />
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
        <el-table-column prop="patientId" label="病历号" width="120" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="recordTime" label="采集时间" width="180" />
        <el-table-column prop="type" label="设备类型" width="120" align="center" />
        <el-table-column prop="score" label="AI质控评分" width="100" align="center">
          <template #default="{ row }">
            <span :class="{'text-danger': row.score < 60}">{{ row.score }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="质量等级" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="['D', 'C'].includes(row.level) ? 'danger' : row.level === 'A' ? 'success' : 'warning'">
              {{ row.level }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="issues" label="缺陷分析" min-width="180" show-overflow-tooltip />
        <el-table-column prop="status" label="处理状态" width="100" align="center" />
        <el-table-column label="操作" width="120" fixed="right" align="center">
          <template #default>
            <el-button type="primary" link size="small">详情</el-button>
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
    .text-danger { color: var(--el-color-danger); font-weight: bold; }
  }

  .pagination-wrapper {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>