import request from "@/utils/request";

// 在管患者列表数据
export function apiManageList() {
  return request({
    url: "/blood-glucose/patients/managed",
    method: "get",
  });
}


// 在管患者不纳入
export function apiExcludePatient(patientId) {
  return request({
    url: `/blood-glucose/patients/${patientId}/exclude`,
    method: "post",
  });
}