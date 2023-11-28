import request from "@/utils/request";
import arrayRequest from "@/utils/jsonQ";

//停车出入查询
export async function outIn(data) {
  return arrayRequest({
    url: "/admin/msg/parking/page",
    method: "post",
    data,
  });
}

//充电记录
export async function charge(data) {
  return arrayRequest({
    url: "/admin/msg/charge/page",
    method: "post",
    data,
  });
}
