<script setup>
import { ref, reactive, onMounted } from "vue";
import { apiAllPatients } from "@/apis/bloodGlucoseManagement/allPatients";

defineOptions({
  name: "WarningList",
});

const searchForm = ref({
  ward: "",
  patient: "",
  patientTag: "",
  groupStatus: "",
  hospitalStatus: "",
  dateRange: [],
});

const loading = ref(false);
const tableData = ref([]);
const total = ref(0);
const queryParams = reactive({
  pageNum: 1,
  pageSize: 20
});

const getList = async () => {
  loading.value = true;
  try {
    const res = await apiAllPatients();
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

onMounted(() => {
  getList();
});
</script>

<template>
  <div class="content">
    <!-- Filter Section -->
    <div class="filter-section">
      <div class="filter-row">
        <div class="filter-item">
          <span class="label" style="color: #606266; font-size: 14px; margin-right: 8px;">当前病区:</span>
          <el-select v-model="searchForm.ward" placeholder="全部病区" style="width: 150px">
            <el-option label="全部病区" value="" />
          </el-select>
        </div>
        <div class="filter-item">
          <el-input
            v-model="searchForm.patient"
            placeholder="患者姓名/床号/住院号"
            style="width: 200px"
          />
        </div>
        <div class="filter-item">
          <el-select v-model="searchForm.patientTag" placeholder="患者标签" style="width: 140px">
            <el-option label="患者标签" value="" />
          </el-select>
        </div>
        <div class="filter-item">
          <el-select v-model="searchForm.groupStatus" placeholder="入组状态" style="width: 140px">
            <el-option label="入组状态" value="" />
          </el-select>
        </div>
        <div class="filter-item">
          <el-select v-model="searchForm.hospitalStatus" placeholder="住院状态" style="width: 140px">
            <el-option label="住院状态" value="" />
          </el-select>
        </div>
      </div>

      <div class="filter-row actions-row">
        <div class="left-actions" style="display: flex; gap: 12px; align-items: center;">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 260px"
            clearable
          />
          <el-button type="primary" style="margin-left: 0; background-color: var(--el-color-primary); border-color: var(--el-color-primary);">查询</el-button>
          <el-button class="action-btn is-plain">重置</el-button>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-card">
      <el-table
        v-loading="loading"
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
        <el-table-column prop="ward" label="病区" min-width="140" />
        <el-table-column prop="bedNo" label="床号" width="80" align="center" />
        <el-table-column prop="patientInfo" label="患者信息" width="160" />
        <el-table-column prop="tag" label="标签" width="100">
          <template #default="{ row }">
            <el-tag
              :type="
                row.tag === '重点关注'
                  ? 'danger'
                  : row.tag === '一般关注'
                  ? 'warning'
                  : 'success'
              "
              size="small"
            >
              {{ row.tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="admissionNo" label="住院号" width="120" />
        <el-table-column prop="admissionDate" label="住院日期" width="120">
          <template #default="{ row }">
            {{ row.admissionDate || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="diagnosis" label="住院诊断" min-width="180" />
        <el-table-column prop="groupStatus" label="纳入状态" width="100" />
        <el-table-column prop="hospitalStatus" label="住院状态" width="100" />
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template #default>
            <el-button link class="text-exclude">离床</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="queryParams.pageNum"
          v-model:page-size="queryParams.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="getList"
          @current-change="getList"
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
    overflow: hidden;
    border: 1px solid #f0f2f5;
    border-radius: 8px;
    display: flex;
    flex-direction: column;

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
      border-top: 1px solid #ebeef5;
      background-color: #fff;
    }
  }
}
</style>
