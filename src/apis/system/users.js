import request from "@/utils/request";

// 用户列表
export function apiUserList() {
  return request({
    url: "/system/users",
    method: "get",
  });
}