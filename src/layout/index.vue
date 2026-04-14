<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const activeMenu = ref(route.path || "/analysis");

const routePaths = {
  "/workbench": ["工作台"],
  "/analysis": ["数据分析"],
  "/glucose/warning": ["全院血糖管理", "预警列表"],
  "/glucose/unmanaged": ["全院血糖管理", "待管患者"],
  "/glucose/managed": ["全院血糖管理", "在管患者"],
  "/glucose/beds": ["全院血糖管理", "床位一览表"],
  "/glucose/all-patients": ["全院血糖管理", "全院血糖患者"],
  "/glucose/discharged": ["全院血糖管理", "出组患者"],
  "/glucose/measurement": ["全院血糖管理", "血糖测量管理"],
  "/glucose/abnormal": ["全院血糖管理", "异常指标管理"],
  "/quality/data": ["质控管理", "心电数据质控"],
  "/quality/device": ["质控管理", "设备质控"],
  "/quality/report": ["质控管理", "报告质控"],
  "/supplier/vendor/info": ["供应商与资产", "厂商管理", "信息管理"],
  "/supplier/vendor/qualifications": ["供应商与资产", "厂商管理", "资质管理"],
  "/supplier/vendor/device-ledger": ["供应商与资产", "厂商管理", "设备台账"],
  "/supplier/device/basic-ledger": ["供应商与资产", "设备管理", "基础台账"],
  "/supplier/device/binding": ["供应商与资产", "设备管理", "绑定检查"],
  "/supplier/device/maintenance": ["供应商与资产", "设备管理", "维保校准"],
  "/supplier/device/status": ["供应商与资产", "设备管理", "状态监控"],
  "/supplier/consumable/info": ["供应商与资产", "耗材管理", "信息管理"],
  "/supplier/consumable/inventory": ["供应商与资产", "耗材管理", "库存管理"],
  "/supplier/consumable/traceability": ["供应商与资产", "耗材管理", "领用追溯"],
  "/supplier/procurement/order": ["供应商与资产", "采购管理", "申请订单"],
  "/supplier/procurement/acceptance": ["供应商与资产", "采购管理", "验收管理"],
  "/supplier/procurement/statistics": ["供应商与资产", "采购管理", "台账统计"],
  "/system/users": ["系统管理", "用户管理"],
  "/system/departments": ["系统管理", "科室管理"],
  "/system/roles": ["系统管理", "角色与权限管理"]
};

const breadcrumbs = computed(() => {
  return routePaths[route.path] || [];
});

const applyTheme = () => {
  const root = document.documentElement;
// 更深一点的蓝
  root.style.setProperty('--el-color-primary', '#3582e6');
  root.style.setProperty('--el-color-primary-light-3', '#68a1ed');
  root.style.setProperty('--el-color-primary-light-5', '#9abff4');
  root.style.setProperty('--el-color-primary-light-7', '#caddf9');
  root.style.setProperty('--el-color-primary-light-8', '#e2eefb');
  root.style.setProperty('--el-color-primary-light-9', '#f1f6fd');
  root.style.setProperty('--el-color-primary-dark-2', '#2a68b8');
};

onMounted(() => {
  applyTheme();
});
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
            <span>全院心电图管理</span>
          </template>
          <el-menu-item index="/glucose/warning">预警列表</el-menu-item>
          <el-menu-item index="/glucose/unmanaged">待管患者</el-menu-item>
          <el-menu-item index="/glucose/managed">在管患者</el-menu-item>
          <el-menu-item index="/glucose/beds">床位一览表</el-menu-item>
          <el-menu-item index="/glucose/all-patients">全院心电图患者</el-menu-item>
          <el-menu-item index="/glucose/discharged">出组患者</el-menu-item>
          <el-menu-item index="/glucose/measurement">心电图测量管理</el-menu-item>
          <el-menu-item index="/glucose/abnormal">异常指标管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/quality">
          <template #title>
            <el-icon><Finished /></el-icon>
            <span>质控管理</span>
          </template>
          <el-menu-item index="/quality/data">心电数据质控</el-menu-item>
          <el-menu-item index="/quality/device">设备质控</el-menu-item>
          <el-menu-item index="/quality/report">报告质控</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/supplier">
          <template #title>
            <el-icon><Tickets /></el-icon>
            <span>供应商与资产</span>
          </template>
          <el-sub-menu index="/supplier/vendor">
            <template #title>厂商管理</template>
            <el-menu-item index="/supplier/vendor/info">信息管理</el-menu-item>
            <el-menu-item index="/supplier/vendor/qualifications">资质管理</el-menu-item>
            <el-menu-item index="/supplier/vendor/device-ledger">厂商设备台账</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/supplier/device">
            <template #title>设备管理</template>
            <el-menu-item index="/supplier/device/basic-ledger">基础台账</el-menu-item>
            <el-menu-item index="/supplier/device/binding">绑定检查</el-menu-item>
            <el-menu-item index="/supplier/device/maintenance">维保校准</el-menu-item>
            <el-menu-item index="/supplier/device/status">状态监控</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/supplier/consumable">
            <template #title>耗材试剂</template>
            <el-menu-item index="/supplier/consumable/info">信息管理</el-menu-item>
            <el-menu-item index="/supplier/consumable/inventory">库存管理</el-menu-item>
            <el-menu-item index="/supplier/consumable/traceability">领用追溯</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/supplier/procurement">
            <template #title>采购管理</template>
            <el-menu-item index="/supplier/procurement/order">申请订单</el-menu-item>
            <el-menu-item index="/supplier/procurement/acceptance">验收管理</el-menu-item>
            <el-menu-item index="/supplier/procurement/statistics">台账统计</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="/system">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/system/departments">科室管理</el-menu-item>
          <el-menu-item index="/system/users">用户管理</el-menu-item>
          <el-menu-item index="/system/roles">角色与权限管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>

    <!-- Main Content -->
    <div class="main-container">
      <!-- Header -->
      <div class="header">
        <div class="breadcrumb-wrap">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
              {{ item }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-actions">
          <el-dropdown placement="bottom-end">
            <el-icon class="action-icon"><Setting /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
  background-color: var(--el-color-primary);
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
    color: #ffffff;

    .logo-icon {
      font-size: 24px;
      color: #ffffff;
      margin-right: 12px;
    }

    .logo-text {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.2;

      small {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.7);
        font-weight: normal;
      }
    }
  }

  .sidebar-menu {
    flex: 1;
    overflow-y: auto;
    border-right: none;
    padding: 0 16px;
    background-color: transparent;

    /* 隐藏滚动条显得更美观 */
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;

    // 为了覆盖 el-menu 以及多级子菜单原本的样式
    :deep(.el-menu) {
      background-color: transparent !important;
      border-right: none;
    }
    
    :deep(.el-sub-menu .el-menu) {
      background-color: transparent !important;
    }

    .el-menu-item,
    :deep(.el-sub-menu__title) {
      color: rgba(255, 255, 255, 0.85) !important;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1) !important;
        color: #ffffff !important;
      }
    }

    .el-menu-item {
      height: 48px;
      line-height: 48px;
      border-radius: 24px;
      margin-bottom: 8px;
      font-size: 14px;
      background-color: transparent;

      .el-icon {
        margin-right: 16px;
        font-size: 18px;
        color: inherit;
      }

      &.is-active {
        background-color: rgba(255, 255, 255, 0.2) !important;
        color: #ffffff !important;
        font-weight: 500;
      }
    }

    :deep(.el-sub-menu__title) {
      height: 48px;
      line-height: 48px;
      border-radius: 24px;
      margin-bottom: 8px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.85);

      .el-icon {
        margin-right: 16px;
        font-size: 18px;
        color: inherit;
      }
    }

    :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
      background-color: rgba(255, 255, 255, 0.1) !important;
      color: #ffffff !important;
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
  background: var(--el-bg-color-overlay);
  padding: 16px 24px;
  border-radius: 16px;
  margin-bottom: 24px;

  .breadcrumb-wrap {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: var(--el-text-color-regular);
  }

  .header-actions {
    display: flex;
    align-items: center;

    .action-icon {
      font-size: 18px;
      color: var(--el-color-primary);
      margin-right: 16px;
      cursor: pointer;
      background-color: var(--el-color-primary-light-9);
      border-radius: 50%;
      width: 34px;
      height: 34px;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: none; /* 去除下拉菜单触发获取焦点时的边框 */
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
          color: var(--el-text-color-primary);
        }

        .user-role {
          font-size: 12px;
          color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
