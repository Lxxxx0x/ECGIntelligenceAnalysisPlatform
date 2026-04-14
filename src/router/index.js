import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "/analysis",
      children: [
        {
          path: "analysis",
          name: "analysis",
          component: () => import("../views/dataAnalysis/index.vue"),
        },
        {
          path: "workbench",
          name: "workbench",
          component: () => import("../views/workbench/index.vue"),
        },
        {
          path: "glucose/warning",
          name: "glucoseWarning",
          component: () => import("../views/bloodGlucoseManagement/warningList/index.vue"),
        },
        {
          path: "glucose/unmanaged",
          name: "glucoseUnmanaged",
          component: () => import("../views/bloodGlucoseManagement/unmanaged/index.vue"),
        },
        {
          path: "glucose/managed",
          name: "glucoseManaged",
          component: () => import("../views/bloodGlucoseManagement/managed/index.vue"),
        },
        {
          path: "glucose/beds",
          name: "glucoseBeds",
          component: () => import("../views/bloodGlucoseManagement/bedList/index.vue"),
        },
        {
          path: "glucose/all-patients",
          name: "glucoseAllPatients",
          component: () => import("../views/bloodGlucoseManagement/allPatients/index.vue"),
        },
        {
          path: "glucose/discharged",
          name: "glucoseDischarged",
          component: () => import("../views/bloodGlucoseManagement/discharged/index.vue"),
        },
        {
          path: "glucose/measurement",
          name: "glucoseMeasurement",
          component: () => import("../views/bloodGlucoseManagement/measurement/index.vue"),
        },
        {
          path: "glucose/abnormal",
          name: "glucoseAbnormal",
          component: () => import("../views/bloodGlucoseManagement/abnormal/index.vue"),
        },
        {
          path: "quality/data",
          name: "qualityData",
          component: () => import("../views/quality/data/index.vue"),
        },
        {
          path: "quality/device",
          name: "qualityDevice",
          component: () => import("../views/quality/device/index.vue"),
        },
        {
          path: "quality/report",
          name: "qualityReport",
          component: () => import("../views/quality/report/index.vue"),
        },
        {
          path: "supplier/vendor/info",
          name: "vendorInfo",
          component: () => import("../views/supplier/vendor/info/index.vue"),
        },
        {
          path: "supplier/vendor/qualifications",
          name: "vendorQualifications",
          component: () => import("../views/supplier/vendor/qualifications/index.vue"),
        },
        {
          path: "supplier/vendor/device-ledger",
          name: "vendorDeviceLedger",
          component: () => import("../views/supplier/vendor/deviceLedger/index.vue"),
        },
        {
          path: "supplier/device/basic-ledger",
          name: "deviceBasicLedger",
          component: () => import("../views/supplier/device/basicLedger/index.vue"),
        },
        {
          path: "supplier/device/binding",
          name: "deviceBinding",
          component: () => import("../views/supplier/device/binding/index.vue"),
        },
        {
          path: "supplier/device/maintenance",
          name: "deviceMaintenance",
          component: () => import("../views/supplier/device/maintenance/index.vue"),
        },
        {
          path: "supplier/device/status",
          name: "deviceStatus",
          component: () => import("../views/supplier/device/status/index.vue"),
        },
        {
          path: "supplier/consumable/info",
          name: "consumableInfo",
          component: () => import("../views/supplier/consumable/info/index.vue"),
        },
        {
          path: "supplier/consumable/inventory",
          name: "consumableInventory",
          component: () => import("../views/supplier/consumable/inventory/index.vue"),
        },
        {
          path: "supplier/consumable/traceability",
          name: "consumableTraceability",
          component: () => import("../views/supplier/consumable/traceability/index.vue"),
        },
        {
          path: "supplier/procurement/order",
          name: "procurementOrder",
          component: () => import("../views/supplier/procurement/order/index.vue"),
        },
        {
          path: "supplier/procurement/acceptance",
          name: "procurementAcceptance",
          component: () => import("../views/supplier/procurement/acceptance/index.vue"),
        },
        {
          path: "supplier/procurement/statistics",
          name: "procurementStatistics",
          component: () => import("../views/supplier/procurement/statistics/index.vue"),
        },
        {
          path: "system/users",
          name: "systemUsers",
          component: () => import("../views/system/users/index.vue"),
        },
        {
          path: "system/departments",
          name: "systemDepartments",
          component: () => import("../views/system/departments/index.vue"),
        },
        {
          path: "system/roles",
          name: "systemRoles",
          component: () => import("../views/system/roles/index.vue"),
        },
      ],
    },
  ],
});

export default router;
