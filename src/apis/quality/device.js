import request from "@/utils/request";

// 心电数据设备列表
export function apiEcgDeviceList() {
  return request({
    url: "/quality/device",
    method: "get",
  });
}