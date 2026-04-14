<script setup>
import { ref, reactive } from 'vue';
import { Search, Refresh } from '@element-plus/icons-vue';

defineOptions({ name: "QualityData" });

const queryParams = reactive({
  patientId: '',
  qualityLevel: ''
});

const mockData = [
  { id: 1, patientId: 'P001', name: '张三', recordTime: '2023-10-10 08:00:00', type: '12导联', score: 95, level: '优秀', issues: '无', status: '已质控' },
  { id: 2, patientId: 'P002', name: '李四', recordTime: '2023-10-10 08:30:00', type: '动态心电', score: 65, level: '及格', issues: '基线漂移', status: '待复核' },
  { id: 3, patientId: 'P003', name: '王五', recordTime: '2023-10-10 09:15:00', type: '12导联', score: 85, level: '良好', issues: '轻微肌电干扰', status: '已质控' },
  { id: 4, patientId: 'P004', name: '赵六', recordTime: '2023-10-10 10:20:00', type: '单导联', score: 45, level: '不合格', issues: '电极脱落, 伪差严重', status: '需重测' },
];

const tableData = ref([...mockData]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(mockData.length);

const handleSearch = () => {
  let res = mockData;
  if (queryParams.patientId) {
    res = res.filter(item => item.patientId.includes(queryParams.patientId) || item.name.includes(queryParams.patientId));
  }
  if (queryParams.qualityLevel) {
    res = res.filter(item => item.level === queryParams.qualityLevel);
  }
  tableData.value = res;
  total.value = res.length;
};

const handleReset = () => {
  queryParams.patientId = '';
  queryParams.qualityLevel = '';
  handleSearch();
};
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
            <el-option label="优秀" value="优秀" />
            <el-option label="良好" value="良好" />
            <el-option label="及格" value="及格" />
            <el-option label="不合格" value="不合格" />
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
            <el-tag :type="row.level === '不合格' ? 'danger' : row.level === '优秀' ? 'success' : 'warning'">
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
    .text-danger { color: var(--el-color-danger); font-weight: bold; }
  }

  .pagination-wrapper {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>