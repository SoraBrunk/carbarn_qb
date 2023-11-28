<template>
  <div>
    <div class="list_head">
      <el-form ref="form" :model="form" inline="true">
        <el-form-item label="用户名">
          <el-input
            v-model="form.name"
            placeholder="请输入登录用户账号"
            style="width: 16.3rem"
          ></el-input>
        </el-form-item>
        <el-form-item label="操作日期">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="选择日期"
            style="width: 16.3rem"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="操作内容">
          <el-input
            v-model="form.name"
            placeholder="请输入操作内容或关键字"
            style="width: 19.3rem"
          ></el-input>
        </el-form-item>
        <el-button type="primary" style="margin-left: 0.5rem">搜索</el-button>
        <el-button type="info">重置</el-button>
      </el-form>
    </div>
    <div class="list_body">
      <div class="body_head">
        <div class="tip">日志列表</div>
      </div>
      <el-table
        :data="tableData"
        borderstyle="width: 100%"
        size="small"
        stripe="true"
        style="margin-bottom: 0.2rem"
        fit="true"
      >
        <el-table-column prop="date" label="IP地址"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="address" label="角色类型"></el-table-column>
        <el-table-column prop="address" label="所属部门"></el-table-column>
        <el-table-column prop="address" label="操作内容"></el-table-column>
        <el-table-column prop="address" label="操作时间"></el-table-column>
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
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        form: {
          name: "",
          data: "",
        },
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
    methods: {},
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
</style>
