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
        <el-form-item label="电话号码：">
          <el-input
            v-model="select.phone"
            style="width: 150px"
            placeholder="请输入电话号码"
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
            <!-- <el-option label="中洲" value="3"></el-option> -->
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
        <h3>支付信息列表</h3>
        <div class="title_right">
          <h4>已支付：{{ (moneyTotal.payMoney / 100).toFixed(2) }}元</h4>
          <h4>退款：{{ (moneyTotal.refundMoney / 100).toFixed(2) }}元</h4>
          <h4>总计：{{ (moneyTotal.total / 100).toFixed(2) }}元</h4>
        </div>
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
          min-width="100"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="电话号码"
          prop="phone"
          min-width="110"
          :formatter="phone"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="支付时间"
          prop="payAt"
          min-width="140"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="支付类型"
          prop="payType"
          min-width="100"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="支付金额"
          prop="payMoney"
          min-width="80"
          :formatter="money"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="支付手段"
          prop="payModeStr"
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
          label="备注"
          prop="remark"
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
  import { payDetails, payTotal, carBarnAll } from "@/api/order";
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
          selectTime: "",
        },
        state: 0,
        list: [],
        total: 0,
        moneyTotal: {},
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
        data.phone = form.phone;
        data.carBarnId =
          form.carBarn === this.begin.carBarn[0].carBarnName
            ? this.begin.carBarn[0].carBarnId
            : form.carBarn;
        data.startTime = form.selectTime !== "" ? createTimeStart : "";
        data.endTime = form.selectTime !== "" ? createTimeEnd : "";
        await this.getTotal();
        var res = await payDetails(data);
        this.list = res.data.result;
        this.total = res.data.total;
        this.loading.listLoading = false;
      },
      async getTotal() {
        var form;
        var data = {};
        form = this.select;
        if (form.selectTime) {
          var createTimeStart = form.selectTime[0];
          var createTimeEnd = form.selectTime[1];
        }
        data.pageNum = 0;
        data.pageSize = 0;
        data.carBarnId =
          form.carBarn === this.begin.carBarn[0].carBarnName
            ? this.begin.carBarn[0].carBarnId
            : form.carBarn;
        data.startTime = form.selectTime !== "" ? createTimeStart : "";
        data.endTime = form.selectTime !== "" ? createTimeEnd : "";
        var res = await payTotal(data);
        this.moneyTotal = res.data;
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
      // phone(row) {
      //   if (row.phone) {
      //     var phone = row.phone;
      //     var index = phone.substr(3, 4);
      //     phone = phone.replace(index, "****");
      //     return phone;
      //   }
      // },
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
    .title_right {
      display: flex;
      justify-content: space-around;
      align-items: center;
      h4 ~ h4 {
        margin-left: 20px;
      }
    }
  }
</style>
