<template>
  <div>
    <div class="list_head">
      <el-form ref="form" :model="form" inline="true">
        <el-form-item label="车辆类型">
          <el-select
            v-model="form.region"
            placeholder="全部"
            style="width: 10.1rem"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="停车类别">
          <el-select
            v-model="form.region"
            placeholder="全部"
            style="width: 10.1rem"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车库名称">
          <el-input
            v-model="form.name"
            placeholder="请输入车库名称或关键字"
            style="width: 13.3rem"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input
            v-model="form.name"
            placeholder="请输入用户姓名"
            style="width: 11.3rem"
          ></el-input>
        </el-form-item>
        <el-button type="primary" style="margin-left: 0.5rem">搜索</el-button>
        <el-button type="info">重置</el-button>
      </el-form>
    </div>
    <div class="list_body">
      <div class="body_head">
        <div class="tip">异常数据</div>
      </div>
      <el-table
        :data="tableData"
        borderstyle="width: 100%"
        size="small"
        stripe="true"
        style="margin-bottom: 0.2rem"
        fit="true"
      >
        <el-table-column prop="date" label="用户"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="性别"></el-table-column>
        <el-table-column prop="address" label="手机号码"></el-table-column>
        <el-table-column prop="address" label="车辆类型"></el-table-column>
        <el-table-column prop="address" label="停车类别"></el-table-column>
        <el-table-column prop="address" label="车库"></el-table-column>
        <el-table-column prop="address" label="状态"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="currentPage4"
        :page-sizes="[10]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <el-dialog
      title="用户详情"
      :visible.sync="dialogVisible"
      width="55%"
      custom-class="dialog"
    >
      <div class="box_title">基本信息</div>
      <div style="display: flex; margin-bottom: 1.6rem">
        <div
          style="
            width: 6rem;
            height: 6rem;
            boder-radius: 50%;
            margin-right: 0.9rem;
          "
        >
          <img src="@/assets/logo.png" style="width: 100%; height: 100%" />
        </div>
        <div>
          <div style="font-weight: bolder; font-size: 1.2rem">吱吱~猫耳朵</div>
          <div style="margin-top: 1rem">
            <span class="details">姓名：杨怡惠</span>
            <span class="details">性别：女</span>
            <span>手机号码：18856896365</span>
          </div>
          <div style="margin-top: 1rem; display: flex">
            <span>照片：</span>
            <img src="@/assets/logo.png" style="width: 7.7rem; height: 8rem" />
          </div>
        </div>
      </div>
      <div class="box_title">停车信息</div>
      <div class="car_details">
        <span>车库名称：商鼎国际2号楼车库</span>
        <span>卡片类型：包月</span>
        <span>卡号：DX0012305</span>
        <span>车辆类型：电动车</span>
        <span>有效时间：2019.12.20~2020.6.12</span>
        <span>房号：1单元520室</span>
        <span>品牌型号：艾玛Q305</span>
        <span>缴费金额：￥60</span>
        <span>使用天数：34天</span>
        <span>剩余金额：￥49.5</span>
        <span>使用状态：使用中</span>
      </div>
      <div class="car_details">
        <span>车库名称：商鼎国际2号楼车库</span>
        <span>卡片类型：包月</span>
        <span>卡号：DX0012305</span>
        <span>车辆类型：电动车</span>
        <span>有效时间：2019.12.20~2020.6.12</span>
        <span>房号：1单元520室</span>
        <span>品牌型号：艾玛Q305</span>
        <span>缴费金额：￥60</span>
        <span>使用天数：34天</span>
        <span>剩余金额：￥49.5</span>
        <span>使用状态：使用中</span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        form: {
          name: "",
        },
        dialogVisible: false,
        tableData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
        ],
      };
    },
    methods: {
      handleClick() {
        this.dialogVisible = true;
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import "../common/list.scss";
  .body_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tip {
    font-size: 1rem;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
  .box_title {
    font-weight: bolder;
    margin-bottom: 1rem;
  }
  .details {
    margin-right: 4rem;
  }
  .car_details {
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    padding-top: 1rem;
    border-top: 1px solid #d0d4d9;
  }
  .car_details > span {
    margin-bottom: 1.7rem;
    flex: 0 0 33%;
  }
</style>
