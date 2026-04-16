import request from "@/utils/request";

// 异常患者列表数据
export function apiAbnormalList() {
  return request({
    url: "/blood-glucose/patients/abnormal",
    method: "get",
  });
}

