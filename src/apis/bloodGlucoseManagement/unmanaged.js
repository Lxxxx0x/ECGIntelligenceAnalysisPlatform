import request from "@/utils/request";

// 未管理患者列表数据
export function apiUnmanageList() {
  return request({
    url: "blood-glucose/patients/metrics",
    method: "get",
  });
}

// 未管理患者列表查询接口
export function apiSearchUnmanageList(params) {
  return request({
    url: "blood-glucose/patients/metrics",
    method: "get",
    params,
  });
}