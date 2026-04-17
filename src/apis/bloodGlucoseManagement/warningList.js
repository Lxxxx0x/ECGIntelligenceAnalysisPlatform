import request from "@/utils/request";

// 预警列表数据
export function apiWarningList(params) {
  return request({
    url: "/blood-glucose/warnings",
    method: "get",
    params,
  });
}

// 病区列表数据
export function apiDepartmentList() {
  return request({
    url: "/blood-glucose/bed-view/departments",
    method: "get",
  });
}

// 指标列表数据
export function apiDictIndexList() {
  return request({
    url: "/blood-glucose/dict/indexes",
    method: "get",
  });
}

// 预警列表查询接口
export function apiSearchWarningList(params) {
  return request({
    url: "/blood-glucose/warnings",
    method: "get",
    params,
  });
}

// 预警列表纳入
export function apiIncludeWarning(warningId) {
  return request({
    url: `/blood-glucose/warnings/${warningId}/include`,
    method: "post",
  });
}
