import request from "@/utils/request";
// 部门列表

export function apiDepartmentList() {
  return request({
    url: "/system/departments",
    method: "get",
  });
}