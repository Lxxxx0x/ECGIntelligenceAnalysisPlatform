<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Search, Refresh } from '@element-plus/icons-vue';
import { apiEcgReportList } from '@/apis/quality/report';

defineOptions({ name: "QualityReport" });

const queryParams = reactive({
  doctor: '',
  resultType: '',
  pageNum: 1,
  pageSize: 20
});

const loading = ref(false);
const tableData = ref([]);
const total = ref(0);

const getList = async () => {
  loading.value = true;
  try {
    const res = await apiEcgReportList();
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
  queryParams.doctor = '';
  queryParams.resultType = '';
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
        <el-form-item label="报告检索">
          <el-input v-model="queryParams.doctor" placeholder="报告编号/初诊医生" clearable @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="质控结果">
          <el-select v-model="queryParams.resultType" placeholder="请选择类型" clearable style="width: 150px">
            <el-option label="已审核" value="已审核" />
            <el-option label="诊断异常" value="诊断异常" />
            <el-option label="未审核" value="未审核" />
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
        <el-table-column prop="reportId" label="报告单号" width="160" />
        <el-table-column prop="patient" label="患者姓名" width="100" />
        <el-table-column prop="doctor" label="初诊医生" width="120" />
        <el-table-column prop="reviewer" label="复核/抽检人" width="120">
          <template #default="{ row }">
            {{ row.reviewer || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="score" label="报告得分" width="100" align="center">
          <template #default="{ row }">
            <span :class="{'text-danger': row.score < 90}">{{ row.score }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="质控结论" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === '已审核' ? 'success' : row.status === '未审核' ? 'warning' : 'danger'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="errorType" label="缺陷类型" min-width="150" show-overflow-tooltip />
        <el-table-column prop="time" label="质控时间" width="180" align="center" />
        <el-table-column label="操作" width="120" fixed="right" align="center">
          <template #default>
            <el-button type="primary" link size="small">申诉/查看</el-button>
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