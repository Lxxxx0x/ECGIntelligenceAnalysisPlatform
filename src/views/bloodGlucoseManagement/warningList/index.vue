<script setup>
import { ref } from "vue";

defineOptions({
  name: "WarningList",
});

const searchForm = ref({
  ward: "",
  patient: "",
  dateRange: [],
  status: "全部",
  indexName: "",
  condition: "",
  excludeWard: "",
});

const tableData = [
  {
    id: 1,
    warningTime: "2026-04-01 07:58:32",
    patientInfo: "罗平 / 69岁 / 男",
    admissionNo: "2186225",
    ward: "心血管外科二病区",
    wardPhone: "073185295102",
    bedNo: "37",
    admissionDate: "2026-03-10",
    indexName: "重型(指尖/男)",
    details: "随机 (17.8)\n晚餐后 (14.2)",
  },
  {
    id: 2,
    warningTime: "2026-03-31 23:16:07",
    patientInfo: "曾小明 / 62岁 / 男",
    admissionNo: "2191985",
    ward: "心血管内科一病区",
    wardPhone: "073185295106",
    bedNo: "040",
    admissionDate: "2026-03-31",
    indexName: "重型(指尖/男)",
    details: "随机 (15.5)\n晚餐后 (13.8)",
  },
  {
    id: 3,
    warningTime: "2026-03-31 22:32:07",
    patientInfo: "廖在福 / 63岁 / 男",
    admissionNo: "2180867",
    ward: "神经外科二病区",
    wardPhone: "073185295110",
    bedNo: "16",
    admissionDate: "2026-03-23",
    indexName: "重型(指尖/男)",
    details: "Q2h (18.1)\nQ2h (17.5)\n午餐后 (16.2)",
  },
  {
    id: 4,
    warningTime: "2026-03-31 21:59:04",
    patientInfo: "陈六祥 / 63岁 / 女",
    admissionNo: "2190574",
    ward: "妇科二病区",
    wardPhone: "073185295119",
    bedNo: "22",
    admissionDate: "2026-03-26",
    indexName: "重型(指尖/女)",
    details: "随机 (19.4)",
  },
  {
    id: 5,
    warningTime: "2026-03-31 21:45:04",
    patientInfo: "罗建强 / 56岁 / 男",
    admissionNo: "2190955",
    ward: "咽喉头颈外科病区",
    wardPhone: "073185296133",
    bedNo: "18",
    admissionDate: "2026-03-27",
    indexName: "重型(指尖/男)",
    details: "晚餐后 (14.5)",
  },
  {
    id: 6,
    warningTime: "2026-03-31 21:22:05",
    patientInfo: "郑邦贵 / 63岁 / 男",
    admissionNo: "2173912",
    ward: "血液内科三病区",
    wardPhone: "073185295196",
    bedNo: "024",
    admissionDate: "2026-03-26",
    indexName: "重型(指尖/男)",
    details: "晚餐后 (18.1)\n午餐后 (14.5)",
  },
  {
    id: 7,
    warningTime: "2026-03-31 21:06:44",
    patientInfo: "陈书 / 55岁 / 男",
    admissionNo: "2185505",
    ward: "心血管内科三病区",
    wardPhone: "073185295186",
    bedNo: "021",
    admissionDate: "2026-03-25",
    indexName: "重型(指尖/男)",
    details: "晚餐后 (16.2)",
  },
  {
    id: 8,
    warningTime: "2026-03-31 20:30:12",
    patientInfo: "张翠花 / 68岁 / 女",
    admissionNo: "2198833",
    ward: "内分泌科一病区",
    wardPhone: "073185295108",
    bedNo: "05",
    admissionDate: "2026-03-28",
    indexName: "重型(静脉/女)",
    details: "空腹 (12.4)\n餐后 (16.8)",
  },
  {
    id: 9,
    warningTime: "2026-03-31 19:45:33",
    patientInfo: "王建国 / 72岁 / 男",
    admissionNo: "2187742",
    ward: "骨科病区",
    wardPhone: "073185295115",
    bedNo: "12",
    admissionDate: "2026-03-20",
    indexName: "重型(指尖/男)",
    details: "随机 (18.5)",
  },
  {
    id: 10,
    warningTime: "2026-03-31 18:12:09",
    patientInfo: "李梅 / 45岁 / 女",
    admissionNo: "2195566",
    ward: "消化内科",
    wardPhone: "073185295111",
    bedNo: "28",
    admissionDate: "2026-03-29",
    indexName: "重型(指尖/女)",
    details: "晚餐前 (3.8)",
  },
];
</script>

<template>
  <div class="content">
    <!-- Filter Section -->
    <div class="filter-section">
      <div class="filter-row">
        <div class="filter-item">
          <span class="label">当前病区:</span>
          <el-select v-model="searchForm.ward" placeholder="全部病区" style="width: 140px">
            <el-option label="全部病区" value="" />
            <el-option label="心血管外科二病区" value="1" />
            <el-option label="神经外科二病区" value="2" />
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
          <el-select v-model="searchForm.indexName" placeholder="指标名称" style="width: 120px">
            <el-option label="指标名称" value="" />
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
          <el-button type="primary" class="export-btn">查询</el-button>
          <el-button class="action-btn is-plain">重置</el-button>
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
        <el-table-column prop="ward" label="病区" min-width="160" />
        <el-table-column prop="wardPhone" label="病区电话" width="140" />
        <el-table-column prop="bedNo" label="床号" width="80" align="center" />
        <el-table-column prop="admissionDate" label="住院日期" width="120" />
        <el-table-column prop="indexName" label="指标名称" width="140" />
        <el-table-column label="异常详情" width="140">
          <template #default="{ row }">
            <div class="multiline-cell" style="text-align: left; color: #666">
              {{ row.details }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center" fixed="right">
          <template #default>
            <el-button link class="text-include">纳入</el-button>
            <el-button link class="text-exclude">不纳入</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  background: #fff;
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
            color: #666;
            margin: 0;
            border-radius: 4px;

            &.active {
              background-color: #1daba6;
              color: #fff;
            }
          }
        }
      }

      :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 1px #dcdfe6 inset;

        &:hover {
          box-shadow: 0 0 0 1px #1daba6 inset;
        }

        &.is-focus {
          box-shadow: 0 0 0 1px #1daba6 inset;
        }
      }
    }

    .actions-row {
      justify-content: space-between;
      margin-bottom: 0;

      .left-actions {
        .export-btn {
          margin-left: 12px;
          background-color: #1daba6;
          border-color: #1daba6;
        }
      }

      .right-actions {
        display: flex;
        align-items: center;
        gap: 12px;

        span {
          font-size: 13px;
          color: #999;
          margin-right: 12px;
        }

        .action-btn {
          background-color: #1daba6;
          border-color: #1daba6;
          color: #fff;

          &.is-plain {
            background-color: #fff;
            border-color: #dcdfe6;
            color: #606266;

            &:hover {
              color: #1daba6;
              border-color: #1daba6;
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

    :deep(.el-table) {
      height: 100%;

      .multiline-cell {
        white-space: pre-line;
        line-height: 1.5;
        font-size: 13px;
        color: #606266;
      }

      .text-include {
        color: #1daba6;
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
  }
}
</style>
