/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description all模式渲染后端返回路由
 * @param constantRoutes
 * @returns {*}
 */
export function filterAllRoutes(constantRoutes) {
  return constantRoutes.filter((route) => {
    route.meta = {};
    route.path = route.url;
    route.meta.title = route.name;
    if (!route.component) {
      if (route.fileUrl) {
        var path = route.fileUrl;
        route.name = route.url.replace("/", "");
        route.component = (resolve) => require([`@/views${path}`], resolve);
      } else {
        route.component = (resolve) => require(["@/layouts"], resolve);
        if (route.url === "/") {
          route.redirect = "index";
        } else {
          route.redirect = "noRedirect";
        }
      }
      // if (hiddenMenu.indexOf(route.text) !== -1) {
      //   route.hidden = true;
      // }
      if (route.name === "index") {
        route.meta.icon = "home";
      } else if (route.meta.title === "订单查看") {
        route.meta.icon = "folder-open";
      } else if (route.meta.title === "用户记录") {
        route.meta.icon = "scroll";
      } else if (route.meta.title === "支付信息" && !route.fileUrl) {
        route.meta.icon = "search-dollar";
        if (route.children.length < 2) {
          route.children[0].icon = true;
        }
      } else if (route.meta.title === "收入信息" && route.icon) {
        route.meta.icon = "search-dollar";
      }
      // if (route.url || route.url === "/") {
      //   route.name = route.url.splice(0, 1);
      // } else {
      //   route.name = "index";
      // }
      // if (route.component === "Layout") {
      //   route.component = (resolve) => require(["@/layouts"], resolve);
      // } else if (route.component === "EmptyLayout") {
      //   route.component = (resolve) =>
      //     require(["@/layouts/EmptyLayout"], resolve);
      // } else {
      //   let path = "views/" + route.component;
      //   if (
      //     new RegExp("^/views/.*$").test(route.component) ||
      //     new RegExp("^views/.*$").test(route.component)
      //   ) {
      //     path = route.component;
      //   } else if (new RegExp("^/.*$").test(route.component)) {
      //     path = "views" + route.component;
      //   } else if (new RegExp("^@views/.*$").test(route.component)) {
      //     path = route.component.str.slice(2);
      //   } else {
      //     path = "views/" + route.component;
      //   }
      //   route.component = (resolve) => require([`@/${path}`], resolve);
      // }
    }
    if (route.children) {
      route.children = filterAllRoutes(route.children);
    }
    if (route.children && route.children.length === 0) {
      delete route.children;
    }
    return true;
  });
  // return constantRoutes.filter((route) => {
  //   if (route.component) {
  //     if (route.component === "Layout") {
  //       route.component = (resolve) => require(["@/layouts"], resolve);
  //     } else if (route.component === "EmptyLayout") {
  //       route.component = (resolve) =>
  //         require(["@/layouts/EmptyLayout"], resolve);
  //     } else {
  //       let path = "views/" + route.component;
  //       if (
  //         new RegExp("^/views/.*$").test(route.component) ||
  //         new RegExp("^views/.*$").test(route.component)
  //       ) {
  //         path = route.component;
  //       } else if (new RegExp("^/.*$").test(route.component)) {
  //         path = "views" + route.component;
  //       } else if (new RegExp("^@views/.*$").test(route.component)) {
  //         path = route.component.str.slice(2);
  //       } else {
  //         path = "views/" + route.component;
  //       }
  //       route.component = (resolve) => require([`@/${path}`], resolve);
  //     }
  //   }
  //   if (route.children && route.children.length) {
  //     route.children = filterAllRoutes(route.children);
  //   }
  //   if (route.children && route.children.length === 0) {
  //     delete route.children;
  //   }
  //   return true;
  // });
}

/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 判断当前路由是否包含权限
 * @param permissions
 * @param route
 * @returns {boolean|*}
 */
function hasPermission(permissions, route) {
  if (route.meta && route.meta.permissions) {
    return permissions.some((role) => route.meta.permissions.includes(role));
  } else {
    return true;
  }
}

/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description intelligence模式根据permissions数组拦截路由
 * @param routes
 * @param permissions
 * @returns {[]}
 */
export function filterAsyncRoutes(routes, permissions) {
  const finallyRoutes = [];
  routes.forEach((route) => {
    const item = { ...route };
    if (hasPermission(permissions, item)) {
      if (item.children) {
        item.children = filterAsyncRoutes(item.children, permissions);
      }
      finallyRoutes.push(item);
    }
  });
  return finallyRoutes;
}
