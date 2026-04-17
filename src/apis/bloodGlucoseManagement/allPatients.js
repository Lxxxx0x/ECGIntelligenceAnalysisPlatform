import request from "@/utils/request";

// 未管理患者列表数据
export function apiAllPatients() {
  return request({
    url: "/blood-glucose/patients",
    method: "get",
  });
}