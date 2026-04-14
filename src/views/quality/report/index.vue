<script setup>
import { ref, reactive } from 'vue';
import { Search, Refresh } from '@element-plus/icons-vue';

defineOptions({ name: "QualityReport" });

const queryParams = reactive({
  doctor: '',
  resultType: ''
});

const mockData = [
  { id: 1, reportId: 'R20231010001', patient: '张三', doctor: '李医生', reviewer: '张主任', score: 100, errorType: '无', time: '2023-10-10 14:00', status: '合格' },
  { id: 2, reportId: 'R20231010002', patient: '李四', doctor: '赵飞', reviewer: '张主任', score: 80, errorType: '描述不规范', time: '2023-10-10 15:30', status: '缺陷' },
  { id: 3, reportId: 'R20231010003', patient: '王五', doctor: '李医生', reviewer: '张主任', score: 60, errorType: '漏诊(轻度)', time: '2023-10-11 09:15', status: '不合格' },
  { id: 4, reportId: 'R20231010004', patient: '赵六', doctor: '王医生', reviewer: '专家组', score: 0, errorType: '重大误诊', time: '2023-10-11 11:20', status: '重大差错' },
];

const tableData = ref([...mockData]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(mockData.length);

const handleSearch = () => {
  let res = mockData;
  if (queryParams.doctor) {
    res = res.filter(item => item.doctor.includes(queryParams.doctor) || item.reportId.includes(queryParams.doctor));
  }
  if (queryParams.resultType) {
    res = res.filter(item => item.status === queryParams.resultType);
  }
  tableData.value = res;
  total.value = res.length;
};

const handleReset = () => {
  queryParams.doctor = '';
  queryParams.resultType = '';
  handleSearch();
};
</script>

<template>
  <div class="page-container">
    <div class="search-wrapper">
      <el-form :inline="true" :model="queryParams" class="form-inline">
        <el-form-item label="报告检索">
          <el-input v-model="queryParams.doctor" placeholder="报告编号/初诊医生" clearable @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="质控结果">
          <el-select v-model="queryParams.resultType" placeholder="请选择类型" clearable style="width: 150px">
            <el-option label="合格" value="合格" />
            <el-option label="缺陷" value="缺陷" />
            <el-option label="不合格" value="不合格" />
            <el-option label="重大差错" value="重大差错" />
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
        <el-table-column prop="reportId" label="报告单号" width="160" />
        <el-table-column prop="patient" label="患者姓名" width="100" />
        <el-table-column prop="doctor" label="初诊医生" width="120" />
        <el-table-column prop="reviewer" label="复核/抽检人" width="120" />
        <el-table-column prop="score" label="报告得分" width="100" align="center">
          <template #default="{ row }">
            <span :class="{'text-danger': row.score < 90}">{{ row.score }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="质控结论" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === '合格' ? 'success' : row.status === '缺陷' ? 'warning' : 'danger'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="errorType" label="缺陷类型" min-width="150" show-overflow-tooltip />
        <el-table-column prop="time" label="质控时间" width="160" align="center" />
        <el-table-column label="操作" width="120" fixed="right" align="center">
          <template #default>
            <el-button type="primary" link size="small">申诉/查看</el-button>
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