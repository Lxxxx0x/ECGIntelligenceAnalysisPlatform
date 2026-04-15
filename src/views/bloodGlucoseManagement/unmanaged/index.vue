<script setup>
import { ref, reactive, nextTick, shallowRef, onUnmounted, onMounted } from 'vue';
import { Search, Refresh, View } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import * as echarts from 'echarts';
import { apiSearchUnmanageList, apiIncludePatient, apiExcludePatient } from '@/apis/bloodGlucoseManagement/unmanaged';

defineOptions({
  name: "UnmanagedPatients",
});

// 查询参数
const queryParams = reactive({
  name: '',
  patientId: '',
  dateRange: [],
  status: ''
});

const tableData = ref([]);
const loading = ref(false);

// 分页
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(20);

// 获取列表数据
const getList = async () => {
  loading.value = true;
  try {
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      name: queryParams.name,
      patientId: queryParams.patientId,
      status: queryParams.status
    };
    if (queryParams.dateRange && queryParams.dateRange.length === 2) {
      params.startDate = queryParams.dateRange[0];
      params.endDate = queryParams.dateRange[1];
    }
    const res = await apiSearchUnmanageList(params);
    if (res.code === 200 && res.success) {
      const data = res.data || {};
      tableData.value = data.list || [];
      total.value = data.total || 0;
      currentPage.value = data.pageNum || 1;
      pageSize.value = data.pageSize || 20;
    }
  } catch (error) {
    console.error("获取待管患者列表失败", error);
  } finally {
    loading.value = false;
  }
};

// 纳入患者操作
const handleInclude = async (row) => {
  try {
    await ElMessageBox.confirm(`确定要将患者 ${row.name} 纳入管理吗？`, '系统提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    const res = await apiIncludePatient(row.patientId, {
      reason: "常规纳入",
      operatorId: 1001
    });
    if (res.code === 200 && res.success) {
      ElMessage.success(`已成功将患者 ${row.name} 纳入管理`);
      // 刷新列表
      getList();
    } else {
      ElMessage.error(res.message || "纳入失败");
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error("纳入操作异常", error);
    }
  }
};

// 不纳入患者操作
const handleExclude = async (row) => {
  try {
    await ElMessageBox.confirm(`确定要将患者 ${row.name} 设为不纳入吗？`, '系统提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    const res = await apiExcludePatient(row.patientId);
    if (res.code === 200 && res.success) {
      ElMessage.success(`已将患者 ${row.name} 设为不纳入`);
      // 刷新列表
      getList();
    } else {
      ElMessage.error(res.message || "操作失败");
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error("不纳入操作异常", error);
    }
  }
};

// 查询操作
const handleSearch = () => {
  currentPage.value = 1;
  getList();
};

// 重置操作
const handleReset = () => {
  queryParams.name = '';
  queryParams.patientId = '';
  queryParams.dateRange = [];
  queryParams.status = '';
  handleSearch();
};

onMounted(() => {
  getList();
});

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
        <el-form-item label="姓名">
          <el-input v-model="queryParams.name" placeholder="请输入患者姓名" clearable style="width: 150px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="病历号">
          <el-input v-model="queryParams.patientId" placeholder="请输入病历号" clearable style="width: 150px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="收治时间">
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
      <el-table v-loading="loading" :data="tableData" border stripe style="width: 100%" height="100%">
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
        
        <el-table-column label="操作" width="220" fixed="right" align="center">
          <template #default="{ row }">
            <el-button type="success" link size="small" @click="handleInclude(row)">纳入</el-button>
            <el-button type="danger" link size="small" @click="handleExclude(row)">不纳入</el-button>
            <el-button type="primary" link :icon="View" size="small" @click="handleViewChart(row)">审核波形</el-button>
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
        @size-change="handleSearch"
        @current-change="getList"
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
