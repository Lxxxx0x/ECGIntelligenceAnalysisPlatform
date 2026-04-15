import request from "@/utils/request";

// 心电报告质控列表
export function apiEcgReportList() {
  return request({
    url: "/quality/report",
    method: "get",
  });
}
