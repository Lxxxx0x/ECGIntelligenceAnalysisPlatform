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
          path: "supplier/vendor",
          name: "supplierVendor",
          component: () => import("../views/supplier/vendor/index.vue"),
        },
        {
          path: "supplier/device",
          name: "supplierDevice",
          component: () => import("../views/supplier/device/index.vue"),
        },
        {
          path: "supplier/consumable",
          name: "supplierConsumable",
          component: () => import("../views/supplier/consumable/index.vue"),
        },
        {
          path: "supplier/procurement",
          name: "supplierProcurement",
          component: () => import("../views/supplier/procurement/index.vue"),
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
