<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const activeMenu = ref(route.path || "/analysis");
const searchQuery = ref("");
</script>

<template>
  <div class="layout">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="logo">
        <el-icon class="logo-icon"><FirstAidKit /></el-icon>
        <span class="logo-text"
          >心电图情报分析平台<br /><small>ECG Intelligence Analysis Platform</small></span
        >
      </div>
      <el-menu :default-active="activeMenu" class="sidebar-menu" :collapse="false" router>
        <el-menu-item index="/workbench">
          <el-icon><Odometer /></el-icon>
          <template #title>工作台</template>
        </el-menu-item>
        <el-menu-item index="/analysis">
          <el-icon><DataLine /></el-icon>
          <template #title>数据分析</template>
        </el-menu-item>
        <el-sub-menu index="/glucose">
          <template #title>
            <el-icon><Connection /></el-icon>
            <span>全院血糖管理</span>
          </template>
          <el-menu-item index="/glucose/warning">预警列表</el-menu-item>
          <el-menu-item index="/glucose/unmanaged">待管患者</el-menu-item>
          <el-menu-item index="/glucose/managed">在管患者</el-menu-item>
          <el-menu-item index="/glucose/beds">床位一览表</el-menu-item>
          <el-menu-item index="/glucose/all-patients">全院血糖患者</el-menu-item>
          <el-menu-item index="/glucose/discharged">出组患者</el-menu-item>
          <el-menu-item index="/glucose/measurement">血糖测量管理</el-menu-item>
          <el-menu-item index="/glucose/abnormal">异常指标管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/quality">
          <template #title>
            <el-icon><Finished /></el-icon>
            <span>质控管理</span>
          </template>
          <el-menu-item index="/quality/list">质控列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/supplier">
          <template #title>
            <el-icon><Tickets /></el-icon>
            <span>供应商管理</span>
          </template>
          <el-menu-item index="/supplier/list">供应商列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/system">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/system/users">用户管理</el-menu-item>
        </el-sub-menu>
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

      <!-- Content Area (Router View) -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
      color: #1daba6;
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
      color: #606266;
      font-size: 14px;

      .el-icon {
        margin-right: 16px;
        font-size: 18px;
      }

      &:hover {
        background-color: #f7f9fa;
      }

      &.is-active {
        background-color: #e8f7f6;
        color: #1daba6;
        font-weight: 500;
      }
    }

    :deep(.el-sub-menu__title) {
      height: 48px;
      line-height: 48px;
      border-radius: 24px;
      margin-bottom: 8px;
      color: #606266;
      font-size: 14px;

      .el-icon {
        margin-right: 16px;
        font-size: 18px;
      }

      &:hover {
        background-color: #f7f9fa;
      }
    }

    :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
      background-color: #e8f7f6;
      color: #1daba6;
      font-weight: 500;
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
  background: #fff;
  padding: 16px 24px;
  border-radius: 16px;
  margin-bottom: 24px;

  .search-wrap {
    width: 440px;

    :deep(.search-input) {
      --el-input-border-color: transparent;
      --el-input-hover-border-color: transparent;
      --el-input-focus-border-color: transparent;
      --el-input-bg-color: #f3f5f8;

      .el-input__wrapper {
        border-radius: 24px;
        box-shadow: none !important;
        background-color: #f3f5f8;
        padding: 4px 16px;
      }
    }
  }

  .header-actions {
    display: flex;
    align-items: center;

    .action-icon {
      font-size: 18px;
      color: #1daba6;
      margin-right: 16px;
      cursor: pointer;
      background-color: #e8f7f6;
      border-radius: 50%;
      width: 34px;
      height: 34px;
      display: flex;
      justify-content: center;
      align-items: center;
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
          color: #1daba6;
        }
      }
    }
  }
}
</style>
