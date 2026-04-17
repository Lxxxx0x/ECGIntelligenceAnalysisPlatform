<script setup>
import { ref, reactive, nextTick, shallowRef, onUnmounted, onMounted } from 'vue';
import { Search, Refresh, View } from '@element-plus/icons-vue';
import * as echarts from 'echarts';
import { apiMeasurementList } from '@/apis/bloodGlucoseManagement/measurement';

defineOptions({
  name: "Measurement",
});

// 查询参数
const queryParams = reactive({
  name: '',
  dateRange: [],
  status: ''
});

const tableData = ref([]);

// 分页
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const getList = async () => {
  try {
    const res = await apiMeasurementList();
    if (res.code === 200) {
      tableData.value = res.data.list || res.data || [];
      total.value = res.data.total || tableData.value.length;
    }
  } catch (error) {
    console.error('Failed to fetch measurement list:', error);
  }
};

onMounted(() => {
  getList();
});

// 查询操作
const handleSearch = () => {
  getList();
};

// 重置操作
const handleReset = () => {
  queryParams.name = '';
  queryParams.dateRange = [];
  queryParams.status = '';
  currentPage.value = 1;
  getList();
};

// --- ECharts 波形图相关 ---
const dialogVisible = ref(false);
const chartRef = ref(null);
const chartInstance = shallowRef(null);
const chartTimer = ref(null);
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
  
  // 模拟心动周期数据（1个采样点=10ms，动态适配各个病人的心跳间隔平缓期）
  const baseHr = row.heartRate;
  const intervalSamples = Math.floor(60000 / baseHr / 10);
  
  // 模拟典型心律 PQRST 波段 (核心特点：平缓过渡段与 QRS 锐角直上直下)
  const activeWave = [
    0, 0.02, 0.05, 0.1, 0.12, 0.1, 0.05, 0.02, 0, // P波 (平缓)
    0, 0, 0, 0, // PR段 (平缓基线)
    -0.15, // Q波 (开始锐减)
    1.8,   // R波 (瞬间陡增，直上效果)
    -0.35, // S波 (锐减深插直下)
    row.stSegment, row.stSegment, row.stSegment, // ST段 (读取列表中病理异常的ST段偏移数据)
    row.stSegment + 0.05, row.stSegment + 0.15, row.stSegment + 0.25, 0.15, 0.05, 0 // T波 (平缓凸起)
  ];
  
  const padLength = Math.max(0, intervalSamples - activeWave.length);
  const beat = [...activeWave, ...Array(padLength).fill(0)]; // 剩余全是平直基线
  
  // 复制4个完整的心跳周期组成波形片段
  let ecgData = [];
  for(let i=0; i<4; i++) {
     ecgData = ecgData.concat(beat);
  }
  
  // 生成图表二维坐标 [x:时间, y:电压]
  const seriesData = ecgData.map((y, i) => [i * 10, y]);
  
  const option = {
    backgroundColor: '#ffffff',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    grid: {
      top: 30,
      bottom: 30,
      left: 50,
      right: 30
    },
    // 渲染心电图经典的红粉色网格背景
    xAxis: {
      type: 'value',
      name: '时间(ms)',
      min: 0,
      max: seriesData[seriesData.length - 1][0],
      interval: 200, // 大网格 200ms
      minorTick: { show: true, splitNumber: 5 }, // 5次细分小网格(每格40ms)
      minorSplitLine: {
        show: true,
        lineStyle: { color: '#ffe6e6', width: 1 } // 浅粉色底格
      },
      splitLine: {
        show: true,
        lineStyle: { color: '#ffb3b3', width: 1.5 } // 红色主格
      },
      axisLabel: { show: false }, // 隐藏时间数值，保留纯净网格氛围
      axisTick: { show: false },
      axisLine: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '电压(mV)',
      min: -1.0,
      max: 2.5,
      interval: 0.5, // 大网格 0.5mV
      minorTick: { show: true, splitNumber: 5 }, // 5次细分小网格(每格0.1mV)
      minorSplitLine: {
        show: true,
        lineStyle: { color: '#ffe6e6', width: 1 }
      },
      splitLine: {
        show: true,
        lineStyle: { color: '#ffb3b3', width: 1.5 }
      },
      axisLabel: { formatter: '{value}' },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: 'ECG',
        type: 'line',
        showSymbol: false,
        smooth: false, // 【重点闭启平滑】实现强烈的直上直下陡峭的R/S波
        itemStyle: { color: '#000000' }, // 传统黑笔走纸颜色
        lineStyle: { width: 1.5 },
        data: seriesData
      }
    ]
  };
  
  chartInstance.value.setOption(option);

  // 实现实时动画效果
  if (chartTimer.value) clearInterval(chartTimer.value);
  let currentIndex = seriesData.length;
  chartTimer.value = setInterval(() => {
    if (!chartInstance.value) return;
    for (let i = 0; i < 5; i++) {
      const y = beat[currentIndex % beat.length];
      seriesData.push([currentIndex * 10, y]);
      seriesData.shift();
      currentIndex++;
    }
    
    chartInstance.value.setOption({
      xAxis: {
        min: seriesData[0][0],
        max: seriesData[seriesData.length - 1][0]
      },
      series: [{
        data: seriesData
      }]
    });
  }, 50);
};

const handleDialogClose = () => {
  if (chartTimer.value) {
    clearInterval(chartTimer.value);
    chartTimer.value = null;
  }
};

onUnmounted(() => {
  if (chartTimer.value) {
    clearInterval(chartTimer.value);
  }
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
        <el-form-item label="患者信息">
          <el-input v-model="queryParams.name" placeholder="姓名/病历号" clearable @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="测量时间">
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
            <el-button type="primary" link :icon="View" size="small" @click="handleViewChart(row)">查看波形</el-button>
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
      @close="handleDialogClose"
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
