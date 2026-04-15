import request from "@/utils/request";

// 心电数据质控列表
export function apiEcgQualityList() {
  return request({
    url: "/quality/data",
    method: "get",
  });
}