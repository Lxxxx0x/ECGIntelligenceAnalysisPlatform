<script setup>
import { ref } from "vue";

const activeMenu = ref("patient");
const activeTab = ref("registered");
const searchQuery = ref("");

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
  <div class="layout">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="logo">
        <el-icon class="logo-icon"><FirstAidKit /></el-icon>
        <span class="logo-text">中心医院<br /><small>Central Hospital</small></span>
      </div>
      <el-menu :default-active="activeMenu" class="sidebar-menu" :collapse="false">
        <el-menu-item index="home">
          <el-icon><House /></el-icon>
          <template #title>首页概览</template>
        </el-menu-item>
        <el-menu-item index="patient">
          <el-icon><User /></el-icon>
          <template #title>患者信息</template>
        </el-menu-item>
        <el-menu-item index="doctor">
          <el-icon><Postcard /></el-icon>
          <template #title>医生信息</template>
        </el-menu-item>
        <el-menu-item index="ward">
          <el-icon><OfficeBuilding /></el-icon>
          <template #title>病房信息</template>
        </el-menu-item>
        <el-menu-item index="fee">
          <el-icon><Money /></el-icon>
          <template #title>费用管理</template>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- Main Content -->
    <div class="main-container">
      <!-- Header -->
      <div class="header">
        <div class="search-wrap">
          <el-input
            v-model="searchQuery"
            placeholder="患者名称 / 药品编号 / 医生名称 / 病房号"
            prefix-icon="Search"
            class="search-input"
          />
        </div>
        <div class="header-actions">
          <el-icon class="action-icon"><Moon /></el-icon>
          <el-icon class="action-icon"><Setting /></el-icon>
          <el-icon class="action-icon"><Bell /></el-icon>
          <div class="user-profile">
            <div class="user-info">
              <span class="user-name">马报国</span>
              <span class="user-role">神经内科 - 主任医师</span>
            </div>
            <el-avatar
              class="user-avatar"
              :size="36"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </div>
        </div>
      </div>

      <!-- Content Area -->
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
    </div>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: #f3f5f8;
}

.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  width: 240px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  z-index: 10;
  border-radius: 0 20px 20px 0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.02);

  .logo {
    display: flex;
    align-items: center;
    padding: 0 30px;
    margin-bottom: 40px;
    color: #1a1a1a;

    .logo-icon {
      font-size: 24px;
      color: #3bb29d;
      margin-right: 12px;
    }

    .logo-text {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.2;

      small {
        font-size: 11px;
        color: #999;
        font-weight: normal;
      }
    }
  }

  .sidebar-menu {
    border-right: none;
    padding: 0 16px;

    .el-menu-item {
      height: 48px;
      line-height: 48px;
      border-radius: 24px;
      margin-bottom: 8px;
      color: #7b8a92;
      font-size: 14px;

      .el-icon {
        margin-right: 16px;
        font-size: 18px;
      }

      &:hover {
        background-color: #f7f9fa;
      }

      &.is-active {
        background-color: #e5f6f3;
        color: #3bb29d;
        font-weight: 500;
      }
    }
  }
}

/* Main Container */
.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
  overflow-y: auto;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  margin-bottom: 24px;

  .search-wrap {
    width: 440px;

    .search-input {
      --el-input-border-color: transparent;
      --el-input-hover-border-color: transparent;
      --el-input-focus-border-color: transparent;
      --el-input-bg-color: #fff;

      .el-input__wrapper {
        border-radius: 24px;
        box-shadow: none !important;
        background-color: #fff;
        padding: 4px 16px;
      }
    }
  }

  .header-actions {
    display: flex;
    align-items: center;

    .action-icon {
      font-size: 20px;
      color: #3bb29d;
      margin-right: 20px;
      cursor: pointer;
    }

    .user-profile {
      display: flex;
      align-items: center;
      margin-left: 10px;

      .user-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-right: 12px;

        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }

        .user-role {
          font-size: 12px;
          color: #3bb29d;
        }
      }
    }
  }
}

/* Content Area */
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
          background-color: #3bb29d;
          color: #fff;

          .badge {
            color: #3bb29d;
            background: rgba(255, 255, 255, 0.9);
          }
        }
      }
    }

    .add-btn {
      background-color: #3bb29d;
      border-color: #3bb29d;
      padding: 0 24px;

      &:hover {
        background-color: #329986;
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

    .el-table {
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
          background-color: #e5f6f3;
          color: #3bb29d;
        }

        &.el-tag--warning {
          background-color: #fff4e5;
          color: #f29c38;
        }
      }

      .table-action-edit {
        color: #3bb29d;
        background-color: transparent;
        border: 1px solid #e5f6f3;
        width: 28px;
        height: 28px;
        border-radius: 6px;
        padding: 0;

        &:hover {
          background-color: #e5f6f3;
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
