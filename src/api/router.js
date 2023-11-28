import request from "@/utils/request";

export function getRouterList(params) {
  return request({
    url: "/admin/system/menus",
    method: "get",
    params,
  });
}
