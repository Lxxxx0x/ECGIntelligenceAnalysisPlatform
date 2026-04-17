import request from "@/utils/request";

// 病房列表数据
export function apiRoomsList() {
  return request({
    url: "blood-glucose/bed-view/rooms",
    method: "get",
  });
}

// 病房病人列表数据
export function apiRoomPatientsList(roomId) {
  return request({
    url: `blood-glucose/bed-view/rooms/${roomId}/patients`,
    method: "get",
  });
}

