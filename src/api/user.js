import request from "@/utils/request";
import arrayRequest from "@/utils/jsonQ";
import { encryptedData } from "@/utils/encrypt";
import { loginRSA, tokenName } from "@/config/settings";

export async function login(data) {
  return arrayRequest({
    url: "/admin/system/login",
    method: "post",
    data,
  });
}

export function getUserInfo() {
  return request({
    url: "/system/v0/user/info",
    method: "get",
  });
}

export function logout() {
  return request({
    url: "/system/v0/user/logout",
    method: "get",
  });
}

export function register() {
  return request({
    url: "/register",
    method: "post",
  });
}
