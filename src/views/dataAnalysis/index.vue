<script setup>
import { ref, onMounted, nextTick } from "vue";
import * as echarts from "echarts";

defineOptions({
  name: "DataAnalysisIndex",
});

const genderChartRef = ref(null);
const ageChartRef = ref(null);
const warningChartRef = ref(null);
const glucoseChartRef1 = ref(null);
const glucoseChartRef2 = ref(null);
const abnormalChartRef = ref(null);

const activeGlucoseTab = ref("managed");
let glChart1Instance = null;
let glChart2Instance = null;

const switchGlucoseTab = (tab) => {
  activeGlucoseTab.value = tab;
  nextTick(() => {
    if (tab === "managed" && glChart1Instance) glChart1Instance.resize();
    if (tab === "hospital" && glChart2Instance) glChart2Instance.resize();
  });
};

onMounted(() => {
  // Gender Doughnut Chart
  const genderChart = echarts.init(genderChartRef.value);
  genderChart.setOption({
    tooltip: { trigger: "item" },
    color: ["#f29c38", "#1DABA6"],
    series: [
      {
        type: "pie",
        radius: [15, 50],
        center: ["50%", "50%"],
        roseType: "radius",
        itemStyle: { borderRadius: 5 },
        avoidLabelOverlap: false,
        label: { show: false },
        data: [
          { value: 45, name: "女" },
          { value: 55, name: "男" },
        ],
      },
    ],
  });

  // Age Horizontal Bar Chart
  const ageChart = echarts.init(ageChartRef.value);
  ageChart.setOption({
    grid: { top: 10, bottom: 20, left: 50, right: 20 },
    xAxis: { type: "value", show: false },
    yAxis: {
      type: "category",
      data: ["18以下", "18-25", "25-35", "35-50", "50以上"],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#555" },
    },
    series: [
      {
        type: "bar",
        barWidth: 10,
        itemStyle: { color: "#1DABA6", borderRadius: 5 },
        data: [5, 10, 15, 40, 80],
      },
    ],
  });

  // Warning Horizontal Bar Chart (Left Bottom)
  const warningChart = echarts.init(warningChartRef.value);
  warningChart.setOption({
    grid: { top: 10, bottom: 20, left: 90, right: 20 },
    xAxis: { type: "value", show: false },
    yAxis: {
      type: "category",
      data: [
        "心血管科三病区",
        "胃内科三病区",
        "神经病学科三病区",
        "妇科二病区",
        "胃内科一病区",
        "心血管内科一病区",
        "脊柱外科二病区",
        "耳科病区",
      ],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#555", fontSize: 10 },
    },
    series: [
      {
        type: "bar",
        barWidth: 8,
        itemStyle: { color: "#1DABA6", borderRadius: 4 },
        label: { show: true, position: "right", color: "#555", fontSize: 10 },
        data: [2, 2, 2, 2, 3, 3, 4, 5],
      },
    ],
  });

  // Glucose Doughnut 1
  glChart1Instance = echarts.init(glucoseChartRef1.value);
  glChart1Instance.setOption({
    color: ["#f29c38", "#1DABA6", "#909399"],
    tooltip: { trigger: "item", formatter: "{b} : {c}%" },
    series: [
      {
        type: "pie",
        radius: [10, 35],
        center: ["50%", "50%"],
        roseType: "radius",
        itemStyle: { borderRadius: 4 },
        label: { show: false },
        data: [
          { value: 40.56, name: "高血糖" },
          { value: 58.67, name: "正常血糖" },
          { value: 0.76, name: "低血糖" },
        ],
      },
    ],
  });

  // Glucose Doughnut 2
  glChart2Instance = echarts.init(glucoseChartRef2.value);
  glChart2Instance.setOption({
    color: ["#f29c38", "#1DABA6", "#909399"],
    tooltip: { trigger: "item", formatter: "{b} : {c}%" },
    series: [
      {
        type: "pie",
        radius: [10, 35],
        center: ["50%", "50%"],
        roseType: "radius",
        itemStyle: { borderRadius: 4 },
        label: { show: false },
        data: [
          { value: 44.29, name: "高血糖" },
          { value: 44.29, name: "正常血糖" },
          { value: 11.43, name: "低血糖" },
        ],
      },
    ],
  });

  // Abnormal Horizontal Bar Chart (Right Bottom)
  const abChart = echarts.init(abnormalChartRef.value);
  abChart.setOption({
    grid: { top: 10, bottom: 20, left: 100, right: 20 },
    xAxis: { type: "value", show: false },
    yAxis: {
      type: "category",
      data: [
        "肾内科四病区",
        "皮肤性病科病区",
        "呼吸与危重症二病区",
        "心血管内科三病区",
        "老年病科二病区",
        "心血管内科四病区",
        "神经病学科三病区",
        "老年病科大病区",
      ],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#555", fontSize: 10 },
    },
    series: [
      {
        type: "bar",
        barWidth: 8,
        itemStyle: { color: "#1DABA6", borderRadius: 4 },
        label: { show: true, position: "right", color: "#555", fontSize: 10 },
        data: [9, 9, 9, 9, 9, 10, 10, 15],
      },
    ],
  });

  window.addEventListener("resize", () => {
    genderChart.resize();
    ageChart.resize();
    warningChart.resize();
    if (glChart1Instance) glChart1Instance.resize();
    if (glChart2Instance) glChart2Instance.resize();
    abChart.resize();
  });
});

const activeWards = [
  { name: "血管外科二病区", count: 2 },
  { name: "泌尿外科二病区", count: 2 },
  { name: "口腔颌面外科监护", count: 2 },
  { name: "普外科四病区", count: 2 },
  { name: "感染科一病区", count: 2 },
  { name: "口腔颌面外科一病...", count: 2 },
  { name: "普外三病区", count: 1 },
  { name: "骨脏移植科重症监...", count: 1 },
  { name: "咽喉头颈外科病区", count: 1 },
  { name: "血管外科一病区", count: 1 },
  { name: "放射介入科病区", count: 1 },
  { name: "老年监护室", count: 1 },
  { name: "血液内科三病区", count: 1 },
  { name: "神经外科一病区", count: 1 },
  { name: "鼻科病区", count: 1 },
  { name: "口腔颌面外科二病...", count: 1 },
  { name: "普外四病区", count: 1 },
  { name: "脊柱外科二病区", count: 1 },
  { name: "急诊病房", count: 1 },
  { name: "皮肤性病科病区", count: 1 },
];

const patientLists = [
  {
    label: "24h高血糖人数",
    value: 313,
    data: [
      { info: "周金连/女/61岁", dept: "临床心理二病区...", bed: "", abnormal: "餐前 (15.4)" },
      { info: "罗平/男/69岁", dept: "心血管外科二病区", bed: "37", abnormal: "随机 (12.8)" },
      { info: "张建国/男/55岁", dept: "内分泌科一病区", bed: "15", abnormal: "餐后 (14.2)" },
      { info: "李梅/女/42岁", dept: "普外三病区", bed: "08", abnormal: "空腹 (13.5)" },
      { info: "王强/男/78岁", dept: "重症监护室", bed: "01", abnormal: "随机 (18.1)" },
    ],
  },
  {
    label: "今日血糖预警人数",
    value: 61,
    data: [
      { info: "罗平/男/69岁", dept: "心血管外科二病区", bed: "37", abnormal: "重度偏高 (17.8)" },
      { info: "肖双喜/男/72岁", dept: "普外一病区", bed: "39", abnormal: "重度偏高 (20.2)" },
      { info: "陈秀兰/女/65岁", dept: "妇科一病区", bed: "22", abnormal: "中度偏高 (15.5)" },
      { info: "赵铁柱/男/60岁", dept: "骨科病区", bed: "11", abnormal: "中度偏高 (16.8)" },
      { info: "孙丽/女/38岁", dept: "消化内科", bed: "09", abnormal: "重度偏高 (19.1)" },
    ],
  },
  {
    label: "血糖预警超标未管人数",
    value: 1531,
    data: [
      { info: "周金连/女/61岁", dept: "临床心理二病区", bed: "", abnormal: "空腹 (17.8)" },
      { info: "马报国/男/69岁", dept: "心内科", bed: "12", abnormal: "餐后 (20.2)" },
      { info: "刘伟/男/48岁", dept: "神经内科", bed: "33", abnormal: "随机 (18.5)" },
      { info: "杨翠花/女/70岁", dept: "老年病科", bed: "05", abnormal: "餐前 (16.9)" },
      { info: "吴杰/男/52岁", dept: "急诊观察室", bed: "02", abnormal: "随机 (21.4)" },
    ],
  },
  {
    label: "24h低血糖人数",
    value: 23,
    data: [
      { info: "文志锋/男/45岁", dept: "感染科二病区", bed: "29", abnormal: "早餐前 (3.7)" },
      { info: "魏程/女/31岁", dept: "血管外科二病区", bed: "028", abnormal: "随机 (3.8)" },
      { info: "黄萍/女/28岁", dept: "产科病区", bed: "16", abnormal: "空腹 (3.5)" },
      { info: "郑建/男/66岁", dept: "肾内科三病区", bed: "41", abnormal: "餐前 (3.6)" },
      { info: "林芳/女/54岁", dept: "肿瘤科病区", bed: "19", abnormal: "夜间 (3.2)" },
    ],
  },
];

const getAbnormalColor = (text) => {
  if (!text) return "#333";
  if (text.includes("重度")) return "#f56c6c"; // 红色
  if (text.includes("中度")) return "#e6a23c"; // 黄色
  return "#67c23a"; // 绿色 (空腹、随机、餐前等)
};
</script>

<template>
  <div class="analysis-container">
    <div class="header-title">全院血糖管理数据统计平台</div>

    <div class="main-grid">
      <!-- Left Column -->
      <div class="col-left">
        <div class="panel">
          <div class="panel-title">病人信息分类统计</div>
          <div class="chart-row">
            <div class="chart-box">
              <div class="sub-title">性别分布</div>
              <div ref="genderChartRef" class="chart" style="height: 120px"></div>
            </div>
            <div class="chart-box flex-2">
              <div class="sub-title">年龄分布</div>
              <div ref="ageChartRef" class="chart" style="height: 140px"></div>
            </div>
          </div>
        </div>
        <div class="panel flex-1 mt-3">
          <div class="panel-title">今日病区预警信息统计</div>
          <div ref="warningChartRef" class="chart" style="height: 240px; margin-top: 10px"></div>
        </div>
      </div>

      <!-- Middle Column -->
      <div class="col-middle">
        <div class="panel">
          <div class="panel-title">全院在管患者床位一览表</div>
          <div class="stats-row">
            <div class="stat-box">
              <div class="stat-val">139</div>
              <div class="stat-label">总病区数</div>
            </div>
            <div class="stat-box">
              <div class="stat-val">4,420</div>
              <div class="stat-label">总在管人数</div>
            </div>
            <div class="stat-box">
              <div class="stat-val">31</div>
              <div class="stat-label">今日在管人数</div>
            </div>
            <div class="stat-box">
              <div class="stat-val">25</div>
              <div class="stat-label">今日在管病区数</div>
            </div>
          </div>

          <div class="panel-title mt-3">在管病区人数统计</div>
          <div class="wards-grid">
            <div class="ward-item" v-for="(w, i) in activeWards" :key="i">
              <div class="ward-info">
                <span class="ward-name">{{ w.name }}</span>
                <span class="ward-count">{{ w.count }}人</span>
              </div>
              <el-icon><ArrowRight /></el-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="col-right">
        <div class="panel">
          <div class="panel-title tabs-title">
            <span
              :class="{ active: activeGlucoseTab === 'managed' }"
              @click="switchGlucoseTab('managed')"
              >在管血糖分析</span
            >
            <span class="divider">|</span>
            <span
              :class="{ active: activeGlucoseTab === 'hospital' }"
              @click="switchGlucoseTab('hospital')"
              >全院血糖分析</span
            >
          </div>

          <div v-show="activeGlucoseTab === 'managed'" class="flex-chart-box">
            <div class="legend-box">
              <div class="l-item"><span class="c-box red"></span> 高血糖次数 40.56%</div>
              <div class="l-item"><span class="c-box dark"></span> 正常血糖次数 58.67%</div>
              <div class="l-item"><span class="c-box blue"></span> 低血糖次数 0.76%</div>
            </div>
            <div ref="glucoseChartRef1" class="chart" style="height: 80px; width: 120px"></div>
          </div>

          <div v-show="activeGlucoseTab === 'hospital'" class="flex-chart-box">
            <div class="legend-box">
              <div class="l-item"><span class="c-box red"></span> 高血糖人数 44.29%</div>
              <div class="l-item"><span class="c-box dark"></span> 正常血糖人数 44.29%</div>
              <div class="l-item"><span class="c-box blue"></span> 低血糖人数 11.43%</div>
            </div>
            <div ref="glucoseChartRef2" class="chart" style="height: 80px; width: 120px"></div>
          </div>
        </div>

        <div class="panel flex-1 mt-3">
          <div class="panel-title">今日病区血糖异常统计</div>
          <div ref="abnormalChartRef" class="chart" style="height: 200px; margin-top: 10px"></div>
        </div>
      </div>
    </div>

    <!-- Bottom Lists -->
    <div class="panel bottom-lists mt-3">
      <div class="list-col" v-for="(col, i) in patientLists" :key="i">
        <div class="list-head">{{ col.label }} ({{ col.value }})</div>
        <div class="list-header-row">
          <span>患者信息</span>
          <span>病区</span>
          <span class="w-mini">床号</span>
          <span>异常...</span>
        </div>
        <div class="list-body">
          <div class="list-row" v-for="(row, j) in col.data" :key="j">
            <span class="text-truncate">{{ row.info }}</span>
            <span class="text-truncate">{{ row.dept }}</span>
            <span class="w-mini">{{ row.bed }}</span>
            <span class="text-abnormal" :style="{ color: getAbnormalColor(row.abnormal) }">{{
              row.abnormal
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.analysis-container {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  color: #333;
}

.header-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 24px;
  color: #333;
}

.main-grid {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  .col-left {
    flex: 0.25;
    display: flex;
    flex-direction: column;
  }
  .col-middle {
    flex: 0.45;
    display: flex;
    flex-direction: column;
  }
  .col-right {
    flex: 0.3;
    display: flex;
    flex-direction: column;
  }
}

.panel {
  background: #f8f9fa;
  border: 1px solid #f0f2f5;
  border-radius: 12px;
  padding: 16px;

  &.flex-1 {
    flex: 1;
  }
}

.panel-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  span {
    float: right;
    font-size: 12px;
    font-weight: normal;
    color: #666;
  }
}

.tabs-title {
  display: flex;
  align-items: center;
  gap: 12px;
  span {
    float: none;
    font-size: 14px;
    cursor: pointer;
    color: #999;
    transition: all 0.3s;
    &.active {
      color: #1daba6;
      font-weight: 600;
    }
  }
  .divider {
    color: #ddd;
    margin: 0 4px;
    cursor: default;
    font-size: 14px;
  }
}

.sub-title {
  font-size: 12px;
  color: #666;
  text-align: center;
}

.chart-row {
  display: flex;
  gap: 8px;
  .flex-2 {
    flex: 1.5;
  }
  .chart-box {
    flex: 1;
  }
}

.mt-3 {
  margin-top: 12px;
}

.stats-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;

  .stat-box {
    text-align: center;
    .stat-val {
      font-size: 24px;
      color: #1daba6;
      font-weight: 600;
      border-bottom: 2px solid #e8f7f6;
      padding-bottom: 8px;
      margin-bottom: 8px;
      display: inline-block;
      min-width: 60px;
    }
    .stat-label {
      font-size: 13px;
      color: #666;
    }
  }
}

.wards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 16px;
  column-gap: 12px;

  .ward-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #666;
    background: #fff;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #f0f2f5;

    .ward-info {
      display: flex;
      flex-direction: column;
      line-height: 1.4;
      .ward-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 75px;
        color: #333;
      }
      .ward-count {
        color: #1daba6;
        font-weight: 500;
      }
    }

    .el-icon {
      font-size: 12px;
      color: #1daba6;
    }
  }
}

.legend-box {
  font-size: 11px;
  color: #666;
  line-height: 1.8;
  z-index: 10;

  .l-item {
    display: flex;
    align-items: center;
  }

  .c-box {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    margin-right: 8px;
    &.red {
      background: #f29c38;
    }
    &.dark {
      background: #1daba6;
    }
    &.blue {
      background: #909399;
    }
  }
}

.flex-chart-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom-lists {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: auto;
  padding: 20px; // 加大整体内边距 增加高度

  .list-col {
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    border-right: 1px dashed #ddd; // 添加虚线分割

    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
      border-right: none; // 最后一个模块不需要分割线
    }
  }

  .list-body {
    max-height: 140px; // 限制高度，超出滚动
    overflow-y: auto;
    padding-right: 6px;

    /* 定制滚动条样式让界面更好看 */
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #e0e0e0;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }

  .list-head {
    font-size: 14px; // 调大头部字体
    font-weight: 600;
    margin-bottom: 12px; // 增加间距
    color: #333;
  }

  .list-header-row {
    font-size: 12px; // 调大表头字体
    color: #666;
    display: flex;
    padding-bottom: 8px; // 增加下边距
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 12px; // 增加与数据行的间距
  }

  .list-row {
    font-size: 12px; // 调大列表字体
    color: #444;
    display: flex;
    margin-bottom: 12px; // 加大数据行距
    line-height: 1.6; // 增加行高
  }

  .list-header-row span,
  .list-row span {
    flex: 1;
    padding-right: 4px;
    &.w-mini {
      flex: 0.4;
    }
  }

  .text-truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .text-abnormal {
    font-weight: 500;
    white-space: nowrap;
  }
}
</style>
