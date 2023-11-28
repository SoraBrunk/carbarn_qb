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
        <el-form-item label="订单编号：">
          <el-input
            v-model="select.orderNum"
            style="width: 300px"
            placeholder="请输入订单编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属车库：" prop="carBarn">
          <el-select
            v-model="select.carBarn"
            placeholder="请选择所属车库"
            style="width: 150px"
          >
            <el-option
              v-for="item in begin.carBarn"
              :key="item.carBarnId"
              :label="item.carBarnName"
              :value="item.carBarnId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询期限：" prop="day">
          <el-select
            v-model="select.day"
            placeholder="请选择查询天数"
            style="width: 150px"
          >
            <!-- <el-option
              v-for="item in begin.carBarn"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option> -->
            <el-option label="7天" value="7"></el-option>
            <el-option label="30天" value="30"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSelect(1)">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row :gutter="10">
      <div class="title">
        <h3>出入库记录列表</h3>
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
          min-width="110"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="开门时间"
          prop="parkingAt"
          min-width="160"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="开门门号"
          prop="gateNum"
          min-width="70"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="车型"
          prop="carTypeStr"
          min-width="80"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="停车类型"
          prop="parkingTypeStr"
          min-width="80"
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
  import { outIn } from "@/api/record";
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
          carBarn: "",
          orderNum: "",
          chargeType: "计时充电",
          day: "",
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
        data.orderNum = form.orderNum;
        data.dayBeforeNow = form.day;
        data.userName = form.name;
        data.phone = form.phone;
        var res = await outIn(data);
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
      reset() {
        this.select.name = "";
        this.select.pageNum = 1;
        this.select.phone = "";
        this.select.carBarn = "";
        this.select.orderNum = "";
        this.select.day = "";
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
