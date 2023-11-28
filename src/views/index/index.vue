<template>
  <div>
    <div class="title">
      <div v-for="(item, i) in form1" :key="i" class="body title_card">
        <div style="margin-bottom: 1rem">{{ item.name }}</div>
        <div class="title_span">{{ item.num }}</div>
      </div>
    </div>
    <!-- <div style="display: flex">
      <div style="margin-right: 1rem">
        <div id="myChart1" ref="myChart1" class="body line"></div>
        <div class="body">
          <div class="card_title">异常报警</div>
          <el-table :data="tableData" stripe size="mini">
            <el-table-column prop="type" label="类别"></el-table-column>
            <el-table-column
              prop="carBarnName"
              label="车库名称"
            ></el-table-column>
            <el-table-column prop="reason" label="故障描述"></el-table-column>
            <el-table-column prop="state" label="状态"></el-table-column>
          </el-table>
        </div>
      </div>
      <div style="flex-grow: 1">
        <div id="myChart2" ref="myChart2" class="body pie"></div>
        <div class="body">
          <div class="card_title">本月新增</div>
          <div class="dis">
            <div style="text-aglin: center">
              <img src="@/assets/logo.png" style="width: 3rem; height: 3rem" />
              <div style="margin-top: 0.5rem">
                <span style="margin-right: 0.3rem">车库</span>
                <span
                  style="font-weight: bolder; color: #3ad89b; font-size: 1.3rem"
                >
                  2
                </span>
              </div>
            </div>
            <div style="text-aglin: center">
              <img src="@/assets/logo.png" style="width: 3rem; height: 3rem" />
              <div style="margin-top: 0.5rem">
                <span style="margin-right: 0.3rem">车库</span>
                <span
                  style="font-weight: bolder; color: #fdb347; font-size: 1.3rem"
                >
                  2
                </span>
              </div>
            </div>
            <div style="text-aglin: center">
              <img src="@/assets/logo.png" style="width: 3rem; height: 3rem" />
              <div style="margin-top: 0.5rem">
                <span style="margin-right: 0.3rem">车库</span>
                <span
                  style="font-weight: bolder; color: #4880ff; font-size: 1.3rem"
                >
                  2
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="body" style="margin-top: 1rem">
          <div class="card_title">月收入排行</div>
          <div class="dis">
            <div v-for="(item, m) in form2" :key="m" style="text-align: center">
              <img
                src="@/assets/logo.png"
                style="width: 2.6rem; height: 2.6rem"
              />
              <div style="margin-bottom: 0.4rem; margin-top: 1rem">
                <span style="font-size: 0.8rem">￥</span>
                <span style="font-size: 1.4rem; font-weight: bolder">
                  {{ item.money }}
                </span>
              </div>
              <span style="color: #999999; font-size: 0.8rem">
                {{ item.carBarnName }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        form1: [
          {
            name: "总支付(元)",
            num: "31,589",
          },
          {
            name: "退款金额(元)",
            num: "7,468,896",
          },
          {
            name: "总收入(元)",
            num: "217",
          },
        ],
        // form2: [
        //   {
        //     state: 0,
        //     money: "31,589",
        //     carBarnName: "商鼎国际2号楼车库",
        //   },
        //   {
        //     state: 0,
        //     money: "31,589",
        //     carBarnName: "商鼎国际2号楼车库",
        //   },
        //   {
        //     state: 0,
        //     money: "31,589",
        //     carBarnName: "商鼎国际2号楼车库",
        //   },
        // ],
        // tableData: [
        //   {
        //     type: "门禁",
        //     carBarnName: "商鼎国际2号楼车库",
        //     reason: "北门开门时长常超过30秒",
        //     state: "未处理",
        //   },
        //   {
        //     type: "门禁",
        //     carBarnName: "商鼎国际2号楼车库",
        //     reason: "北门开门时长常超过30秒",
        //     state: "未处理",
        //   },
        //   {
        //     type: "门禁",
        //     carBarnName: "商鼎国际2号楼车库",
        //     reason: "北门开门时长常超过30秒",
        //     state: "未处理",
        //   },
        // ],
      };
    },
    mounted() {
      this.line();
      this.pie();
    },
    methods: {
      line() {
        let myChart = this.$echarts.init(this.$refs.myChart1);
        myChart.setOption({
          title: {
            show: true,
            text: "收入走势",
          },
          legend: {
            left: "15%",
            data: ["包月", "临停"],
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: [
              "11.07",
              "11.08",
              "11.09",
              "11.10",
              "11.11",
              "11.12",
              "11.13",
            ],
          },
          yAxis: {
            name: "万",
            type: "value",
            data: [2, 4, 6, 8, 10],
            min: 0,
            max: 10,
            axisTick: {
              alignWithLabel: true,
            },
          },
          series: [
            {
              name: "包月",
              data: [2, 4, 3, 6, 7, 8, 6],
              type: "line",
              smooth: true,
              itemStyle: {
                color: "#4880ff",
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
                  {
                    offset: 0,
                    color: "#4880ff",
                  },
                  {
                    offset: 1,
                    color: "#fff",
                  },
                ]),
              },
            },
            {
              name: "临停",
              data: [2, 5, 4, 7, 6, 8, 10],
              type: "line",
              smooth: true,
              itemStyle: {
                color: "#3ad89b",
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
                  {
                    offset: 0,
                    color: "#3ad89b",
                  },
                  {
                    offset: 1,
                    color: "#fff",
                  },
                ]),
              },
            },
          ],
        });
      },
      pie() {
        let myChart = this.$echarts.init(this.$refs.myChart2);
        myChart.setOption({
          title: {
            text: "车辆类型占比",
          },
          legend: {
            orient: "vertical",
            left: "15%",
            top: "25%",
            data: ["电动车", "摩托车", "自行车", "其它车辆"],
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: ["50%", "70%"],
              left: "10%",
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "15",
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: 42, name: "电动车", itemStyle: { color: "#4880ff" } },
                { value: 30, name: "摩托车", itemStyle: { color: "#3ad89b" } },
                { value: 19, name: "自行车", itemStyle: { color: "#ffc442" } },
                { value: 9, name: "其它车辆", itemStyle: { color: "#fe974a" } },
              ],
            },
          ],
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import "../common/list.scss";
  .body {
    padding: 1.6rem 2rem;
    background: #ffffff;
    border-radius: 8px;
  }
  .title {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
  }
  .title_card {
    width: 11.6rem;
  }
  .title_span {
    font-size: 2rem;
    font-weight: bold;
    color: rgba(72, 128, 255, 1);
  }
  .line {
    width: 44rem;
    height: 18.5rem;
    margin-bottom: 1rem;
  }
  .pie {
    height: 11rem;
    margin-bottom: 1rem;
  }
  .dis {
    display: flex;
    justify-content: space-around;
  }
  .card_title {
    font-weight: bolder;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
</style>
