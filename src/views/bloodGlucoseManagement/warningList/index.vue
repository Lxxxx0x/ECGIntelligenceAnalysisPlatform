<script setup>
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { apiSearchWarningList, apiDepartmentList, apiDictIndexList, apiIncludeWarning } from "@/apis/bloodGlucoseManagement/warningList.js";

const searchForm = ref({
  ward: "",
  patient: "",
  dateRange: [],
  status: "全部",
  indexName: "",
  condition: "",
  excludeWard: "",
});

const tableData = ref([]); // 列表内容
const departmentList = ref([]);// 病区列表
const indexList = ref([]); // 指标列表

const pageNum = ref(1);
const pageSize = ref(20);
const total = ref(0);

// 获取列表内容
const getList = async () => {
  try {
    const params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      status: searchForm.value.status === '全部' ? 'ALL' : searchForm.value.status,
    };
    
    if (searchForm.value.ward) params.wardId = searchForm.value.ward;
    if (searchForm.value.patient) params.patientKeyword = searchForm.value.patient;
    if (searchForm.value.indexName) params.indexName = searchForm.value.indexName;
    if (searchForm.value.dateRange && searchForm.value.dateRange.length === 2) {
      // 假设 dateRange 是 Date 数组，如果是字符串需按需格式化
      const start = new Date(searchForm.value.dateRange[0]);
      const end = new Date(searchForm.value.dateRange[1]);
      params.startDate = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`;
      params.endDate = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`;
    }

    const res = await apiSearchWarningList(params);
    if (res.code === 200) {
      tableData.value = res.data.list;
      total.value = res.data.total;
    }
  } catch (error) {
    console.error(error);
  }
};

const handleSearch = () => {
  pageNum.value = 1;
  getList();
};

const handleReset = () => {
  searchForm.value = {
    ward: "",
    patient: "",
    dateRange: [],
    status: "全部",
    indexName: "",
    condition: "",
    excludeWard: "",
  };
  handleSearch();
};

const handleSizeChange = (val) => {
  pageSize.value = val;
  getList();
};

const handleCurrentChange = (val) => {
  pageNum.value = val;
  getList();
};

// 获取病区列表
const getDepartments = async () => {
  try {
    const res = await apiDepartmentList();
    if (res.code === 200) {
      departmentList.value = res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

// 获取指标列表
const getIndexes = async () => {
  try {
    const res = await apiDictIndexList();
    if (res.code === 200) {
      indexList.value = res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

// 纳入操作
const handleInclude = async (row) => {
  try {
    await ElMessageBox.confirm(`确定要将患者 ${row.patientInfo || ''} 纳入管理吗？`, '系统提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    const res = await apiIncludeWarning(row.warningId);
    if (res.code === 200 && res.success) {
      ElMessage.success('已成功纳入');
      getList();
    } else {
      ElMessage.error(res.message || '纳入失败');
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error);
    }
  }
};

onMounted(() => {
  getList();
  getDepartments();
  getIndexes();
});
</script>

<template>
  <div class="content">
    <!-- Filter Section -->
    <div class="filter-section">
      <div class="filter-row">
        <div class="filter-item">
          <span class="label">当前病区:</span>
          <el-select v-model="searchForm.ward" placeholder="请选择病区" style="width: 140px">
            <el-option
              v-for="dept in departmentList"
              :key="dept.departmentId"
              :label="dept.departmentName"
              :value="dept.departmentId"
            />
          </el-select>
        </div>
        <div class="filter-item">
          <el-input
            v-model="searchForm.patient"
            placeholder="患者姓名/住院号"
            style="width: 200px"
          />
        </div>
        <div class="filter-item">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 240px"
          />
        </div>
        <div class="filter-item tabs">
          <el-button
            :class="['tab-btn', { active: searchForm.status === '全部' }]"
            @click="searchForm.status = '全部'"
          >
            全部
          </el-button>
          <el-button
            :class="['tab-btn', { active: searchForm.status === '危急' }]"
            @click="searchForm.status = '危急'"
          >
            危急
          </el-button>
          <el-button
            :class="['tab-btn', { active: searchForm.status === '异常' }]"
            @click="searchForm.status = '异常'"
          >
            异常
          </el-button>
        </div>
        <div class="filter-item">
          <el-select v-model="searchForm.indexName" placeholder="请选择指标" style="width: 120px">
            <el-option label="全部指标" value="" />
            <el-option
              v-for="item in indexList"
              :key="item.indexCode"
              :label="item.indexName"
              :value="item.indexName"
            />
          </el-select>
        </div>
        <div class="filter-item">
          <el-select v-model="searchForm.condition" placeholder="大于" style="width: 80px">
            <el-option label="大于" value=">" />
            <el-option label="小于" value="<" />
          </el-select>
        </div>
      </div>

      <div class="filter-row actions-row">
        <div class="left-actions">
          过滤病区:
          <el-input
            v-model="searchForm.excludeWard"
            placeholder="不显示所选病区的患者"
            style="width: 450px"
          />
          <el-button type="primary" class="export-btn" @click="handleSearch">查询</el-button>
          <el-button class="action-btn is-plain" @click="handleReset">重置</el-button>
        </div>
        <div class="right-actions">
          <el-button type="primary" class="action-btn">导出(旧)</el-button>
          <el-button type="primary" class="action-btn">导出预警</el-button>
          <el-button type="primary" class="action-btn">导出精准</el-button>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-card">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{
          background: '#f8f8f8',
          color: '#909399',
          fontWeight: 'normal',
          borderBottom: 'none',
          padding: '12px 0',
        }"
        :row-style="{ padding: '12px 0' }"
      >
        <el-table-column label="预警时间" width="120">
          <template #default="{ row }">
            <div class="multiline-cell">{{ row.warningTime.replace(" ", "\n") }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="patientInfo" label="患者信息" width="160" />
        <el-table-column prop="admissionNo" label="住院号" width="120" />
        <el-table-column prop="wardInfo.wardName" label="病区" min-width="160" />
        <el-table-column prop="wardInfo.wardPhone" label="病区电话" width="140" />
        <el-table-column prop="bedNo" label="床号" width="80" align="center" />
        <el-table-column prop="admissionDate" label="住院日期" width="120" />
        <el-table-column prop="index.indexName" label="指标名称" width="140" />
        <el-table-column label="异常详情" width="140">
          <template #default="{ row }">
            <div class="multiline-cell" style="text-align: left; color: var(--el-text-color-regular)">
              {{ row.detailsText }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center" fixed="right">
          <template #default="{ row }">
            <el-button link class="text-include" @click="handleInclude(row)">纳入</el-button>
            <el-button link class="text-exclude">不纳入</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]" 
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  background: var(--el-bg-color-overlay);
  border-radius: 16px;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* Filter Area */
  .filter-section {
    margin-bottom: 20px;

    .filter-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;

      .filter-item {
        display: flex;
        align-items: center;

        .label {
          font-size: 14px;
          color: #606266;
          margin-right: 8px;
        }

        &.tabs {
          display: flex;
          background-color: #f5f7f9;
          border-radius: 4px;
          padding: 2px;

          .tab-btn {
            border: none;
            background: transparent;
            padding: 6px 16px;
            font-size: 13px;
            color: var(--el-text-color-regular);
            margin: 0;
            border-radius: 4px;

            &.active {
              background-color: var(--el-color-primary);
              color: #fff;
            }
          }
        }
      }

      :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 1px #dcdfe6 inset;

        &:hover {
          box-shadow: 0 0 0 1px var(--el-color-primary) inset;
        }

        &.is-focus {
          box-shadow: 0 0 0 1px var(--el-color-primary) inset;
        }
      }
    }

    .actions-row {
      justify-content: space-between;
      margin-bottom: 0;

      .left-actions {
        .export-btn {
          margin-left: 12px;
          background-color: var(--el-color-primary);
          border-color: var(--el-color-primary);
        }
      }

      .right-actions {
        display: flex;
        align-items: center;
        gap: 12px;

        span {
          font-size: 13px;
          color: var(--el-text-color-secondary);
          margin-right: 12px;
        }

        .action-btn {
          background-color: var(--el-color-primary);
          border-color: var(--el-color-primary);
          color: #fff;

          &.is-plain {
            background-color: var(--el-bg-color-overlay);
            border-color: #dcdfe6;
            color: #606266;

            &:hover {
              color: var(--el-color-primary);
              border-color: var(--el-color-primary);
            }
          }
        }
      }
    }
  }

  /* Table Area */
  .table-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid #f0f2f5;
    border-radius: 8px;

    :deep(.el-table) {
      flex: 1;
      height: 100%;

      .multiline-cell {
        white-space: pre-line;
        line-height: 1.5;
        font-size: 13px;
        color: #606266;
      }

      .text-include {
        color: var(--el-color-primary);
        font-size: 13px;
        font-weight: 500;

        &:hover {
          opacity: 0.8;
        }
      }

      .text-exclude {
        color: #f56c6c;
        font-size: 13px;
        font-weight: 500;
        margin-left: 12px;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    .pagination-container {
      display: flex;
      justify-content: flex-end;
      padding: 16px;
      background-color: var(--el-bg-color-overlay);
      border-top: 1px solid #f0f2f5;
    }
  }
}
</style>
