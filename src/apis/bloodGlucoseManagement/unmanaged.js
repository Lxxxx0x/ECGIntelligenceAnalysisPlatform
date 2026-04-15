import request from "@/utils/request";

// 未管理患者列表数据
export function apiUnmanageList() {
  return request({
    url: "/blood-glucose/patients/unmanaged",
    method: "get",
  });
}

// 未管理患者列表查询接口
export function apiSearchUnmanageList(params) {
  return request({
    url: "/blood-glucose/patients/unmanaged",
    method: "get",
    params,
  });
}

// 待管纳入
export function apiIncludePatient(patientId, data) {
  return request({
    url: `/blood-glucose/patients/${patientId}/include`,
    method: "post",
    data,
  });
}