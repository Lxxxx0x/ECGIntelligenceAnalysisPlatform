import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "/patient",
      children: [
        {
          path: "patient",
          name: "patient",
          component: () => import("../views/patient/index.vue"),
        },
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
          path: "quality/list",
          name: "qualityList",
          component: () => import("../views/quality/list/index.vue"),
        },
        {
          path: "supplier/list",
          name: "supplierList",
          component: () => import("../views/supplier/list/index.vue"),
        },
        {
          path: "system/users",
          name: "systemUsers",
          component: () => import("../views/system/users/index.vue"),
        },
      ],
    },
  ],
});

export default router;
