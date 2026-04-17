<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import * as echarts from "echarts";

defineOptions({
  name: "WorkbenchIndex",
});

const getPrimaryColor = () => {
  return document.documentElement.style.getPropertyValue("--el-color-primary") || "#3582e6";
};

// 顶部时间筛选
const dateRange = ref([]);
const activeDateBtn = ref("今天");
const dateBtns = ["今天", "本周", "本月", "本年"];

// 统计数据
const stats = [
  { label: "心电预警次数", value: 243, unit: "次" },
  { label: "心电预警人数", value: 194, unit: "人" },
  { label: "预警总人数", value: 2, unit: "人" },
  { label: "管理总人数", value: 0, unit: "人" },
  { label: "管理比率", value: 0, unit: "%" },
];

// 表格过滤与数据
const activeTab = ref("全部");
const currentWard = ref("");
const tableData = [
  { info: "张建国 / 男 / 62岁", ward: "心血管内科一病区", bedNo: "12", inpatientNo: "IN260401", deviceNo: "ECG-001", attachTime: "08:30", changeTime: "明天 08:30", abnTimes: 5, maxHr: 125, lowBgTimes: 1 },
  { info: "李秀兰 / 女 / 55岁", ward: "神经内科三病区", bedNo: "05", inpatientNo: "IN260402", deviceNo: "ECG-023", attachTime: "10:15", changeTime: "明天 10:15", abnTimes: 2, maxHr: 110, lowBgTimes: 0 },
  { info: "王强 / 男 / 48岁", ward: "急诊病房", bedNo: "03", inpatientNo: "IN260403", deviceNo: "ECG-034", attachTime: "12:00", changeTime: "明天 12:00", abnTimes: 9, maxHr: 135, lowBgTimes: 3 },
  { info: "钱九 / 男 / 70岁", ward: "老年监护室", bedNo: "18", inpatientNo: "IN260404", deviceNo: "ECG-012", attachTime: "09:00", changeTime: "明天 09:00", abnTimes: 0, maxHr: 85, lowBgTimes: 0 }
];

// ECharts 图表容器引用
const lineChartRef = ref(null);
const barChartRef = ref(null);
let lineChart = null;
let barChart = null;

const initCharts = () => {
  const primaryColor = getPrimaryColor();
  
  // 1. 周预警趋势 (Line Chart)
  if (lineChartRef.value) {
    lineChart = echarts.init(lineChartRef.value);
    lineChart.setOption({
      tooltip: { trigger: "axis" },
      grid: { top: 30, bottom: 20, left: 40, right: 20 },
      xAxis: {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        axisLine: { lineStyle: { color: "#ddd" } },
        axisLabel: { color: "#666" }
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { type: "dashed", color: "#eee" } },
        axisLabel: { color: "#666" }
      },
      series: [
        {
          name: "预警次数",
          type: "line",
          smooth: true,
          itemStyle: { color: primaryColor },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: `${primaryColor}66` },
              { offset: 1, color: `${primaryColor}00` }
            ])
          },
          data: [120, 150, 180, 130, 210, 243, 190]
        }
      ]
    });
  }

  // 2. 病区预警排行 (Bar Chart)
  if (barChartRef.value) {
    barChart = echarts.init(barChartRef.value);
    barChart.setOption({
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      grid: { top: 20, bottom: 20, left: 100, right: 30 },
      xAxis: { type: "value", show: false },
      yAxis: {
        type: "category",
        data: ["骨科病区", "消化内科", "神经内科", "急诊病房", "心内科"],
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: "#555", fontSize: 11 }
      },
      series: [
        {
          type: "bar",
          barWidth: 15,
          itemStyle: { color: "#f29c38", borderRadius: [0, 4, 4, 0] },
          label: { show: true, position: "right", color: "#555", fontSize: 11 },
          data: [15, 28, 45, 89, 135]
        }
      ]
    });
  }
};

const handleThemeChange = () => {
  if (lineChart) lineChart.setOption({ series: [{ itemStyle: { color: getPrimaryColor() } }] });
  if (barChart) barChart.setOption({ series: [{ itemStyle: { color: "#f29c38" } }] });
};

const handleResize = () => {
  if (lineChart) lineChart.resize();
  if (barChart) barChart.resize();
};

onMounted(() => {
  nextTick(() => {
    initCharts();
  });
  window.addEventListener("theme-changed", handleThemeChange);
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("theme-changed", handleThemeChange);
  window.removeEventListener("resize", handleResize);
  if (lineChart) lineChart.dispose();
  if (barChart) barChart.dispose();
});
</script>

<template>
  <div class="workbench-container">
    <!-- 顶部数据概览面板 -->
    <div class="panel header-panel">
      <!-- 筛选栏 -->
      <div class="filter-row">
        <span class="label">统计时间范围：</span>
        <div class="date-buttons">
          <span 
            v-for="btn in dateBtns" 
            :key="btn" 
            :class="['date-btn', { active: activeDateBtn === btn }]"
            @click="activeDateBtn = btn"
          >
            {{ btn }}
          </span>
        </div>
        <el-date-picker
          v-if="activeDateBtn === '自定义'"
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          style="width: 240px; margin-left: 12px;"
        />
        <div v-else class="date-display">
          2026-04-14 至 2026-04-14
        </div>
      </div>

      <!-- 核心统栏 -->
      <div class="stats-wrapper">
        <div class="stat-item" v-for="(item, i) in stats" :key="i">
          <div class="stat-title">{{ item.label }}</div>
          <div class="stat-number">
            <span class="val">{{ item.value }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 中间可视化图表面板 -->
    <div class="chart-row">
      <div class="panel flex-1">
        <div class="panel-title">病区心电预警TOP排行</div>
        <div ref="barChartRef" style="height: 200px;"></div>
      </div>
      <div class="panel flex-1">
        <div class="panel-title">近7日全院心电预警趋势</div>
        <div ref="lineChartRef" style="height: 200px;"></div>
      </div>
    </div>

    <!-- 底部今日病情列表 -->
    <div class="panel list-panel mt-3">
      <div class="panel-title" style="margin-bottom: 16px;">今日在管患者</div>
      
      <!-- 表格操作栏 -->
      <div class="table-tools">
        <div class="left-tools">
          <span class="label">当前病区：</span>
          <el-select v-model="currentWard" placeholder="全部病区" size="small" style="width: 140px;">
            <el-option label="全部病区" value="" />
            <el-option label="心血管内科一病区" value="心血管内科一病区" />
            <el-option label="急诊病房" value="急诊病房" />
          </el-select>
        </div>
        <div class="right-tools">
          <el-radio-group v-model="activeTab" size="small">
            <el-radio-button label="全部">全部</el-radio-button>
            <el-radio-button label="待复查审核">待复查审核</el-radio-button>
            <el-radio-button label="待换心贴">待换心贴</el-radio-button>
            <el-radio-button label="待停用监护">待停用监护</el-radio-button>
          </el-radio-group>
        </div>
      </div>

      <!-- 数据表格 -->
      <el-table :data="tableData" border style="width: 100%; height: 350px" stripe>
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="info" label="患者信息" width="160" show-overflow-tooltip />
        <el-table-column prop="ward" label="病区" width="140" show-overflow-tooltip />
        <el-table-column prop="bedNo" label="床号" width="70" align="center" />
        <el-table-column prop="inpatientNo" label="住院号" width="110" align="center" />
        <el-table-column prop="deviceNo" label="设备号" width="100" align="center" />
        <el-table-column prop="attachTime" label="贴电极时间" width="110" align="center" />
        <el-table-column prop="changeTime" label="换心贴时间" width="120" align="center">
          <template #default="{ row }">
            <span style="color: #f29c38">{{ row.changeTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="24h异常心率次数" width="140" align="center">
          <template #default="{ row }">
            <span :style="{ color: row.abnTimes > 0 ? '#f56c6c' : '#333', fontWeight: 'bold' }">{{ row.abnTimes }} 次</span>
          </template>
        </el-table-column>
        <el-table-column prop="maxHr" label="最快心率指标" width="120" align="center">
          <template #default="{ row }">
            <span :style="{ color: row.maxHr > 100 ? '#f56c6c' : '#67c23a' }">{{ row.maxHr }} bpm</span>
          </template>
        </el-table-column>
        <el-table-column label="24h心电停搏次数" width="140" align="center">
          <template #default="{ row }">
            <span>{{ row.lowBgTimes }} 次</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="90" align="center">
          <template #default>
            <el-button link type="primary" size="small">查看记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.workbench-container {
  background: var(--el-bg-color-overlay);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  color: var(--el-text-color-primary);

  .panel {
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 20px;
    
    .panel-title {
      font-size: 16px;
      font-weight: bold;
      color: var(--el-text-color-primary);
      position: relative;
      padding-left: 12px;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 2px;
        bottom: 2px;
        width: 4px;
        background: var(--el-color-primary);
        border-radius: 2px;
      }
    }
  }

  .mt-3 {
    margin-top: 16px;
  }

  .flex-1 {
    flex: 1;
  }

  // 顶部卡片
  .header-panel {
    margin-bottom: 16px;

    .filter-row {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      font-size: 14px;
      
      .label {
        font-weight: 500;
        color: #555;
        margin-right: 12px;
      }
      
      .date-buttons {
        display: flex;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        background: #fff;
        
        .date-btn {
          padding: 4px 16px;
          cursor: pointer;
          color: #606266;
          border-right: 1px solid #dcdfe6;
          transition: all 0.2s;
          
          &:last-child {
            border-right: none;
          }
          
          &:hover {
            color: var(--el-color-primary);
          }
          
          &.active {
            background: var(--el-color-primary-light-9);
            color: var(--el-color-primary);
            font-weight: 500;
          }
        }
      }

      .date-display {
        margin-left: 16px;
        color: #aaa;
        font-size: 13px;
      }
    }

    .stats-wrapper {
      display: flex;
      justify-content: flex-start;
      gap: 60px;
      
      .stat-title {
        font-size: 13px;
        color: #666;
        margin-bottom: 8px;
        font-weight: 500;
      }
      
      .stat-number {
        display: flex;
        align-items: baseline;
        
        .val {
          font-size: 32px;
          font-weight: bold;
          color: #333;
          line-height: 1;
          margin-right: 6px;
        }
        
        .unit {
          font-size: 14px;
          color: #999;
        }
      }
    }
  }

  // 中间图表
  .chart-row {
    display: flex;
    gap: 16px;
  }

  // 表格部分
  .list-panel {
    .table-tools {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      background: #fff;
      padding: 12px 16px;
      border-radius: 8px;
      border: 1px solid #ebeef5;

      .left-tools {
        display: flex;
        align-items: center;
        .label {
          font-size: 14px;
          color: #555;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
