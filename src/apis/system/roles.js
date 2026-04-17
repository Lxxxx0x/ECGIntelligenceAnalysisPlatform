import request from "@/utils/request";

// 角色列表
export function apiRoleList() {
  return request({
    url: "/system/roles",
    method: "get",
  });
}