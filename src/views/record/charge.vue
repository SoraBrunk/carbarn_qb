<template>
  <div v-if="state == 0" v-loading="loading.all" class="test-container">
    <el-row :gutter="10">
      <el-form
        ref="select"
        :model="select"
        inline
        size="mini"
        class="demo-ruleForm"
        label-width="96px"
      >
        <el-form-item label="用户名：">
          <el-input
            v-model="select.name"
            style="width: 150px"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码：">
          <el-input
            v-model="select.phone"
            style="width: 150px"
            placeholder="请输入电话号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属车库：" prop="carBarn">
          <el-select v-model="select.carBarn" placeholder="请选择所属车库">
            <el-option
              v-for="item in begin.carBarn"
              :key="item.carBarnId"
              :label="item.carBarnName"
              :value="item.carBarnId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充电类型：">
          <el-select
            v-model="select.chargeType"
            placeholder="请选择充电类型"
            style="width: 150px"
          >
            <el-option label="计时充电" value="0"></el-option>
            <el-option label="包月充电" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询日期：">
          <el-date-picker
            v-model="select.selectTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            size="mini"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSelect(1)">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row :gutter="10">
      <div class="title">
        <h3>充电记录列表</h3>
        <!-- <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          round
          size="mini"
          @click="openDiag(0)"
        >
          创建采购计划
        </el-button> -->
      </div>
    </el-row>
    <el-row :gutter="10">
      <el-table
        v-loading="loading.listLoading"
        :data="list"
        :element-loading-text="elementLoadingText"
        fit
        size="mini"
      >
        <el-table-column
          show-overflow-tooltip
          label="序号"
          type="index"
          min-width="90"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="姓名"
          prop="userName"
          min-width="90"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="电话号码"
          prop="phone"
          min-width="110"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="车库名称"
          prop="carBarnName"
          min-width="150"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="创建时间"
          prop="createAtStr"
          min-width="160"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="设备编号"
          prop="deviceSN"
          min-width="100"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="端口号"
          prop="portNum"
          min-width="70"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="充电时长(h)"
          prop="chargeTimeHour"
          min-width="80"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="充电类型"
          prop="chargeTypeStr"
          min-width="100"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="功率"
          prop="maxPower"
          min-width="70"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="用电量（度）"
          prop="powerConsumption"
          min-width="70"
          :formatter="power"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="状态"
          prop="chargeStateStr"
          min-width="80"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="停止原因"
          prop="stopReasonStr"
          min-width="120"
        ></el-table-column>
      </el-table>
    </el-row>
    <el-row :gutter="10">
      <el-pagination
        :total="total"
        hide-on-single-page
        :page-sizes="[10, 20]"
        :page-size="select.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="select.pageNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-row>
  </div>
  <div v-else-if="state == 1">
    <!-- <baidu-map
      class="map"
      style="height:100vh"
      center="北京"
      :mapStyle="mapStyle"
    ></baidu-map> -->
  </div>
</template>
<script>
  import { charge } from "@/api/record";
  import { carBarnAll } from "@/api/order";
  export default {
    components: {},
    data() {
      return {
        loading: {
          all: false,
          listLoading: false,
        },
        begin: {
          carBarn: [],
          country: [],
          group: [],
        },
        dialogVisible: false,
        select: {
          pageNum: 1,
          pageSize: 10,
          name: "",
          phone: "",
          carBarn: "中洲",
          chargeType: "计时充电",
          selectTime: "",
        },
        state: 0,
        list: [],
        total: 0,
        listLoading: false,
        elementLoadingText: "正在加载...",
      };
    },
    created() {
      this.getType();
    },
    methods: {
      async getType() {
        this.loading.all = true;
        var carBarnId = await carBarnAll();
        this.begin.carBarn = carBarnId.data;
        this.select.carBarn = carBarnId.data[0].carBarnName;
        await this.onSelect(1);
        this.loading.all = false;
      },
      async onSelect(type) {
        this.loading.listLoading = true;
        var form;
        var data = {};
        form = this.select;
        if (form.selectTime) {
          var createTimeStart = form.selectTime[0];
          var createTimeEnd = form.selectTime[1];
        }
        if (type === 1) {
          data.pageNum = 1;
        } else {
          data.pageNum = form.pageNum;
        }
        data.pageSize = form.pageSize;
        data.carBarnId =
          form.carBarn === this.begin.carBarn[0].carBarnName
            ? this.begin.carBarn[0].carBarnId
            : form.carBarn;
        data.userName = form.name;
        data.phone = form.phone;
        data.chargeType = form.chargeType === "计时充电" ? 0 : form.chargeType;
        data.startTime = form.selectTime !== "" ? createTimeStart : "";
        data.endTime = form.selectTime !== "" ? createTimeEnd : "";
        var res = await charge(data);
        this.list = res.data.result;
        this.total = res.data.total;
        this.loading.listLoading = false;
      },
      handleCurrentChange(pageNum) {
        this.select.pageNum = pageNum;
        this.onSelect(2);
      },
      handleSizeChange(pageSize) {
        this.select.pageSize = pageSize;
        this.onSelect(2);
        // console.log(pageSize);
      },
      money(row) {
        if (row.payMoney) {
          var payMoney = row.payMoney;
          payMoney = (payMoney / 100).toFixed(2);
          return payMoney;
        }
      },
      power(row) {
        if (row.powerConsumption) {
          var power = row.powerConsumption / 100;
          return power;
        }
      },
      reset() {
        this.select.name = "";
        this.select.pageNum = 1;
        this.select.phone = "";
        this.select.carBarn = "";
        this.select.chargeType = "";
        this.select.selectTime = "";
      },
    },
  };
</script>
<style lang="scss" scoped>
  .title {
    display: flex;
    justify-content: space-between !important;
    align-items: center;
  }
</style>
