import "echarts";
import "echarts/map/js/china";
import "echarts/map/js/world";
import "echarts/map/js/province/sichuan";
import "echarts-wordcloud";
import meishan from "@/JSON/meishan";

import VabChart from "vue-echarts";
import theme from "./vab-echarts-theme.json";
VabChart.registerMap("眉山", meishan);
VabChart.registerTheme("vab-echarts-theme", theme);
export default VabChart;
