import request from "@/utils/request";

//获取下拉工器具类型
export function getCheckQuipType(params) {
  return request({
    url: "bs/v0/inspect/check/alltypes",
    method: "get",
    params,
  });
}

//获取城市县
export function getCity(params) {
  return request({
    url: `/system/v0/org/tree?parentId=${params}`,
    method: "get",
  });
}
