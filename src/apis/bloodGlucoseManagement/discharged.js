import request from "@/utils/request";

// 出院患者列表数据
export function apiDischargedList() {
  return request({
    url: "/blood-glucose/patients/discharged",
    method: "get",
  });
}
