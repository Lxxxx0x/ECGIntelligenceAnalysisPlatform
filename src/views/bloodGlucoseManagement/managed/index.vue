<script setup>
import { ref, reactive, nextTick, shallowRef, onUnmounted } from 'vue';
import { Search, Refresh, View } from '@element-plus/icons-vue';
import * as echarts from 'echarts';

defineOptions({
  name: "ManagedPatients",
});

// 查询参数
const queryParams = reactive({
  name: '',
  dateRange: [],
  status: ''
});

// 模拟心电图数据
const mockData = [
  { id: 1001, name: '王五 (在管)', patientId: 'P003', bedNo: 'B区-05床', measureTime: '2026-04-14 10:05:00', heartRate: 60, stSegment: 0.02, qt: 410, qrs: 95, status: 'stable', desc: '正常心电图' },
  { id: 1002, name: '赵六 (在管)', patientId: 'P004', bedNo: 'C区-10床', measureTime: '2026-04-14 10:45:00', heartRate: 48, stSegment: 0.06, qt: 420, qrs: 100, status: 'abnormal', desc: '心动过缓' },
];

const tableData = ref([...mockData]);

// 分页
const total = ref(mockData.length);
const currentPage = ref(1);
const pageSize = ref(10);

// 查询操作
const handleSearch = () => {
  let result = mockData;
  if (queryParams.name) {
    result = result.filter(item => item.name.includes(queryParams.name) || item.patientId.includes(queryParams.name));
  }
  if (queryParams.status) {
    result = result.filter(item => item.status === queryParams.status);
  }
  tableData.value = result;
  total.value = result.length;
};

// 重置操作
const handleReset = () => {
  queryParams.name = '';
  queryParams.dateRange = [];
  queryParams.status = '';
  handleSearch();
};

// --- ECharts 波形图相关 ---
const dialogVisible = ref(false);
const chartRef = ref(null);
const chartInstance = shallowRef(null);
const currentTitle = ref('心电波形变化趋势');

const handleViewChart = (row) => {
  currentTitle.value = `${row.name} - 标准实时心电走纸波形图 (HR: ${row.heartRate} bpm)`;
  dialogVisible.value = true;
  nextTick(() => {
    initChart(row);
  });
};

const initChart = (row) => {
  if (!chartRef.value) return;
  
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
  
  chartInstance.value = echarts.init(chartRef.value);
  
  const baseHr = row.heartRate;
  const intervalSamples = Math.floor(60000 / baseHr / 10);
  
  const activeWave = [
    0, 0.02, 0.05, 0.1, 0.12, 0.1, 0.05, 0.02, 0,
    0, 0, 0, 0,
    -0.15,
    1.8,
    -0.35,
    row.stSegment, row.stSegment, row.stSegment,
    row.stSegment + 0.05, row.stSegment + 0.15, row.stSegment + 0.25, 0.15, 0.05, 0
  ];
  
  const padLength = Math.max(0, intervalSamples - activeWave.length);
  const beat = [...activeWave, ...Array(padLength).fill(0)];
  
  let ecgData = [];
  for(let i=0; i<4; i++) {
     ecgData = ecgData.concat(beat);
  }
  
  const seriesData = ecgData.map((y, i) => [i * 10, y]);
  
  const option = {
    backgroundColor: '#ffffff',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    grid: {
      top: 30, bottom: 30, left: 50, right: 30
    },
    xAxis: {
      type: 'value',
      name: '时间(ms)',
      min: 0,
      max: seriesData[seriesData.length - 1][0],
      interval: 200,
      minorTick: { show: true, splitNumber: 5 },
      minorSplitLine: { show: true, lineStyle: { color: '#ffe6e6', width: 1 } },
      splitLine: { show: true, lineStyle: { color: '#ffb3b3', width: 1.5 } },
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '电压(mV)',
      min: -1.0,
      max: 2.5,
      interval: 0.5,
      minorTick: { show: true, splitNumber: 5 },
      minorSplitLine: { show: true, lineStyle: { color: '#ffe6e6', width: 1 } },
      splitLine: { show: true, lineStyle: { color: '#ffb3b3', width: 1.5 } },
      axisLabel: { formatter: '{value}' },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: 'ECG',
        type: 'line',
        showSymbol: false,
        smooth: false,
        itemStyle: { color: '#000000' },
        lineStyle: { width: 1.5 },
        data: seriesData
      }
    ]
  };
  
  chartInstance.value.setOption(option);
};

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
});
</script>

<template>
  <div class="page-container">
    <!-- 头部搜索 -->
    <div class="search-wrapper">
      <el-form :inline="true" :model="queryParams" class="form-inline">
        <el-form-item label="在管患者">
          <el-input v-model="queryParams.name" placeholder="姓名/病历号" clearable @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="最近一次测量">
          <el-date-picker
            v-model="queryParams.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="心电状态">
          <el-select v-model="queryParams.status" placeholder="全部状态" clearable style="width: 150px">
            <el-option label="全部" value="" />
            <el-option label="平稳" value="stable" />
            <el-option label="异常" value="abnormal" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 列表数据 -->
    <div class="table-wrapper">
      <el-table :data="tableData" border stripe style="width: 100%" height="100%">
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="patientId" label="病历号" width="100" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="bedNo" label="床位床" width="120" />
        <el-table-column prop="measureTime" label="测量时间" width="160" />
        
        <!-- 心电图指标 -->
        <el-table-column label="心电检测指标" align="center">
          <el-table-column prop="heartRate" label="心率 (bpm)" width="100" align="center">
            <template #default="{ row }">
              <span :class="{'text-danger': row.heartRate > 100 || row.heartRate < 60}">{{ row.heartRate }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="stSegment" label="ST段 (mV)" width="100" align="center">
            <template #default="{ row }">
              <span :class="{'text-danger': Math.abs(row.stSegment) >= 0.1}">{{ row.stSegment }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="qt" label="QT间期(ms)" width="100" align="center" />
          <el-table-column prop="qrs" label="QRS时限(ms)" width="110" align="center" />
        </el-table-column>

        <el-table-column prop="status" label="状态预警" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 'stable' ? 'success' : 'danger'" effect="light">
              {{ row.status === 'stable' ? '平稳' : '异常' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="智能诊断结果" min-width="180" show-overflow-tooltip />
        
        <el-table-column label="操作" width="120" fixed="right" align="center">
          <template #default="{ row }">
            <el-button type="primary" link :icon="View" size="small" @click="handleViewChart(row)">实时波形</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination-wrapper">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>

    <!-- 查看波形弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentTitle"
      width="1000px"
      destroy-on-close
    >
      <div ref="chartRef" style="width: 100%; height: 350px;"></div>
    </el-dialog>
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
    
    .el-form-item {
      margin-bottom: 0;
    }
  }

  .table-wrapper {
    flex: 1;
    overflow: hidden;
    
    .text-danger {
      color: var(--el-color-danger);
      font-weight: bold;
    }
  }

  .pagination-wrapper {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
