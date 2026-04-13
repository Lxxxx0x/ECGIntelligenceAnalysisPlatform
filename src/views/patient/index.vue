<script setup>
import { ref } from "vue";

const activeTab = ref("registered");

const tableData = [
  {
    id: 1,
    name: "曹操",
    phone: "13200005544",
    type: "平诊",
    time: "2023-09-13-10:30",
    dept: "内分泌科",
    status: "已就诊",
    fee: "8元",
  },
  {
    id: 2,
    name: "石乐智",
    phone: "13200005544",
    type: "平诊",
    time: "2023-09-13-10:30",
    dept: "消化内科",
    status: "已就诊",
    fee: "8元",
  },
  {
    id: 3,
    name: "杨过",
    phone: "13200005544",
    type: "平诊",
    time: "2023-09-13-10:30",
    dept: "儿科",
    status: "已就诊",
    fee: "8元",
  },
  {
    id: 4,
    name: "朱震宁",
    phone: "13200005544",
    type: "平诊",
    time: "2023-09-13-10:30",
    dept: "消化内科",
    status: "已就诊",
    fee: "8元",
  },
  {
    id: 5,
    name: "庞统",
    phone: "13200005544",
    type: "平诊",
    time: "2023-09-13-10:30",
    dept: "消化内科",
    status: "未就诊",
    fee: "8元",
  },
  {
    id: 6,
    name: "扁鹊",
    phone: "13200005544",
    type: "平诊",
    time: "2023-09-13-10:30",
    dept: "消化内科",
    status: "未就诊",
    fee: "8元",
  },
  {
    id: 7,
    name: "张仲景",
    phone: "13200005544",
    type: "平诊",
    time: "2023-09-13-10:30",
    dept: "消化内科",
    status: "已就诊",
    fee: "8元",
  },
  {
    id: 8,
    name: "华佗",
    phone: "13200005544",
    type: "平诊",
    time: "2023-09-13-10:30",
    dept: "神经内科",
    status: "已就诊",
    fee: "8元",
  },
  {
    id: 9,
    name: "孙思邈",
    phone: "13200005544",
    type: "平诊",
    time: "2023-09-13-10:30",
    dept: "神经内科",
    status: "已就诊",
    fee: "8元",
  },
  {
    id: 10,
    name: "李时珍",
    phone: "13200005544",
    type: "平诊",
    time: "2023-09-13-10:30",
    dept: "神经内科",
    status: "已就诊",
    fee: "8元",
  },
  {
    id: 11,
    name: "葛洪",
    phone: "13200005544",
    type: "平诊",
    time: "2023-09-13-10:30",
    dept: "神经内科",
    status: "未就诊",
    fee: "8元",
  },
];

const getStatusType = (status) => {
  return status === "已就诊" ? "success" : "warning";
};
</script>

<template>
  <div class="content">
    <div class="content-header">
      <div class="tabs">
        <el-button
          :class="['tab-btn', { active: activeTab === 'registered' }]"
          @click="activeTab = 'registered'"
        >
          挂号 <span class="badge">450</span>
        </el-button>
        <el-button
          :class="['tab-btn', { active: activeTab === 'reserved' }]"
          @click="activeTab = 'reserved'"
        >
          已预约 <span class="badge">293</span>
        </el-button>
        <el-button
          :class="['tab-btn', { active: activeTab === 'completed' }]"
          @click="activeTab = 'completed'"
        >
          已完成 <span class="badge">8953</span>
        </el-button>
      </div>
      <el-button type="primary" class="add-btn" round>添加患者</el-button>
    </div>

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
        <el-table-column width="60" align="center">
          <template #default>
            <div class="avatar-placeholder"></div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="患者姓名" width="120" />
        <el-table-column prop="phone" label="手机号码" width="160" />
        <el-table-column prop="type" label="挂号类别" width="100" />
        <el-table-column prop="time" label="挂号时间" width="200" />
        <el-table-column prop="dept" label="挂号科室" min-width="120" />
        <el-table-column prop="status" label="就诊状态" width="120" align="center">
          <template #default="scope">
            <el-tag
              :type="getStatusType(scope.row.status)"
              effect="light"
              round
              disable-transitions
              class="status-tag"
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="fee" label="挂号费" width="80" />
        <el-table-column label="操作" width="120" align="center">
          <template #default>
            <el-button link class="table-action-edit">
              <el-icon size="16"><EditPen /></el-icon>
            </el-button>
            <el-button link class="table-action-delete">
              <el-icon size="14"><Close /></el-icon>
            </el-button>
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

  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .tabs {
      display: flex;
      gap: 12px;

      .tab-btn {
        border-radius: 20px;
        padding: 8px 16px;
        border: none;
        background-color: #f5f7f9;
        color: #666;
        font-weight: normal;

        .badge {
          background: #fff;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 12px;
          margin-left: 6px;
          color: #333;
        }

        &.active {
          background-color: #1DABA6;
          color: #fff;

          .badge {
            color: #1DABA6;
            background: rgba(255, 255, 255, 0.9);
          }
        }
      }
    }

    .add-btn {
      background-color: #1DABA6;
      border-color: #1DABA6;
      padding: 0 24px;

      &:hover {
        background-color: #178A86;
      }
    }
  }

  .table-card {
    .avatar-placeholder {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: #e4e7ed;
      margin: 0 auto;
    }

    :deep(.el-table) {
      --el-table-border-color: #f5f7fa;

      .el-table__cell {
        padding: 14px 0;
      }

      &::before {
        display: none;
      }

      .status-tag {
        border-radius: 16px;
        padding: 0 12px;
        border: none;
        font-weight: 500;

        &.el-tag--success {
          background-color: #e8f7f6;
          color: #1DABA6;
        }

        &.el-tag--warning {
          background-color: #fff4e5;
          color: #f29c38;
        }
      }

      .table-action-edit {
        color: #1DABA6;
        background-color: transparent;
        border: 1px solid #e8f7f6;
        width: 28px;
        height: 28px;
        border-radius: 6px;
        padding: 0;

        &:hover {
          background-color: #e8f7f6;
        }
      }

      .table-action-delete {
        color: #fff;
        background-color: #a8abb2;
        width: 28px;
        height: 28px;
        border-radius: 6px;
        padding: 0;
        margin-left: 8px;

        &:hover {
          background-color: #909399;
          color: #fff;
        }
      }
    }
  }
}
</style>
