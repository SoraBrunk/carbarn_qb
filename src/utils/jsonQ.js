import Vue from "vue";
import axios from "axios";
import {
  baseURL,
  contentType,
  debounce,
  invalidCode,
  noPermissionCode,
  requestTimeout,
  successCode,
  tokenName,
} from "@/config/settings";
import store from "@/store";
import qs from "qs";
import router from "@/router";
import { isArray } from "@/utils/validate";

let loadingInstance;
axios.defaults.withCredentials = true;
/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 判断当前url是否需要加loading
 * @param {*} config
 * @returns
 */
const needLoading = (config) => {
  let status = false;
  debounce.forEach((item) => {
    if (Vue.prototype.$baseLodash.includes(config.url, item)) {
      status = true;
    }
  });
  return status;
};

/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  switch (code) {
    case invalidCode:
      Vue.prototype.$baseMessage(msg || `后端接口异常`, "error");
      store.dispatch("user/resetAccessToken").catch(() => {});
      location.reload();
      break;
    case noPermissionCode:
      router.push({ path: "/401" }).catch(() => {});
      store.dispatch("user/resetAccessToken").catch(() => {});
      break;
    default:
      Vue.prototype.$baseMessage(msg || `后端接口异常`, "error");
      break;
  }
};

const instance = axios.create({
  baseURL: "/api",
  timeout: requestTimeout,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (store.getters["user/accessToken"]) {
      config.headers[tokenName] = store.getters["user/accessToken"];
    }
    //这里会过滤所有为空、0、false的key，如果不需要请自行注释
    // if (config.data)
    //   config.data = Vue.prototype.$baseLodash.pickBy(
    //     config.data,
    //     Vue.prototype.$baseLodash.identity
    //   );
    // if (
    //   contentType === "application/x-www-form-urlencoded;charset=UTF-8" &&
    //   config.data
    // ) {
    //   config.data = qs.stringify(config.data);
    // }
    if (needLoading(config)) {
      loadingInstance = Vue.prototype.$baseLoading();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (loadingInstance) loadingInstance.close();
    const { status, data, config } = response;
    const { success, msg } = data;
    // 操作正常Code数组
    // const codeVerificationArray = isArray(successCode)
    //   ? [...successCode]
    //   : [...[successCode]];
    // const codeVerificationArray = success;
    // 是否操作正常 codeVerificationArray.includes(code)
    if (status === 200 && data.success) {
      return data;
    } else {
      handleCode(status, msg);
      return Promise.reject(
        "请求异常拦截:" + JSON.stringify({ url: config.url, code, msg }) ||
          "Error"
      );
    }
  },
  (error) => {
    if (loadingInstance) loadingInstance.close();
    const { response, message } = error;
    if (
      error.response &&
      (error.response.data || error.response.status === 401)
    ) {
      const { status, data } = response;
      handleCode(status, data.msg || message);
      return Promise.reject(error);
    } else {
      let { message } = error;
      if (message === "Network Error") {
        message = "后端接口连接异常";
      }
      if (message.includes("timeout")) {
        message = "后端接口请求超时";
      }
      if (message.includes("Request failed with status code")) {
        const code = message.substr(message.length - 3);
        message = "后端接口" + code + "异常";
      }
      Vue.prototype.$baseMessage(message || `后端接口未知异常`, "error");
      return Promise.reject(error);
    }
  }
);

export default instance;
