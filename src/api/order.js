import request from "@/utils/request";
import arrayRequest from "@/utils/jsonQ";

//查询车库
export async function carBarnAll(params) {
  return request({
    url: "/admin/carbarns",
    method: "get",
    params,
  });
}

//停车订单查询
export async function parkOrder(data) {
  return arrayRequest({
    url: "/admin/orders/page",
    method: "post",
    data,
  });
}

//支付信息查询
export async function payDetails(data) {
  return arrayRequest({
    url: "/admin/pay/page",
    method: "post",
    data,
  });
}

//查询车库收入金额
export async function payTotal(data) {
  return arrayRequest({
    url: "/admin/pay/total",
    method: "post",
    data,
  });
}
