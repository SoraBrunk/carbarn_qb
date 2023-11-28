<template>
  <div class="body">
    <div
      class="list_body"
      style="width: 18%; margin-right: 0.5rem; text-align: left"
    >
      <div class="body_head">
        <div class="tip">车库选择</div>
      </div>
      <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item v-for="(item, i) in allCarBarn" :key="i" :index="i">
          <span slot="title">{{ item.carBarnName }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="list_body" style="flex-grow: 1">
      <div class="body_head">
        <div class="tip">商鼎国际2号楼车库</div>
        <div>
          <el-button type="primary" round size="small">批量删除</el-button>
          <el-button
            type="success"
            round
            size="small"
            @click="dialogVisible = true"
          >
            新增设备
          </el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        borderstyle="width: 100%"
        size="small"
        stripe
        style="margin-bottom: 0.2rem"
        fit
      >
        <el-table-column
          prop="date"
          label="设备编号"
          type="selection"
        ></el-table-column>
        <el-table-column prop="manufacturer" label="厂商"></el-table-column>
        <el-table-column prop="reportIp" label="IP地址"></el-table-column>
        <el-table-column prop="reportPort" label="端口号"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="address" label="操作">
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="1"
        :page-sizes="[10]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :hide-on-single-page="total < 11"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <el-dialog
      title="新增设备"
      :visible.sync="dialogVisible"
      width="30%"
      custom-class="dialog"
    >
      <el-form ref="form1" :model="form1" label-width="90px">
        <el-form-item label="设备编号">
          <el-input
            v-model="form1.deviceSn"
            style="width: 17rem"
            placeholder="请输入设备编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="厂商">
          <el-input
            v-model="form1.manufacturer"
            style="width: 17rem"
            placeholder="请输入设备厂商"
          ></el-input>
        </el-form-item>
        <el-form-item label="IP地址">
          <el-input
            v-model="form1.reportIp"
            style="width: 17rem"
            placeholder="请输入IP地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="端口号">
          <el-input
            v-model="form1.reportPort"
            style="width: 17rem"
            placeholder="请输入设备端口号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 40%">取消</el-button>
          <el-button type="primary" style="width: 40%" @click="pDevice">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  // import { getAreaCarBarn, putDevice, getDevice } from "@/api/dxapi";
  export default {
    components: {},
    data() {
      return {
        form: {
          carbarnId: "",
          pageNum: 1,
          pageSize: 10,
        },
        dialogVisible: false,
        total: 0,
        allCarBarn: [],
        form1: {
          carBarnId: 19,
          deviceSn: "",
          manufacturer: "",
          reportIp: "",
          reportPort: "",
        },
        tableData: [],
      };
    },
    created() {
      this.getCarBarn();
    },
    methods: {
      handleSelect(index) {
        this.gDevice(this.allCarBarn[index].carBarnId);
        this.form1.carBarnId = this.allCarBarn[index].carBarnId;
      },
      handleCurrentChange() {},
      getCarBarn() {
        getAreaCarBarn().then((res) => {
          this.allCarBarn = res.data;
          this.gDevice(res.data[0].carBarnId);
          this.form1.carBarnId = res.data[0].carBarnId;
        });
      },
      pDevice() {
        var form1 = this.form1;
        if (
          form1.deviceSn &&
          form1.manufacturer &&
          form1.reportIp &&
          form1.reportPort
        ) {
          if (this.form1.carBarnId == -1) {
            this.$message("请先选择车库");
          } else {
            putDevice(this.form1).then((res) => {
              if (res.success) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.gDevice(this.form1.carBarnId);
                this.dialogVisible = false;
              }
            });
          }
        } else {
          this.$message("请填写完整信息");
        }
      },
      gDevice(carBarnId) {
        this.form.carbarnId = carBarnId;
        getDevice(this.form).then((res) => {
          this.total = res.data.total;
          this.tableData = res.data.result;
        });
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
  .body {
    display: flex;
  }
</style>
