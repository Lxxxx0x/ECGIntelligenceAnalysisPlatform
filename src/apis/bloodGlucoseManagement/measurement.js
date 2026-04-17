import request from "@/utils/request";

// 测量数据列表
export function apiMeasurementList() {
  return request({
    url: "/blood-glucose/patients/managed",
    method: "get",
  });
}