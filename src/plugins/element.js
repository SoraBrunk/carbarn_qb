import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/display.css";

import "@/styles/element-variables.scss";

ElementUI.Dialog.props.lockScroll.default = false;

Vue.use(ElementUI, {
  size: "small",
});
