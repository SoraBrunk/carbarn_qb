/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts";
import EmptyLayout from "@/layouts/EmptyLayout";
import { publicPath, routerMode } from "@/config/settings";

Vue.use(VueRouter);
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  // {
  //   path: "/register",
  //   component: () => import("@/views/register/index"),
  //   hidden: true,
  // },
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/401"),
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    hidden: true,
  },
];

export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "index",
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("@/views/index/index"),
        meta: {
          title: "首页",
          icon: "home",
          affix: true,
        },
      },
    ],
  },
  // {
  //   path: "/personalCenter",
  //   component: Layout,
  //   hidden: true,
  //   redirect: "personalCenter",
  //   children: [
  //     {
  //       path: "personalCenter",
  //       name: "PersonalCenter",
  //       component: () => import("@/views/personalCenter/index"),
  //       meta: {
  //         title: "个人中心",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/",
  //   component: Layout,
  //   redirect: "index",
  //   name: "index",
  //   component: () => import("@/views/index/index"),
  //   meta: {
  //     title: "首页",
  //     icon: "home",
  //   },
  // },
  // {
  //   path: "/carBarnManage",
  //   component: Layout,
  //   redirect: "noRedirect",
  //   hidden: true,
  //   children: [
  //     {
  //       path: "/carBarnManage",
  //       name: "carBarnManage",
  //       component: () => import("@/views/carBarn/carBarnList"),
  //       meta: {
  //         title: "车库管理",
  //         icon: "chalkboard",
  //       },
  //     },
  //   ],
  // },
  {
    path: "/carStop",
    component: Layout,
    redirect: "noRedirect",
    name: "purchase",
    meta: {
      title: "订单查看",
      icon: "folder-open",
    },
    children: [
      {
        path: "/carStop/stop",
        name: "stoping",
        component: () => import("@/views/carStop/carStop"),
        meta: {
          title: "停车订单",
        },
      },
      {
        path: "/carStop/charge",
        name: "history",
        component: () => import("@/views/carStop/charge"),
        meta: {
          title: "充电订单",
        },
      },
    ],
  },
  {
    path: "/userRecord",
    component: Layout,
    redirect: "noRedirect",
    name: "userManage",
    meta: {
      title: "用户记录",
      icon: "scroll",
    },
    children: [
      {
        path: "/userRecord/outIn",
        name: "stoping",
        component: () => import("@/views/record/outIn"),
        meta: {
          title: "出入库记录",
        },
      },
      {
        path: "/userRecord/charge",
        name: "history",
        component: () => import("@/views/record/charge"),
        meta: {
          title: "充电记录",
        },
      },
    ],
  },
  {
    path: "/finance",
    component: Layout,
    redirect: "noRedirect",
    name: "finance",
    children: [
      {
        path: "/finance",
        name: "stoping",
        component: () => import("@/views/finance/finance"),
        meta: {
          title: "支付信息",
          icon: "scroll",
        },
      },
    ],
  },
  // {
  //   path: "/quipment",
  //   component: Layout,
  //   redirect: "noRedirect",
  //   name: "quipment",
  //   hidden: true,
  //   meta: {
  //     title: "设备管理",
  //     icon: "archive",
  //   },
  //   children: [
  //     {
  //       path: "/quipment/door",
  //       name: "door",
  //       component: () => import("@/views/quipment/door"),
  //       meta: {
  //         title: "门禁设备",
  //       },
  //     },
  //     {
  //       path: "/quipment/charge",
  //       name: "charge",
  //       component: () => import("@/views/quipment/charge"),
  //       meta: {
  //         title: "充电终端",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/message",
  //   component: Layout,
  //   redirect: "noRedirect",
  //   name: "message",
  //   hidden: true,
  //   component: () => import("@/views/message/message"),
  //   meta: {
  //     title: "消息管理",
  //     icon: "scroll",
  //   },
  // },
  /* {
    path: "/test",
    component: Layout,
    redirect: "noRedirect",
    children: [
      {
        path: "test",
        name: "Test",
        component: () => import("@/views/test/index"),
        meta: {
          title: "test",
          icon: "marker",
          permissions: ["admin"],
        },
      },
    ],
  }, */
  // permissions: ["admin"]
  {
    path: "/error",
    component: EmptyLayout,
    redirect: "noRedirect",
    name: "Error",
    hidden: true,
    meta: {
      title: "错误页",
      icon: "bug",
    },
    children: [
      {
        path: "401",
        name: "Error401",
        component: () => import("@/views/401"),
        meta: {
          title: "401",
        },
      },
      {
        path: "404",
        name: "Error404",
        component: () => import("@/views/404"),
        meta: {
          title: "404",
        },
      },
    ],
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
});
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
/* const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
}; */

export function resetRouter() {
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher;
}

export default router;
