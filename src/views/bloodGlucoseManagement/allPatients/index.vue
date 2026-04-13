<script setup>
import { ref } from "vue";

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

const tableData = [
  {
    id: 1,
    ward: "心血管外科二病区",
    bedNo: "37",
    patientInfo: "罗平 / 69岁 / 男",
    tag: "高危",
    admissionNo: "2186225",
    admissionDate: "2026-03-10",
    diagnosis: "冠心病，心力衰竭",
    groupStatus: "已纳入",
    hospitalStatus: "在院",
  },
  {
    id: 2,
    ward: "心血管内科一病区",
    bedNo: "040",
    patientInfo: "曾小明 / 62岁 / 男",
    tag: "关注",
    admissionNo: "2191985",
    admissionDate: "2026-03-31",
    diagnosis: "高血压3级，2型糖尿病",
    groupStatus: "未纳入",
    hospitalStatus: "在院",
  },
  {
    id: 3,
    ward: "神经外科二病区",
    bedNo: "16",
    patientInfo: "廖在福 / 63岁 / 男",
    tag: "常规",
    admissionNo: "2180867",
    admissionDate: "2026-03-23",
    diagnosis: "脑出血恢复期",
    groupStatus: "已纳入",
    hospitalStatus: "在院",
  },
  {
    id: 4,
    ward: "妇科二病区",
    bedNo: "22",
    patientInfo: "陈六祥 / 63岁 / 女",
    tag: "常规",
    admissionNo: "2190574",
    admissionDate: "2026-03-26",
    diagnosis: "子宫肌瘤",
    groupStatus: "已纳入",
    hospitalStatus: "在院",
  },
  {
    id: 5,
    ward: "咽喉头颈外科病区",
    bedNo: "18",
    patientInfo: "罗建强 / 56岁 / 男",
    tag: "高危",
    admissionNo: "2190955",
    admissionDate: "2026-03-27",
    diagnosis: "甲状腺恶性肿瘤",
    groupStatus: "已纳入",
    hospitalStatus: "在院",
  },
  {
    id: 6,
    ward: "血液内科三病区",
    bedNo: "024",
    patientInfo: "郑邦贵 / 63岁 / 男",
    tag: "关注",
    admissionNo: "2173912",
    admissionDate: "2026-03-26",
    diagnosis: "急性髓系白血病",
    groupStatus: "未纳入",
    hospitalStatus: "在院",
  },
  {
    id: 7,
    ward: "心血管内科三病区",
    bedNo: "021",
    patientInfo: "陈书 / 55岁 / 男",
    tag: "常规",
    admissionNo: "2185505",
    admissionDate: "2026-03-25",
    diagnosis: "心绞痛",
    groupStatus: "已纳入",
    hospitalStatus: "转出",
  },
  {
    id: 8,
    ward: "内分泌科一病区",
    bedNo: "05",
    patientInfo: "张翠花 / 68岁 / 女",
    tag: "高危",
    admissionNo: "2198833",
    admissionDate: "2026-03-28",
    diagnosis: "2型糖尿病并发症",
    groupStatus: "已纳入",
    hospitalStatus: "在院",
  },
  {
    id: 9,
    ward: "骨科病区",
    bedNo: "12",
    patientInfo: "王建国 / 72岁 / 男",
    tag: "常规",
    admissionNo: "2187742",
    admissionDate: "2026-03-20",
    diagnosis: "股骨颈骨折",
    groupStatus: "未纳入",
    hospitalStatus: "在院",
  },
  {
    id: 10,
    ward: "消化内科",
    bedNo: "28",
    patientInfo: "李梅 / 45岁 / 女",
    tag: "常规",
    admissionNo: "2195566",
    admissionDate: "2026-03-29",
    diagnosis: "急性胰腺炎",
    groupStatus: "已纳入",
    hospitalStatus: "在院",
  },
  {
    id: 11,
    ward: "老年医学科",
    bedNo: "03",
    patientInfo: "刘建华 / 81岁 / 男",
    tag: "高危",
    admissionNo: "2196671",
    admissionDate: "2026-04-01",
    diagnosis: "慢性阻塞性肺疾病，2型糖尿病",
    groupStatus: "已纳入",
    hospitalStatus: "在院",
  },
  {
    id: 12,
    ward: "重症医学科",
    bedNo: "08",
    patientInfo: "陈秀英 / 76岁 / 女",
    tag: "高危",
    admissionNo: "2189902",
    admissionDate: "2026-03-15",
    diagnosis: "重症肺炎合并呼吸衰竭",
    groupStatus: "未纳入",
    hospitalStatus: "在院",
  },
  {
    id: 13,
    ward: "肾内科",
    bedNo: "15",
    patientInfo: "吴志强 / 58岁 / 男",
    tag: "关注",
    admissionNo: "2191123",
    admissionDate: "2026-03-28",
    diagnosis: "慢性肾功能不全尿毒症期",
    groupStatus: "已纳入",
    hospitalStatus: "在院",
  },
  {
    id: 14,
    ward: "呼吸内科",
    bedNo: "42",
    patientInfo: "林素芬 / 64岁 / 女",
    tag: "常规",
    admissionNo: "2184433",
    admissionDate: "2026-03-18",
    diagnosis: "支气管哮喘急性发作",
    groupStatus: "已纳入",
    hospitalStatus: "转出",
  },
  {
    id: 15,
    ward: "急诊抢救室",
    bedNo: "01",
    patientInfo: "周天明 / 45岁 / 男",
    tag: "高危",
    admissionNo: "2198899",
    admissionDate: "2026-04-10",
    diagnosis: "急性广泛前壁心肌梗死",
    groupStatus: "未纳入",
    hospitalStatus: "在院",
  },
];
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
          <el-button type="primary" style="margin-left: 0; background-color: #1DABA6; border-color: #409EFF;">查询</el-button>
          <el-button class="action-btn is-plain">重置</el-button>
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
        <el-table-column prop="ward" label="病区" min-width="140" />
        <el-table-column prop="bedNo" label="床号" width="80" align="center" />
        <el-table-column prop="patientInfo" label="患者信息" width="160" />
        <el-table-column prop="tag" label="标签" width="100" />
        <el-table-column prop="admissionNo" label="住院号" width="120" />
        <el-table-column prop="admissionDate" label="住院日期" width="120" />
        <el-table-column prop="diagnosis" label="住院诊断" min-width="180" />
        <el-table-column prop="groupStatus" label="纳入状态" width="100" />
        <el-table-column prop="hospitalStatus" label="住院状态" width="100" />
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template #default>
            <el-button link class="text-exclude">离床</el-button>
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
