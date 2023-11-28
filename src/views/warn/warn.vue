<template>
  <div>
    <div class="list_head">
      <el-form ref="form" :model="form" inline="true">
        <el-form-item label="故障类别">
          <el-select
            v-model="form.region"
            placeholder="全部"
            style="width: 10.1rem"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="故障状态">
          <el-select
            v-model="form.region"
            placeholder="全部"
            style="width: 10.1rem"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报警日期">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="选择日期"
            style="width: 11.3rem"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="车库名称">
          <el-input
            v-model="form.name"
            placeholder="请输入车库名称或关键字"
            style="width: 13.3rem"
          ></el-input>
        </el-form-item>
        <el-button type="primary" style="margin-left: 0.5rem" @click="onSubmit">
          搜索
        </el-button>
        <el-button type="info">重置</el-button>
      </el-form>
    </div>
    <div class="list_body">
      <div class="body_head">
        <div class="tip">异常列表</div>
      </div>
      <el-table
        :data="tableData"
        borderstyle="width: 100%"
        size="small"
        stripe="true"
        style="margin-bottom: 0.2rem"
        fit="true"
      >
        <el-table-column prop="date" label="类别"></el-table-column>
        <el-table-column prop="name" label="车库名称"></el-table-column>
        <el-table-column prop="address" label="故障描述"></el-table-column>
        <el-table-column prop="address" label="故障时间"></el-table-column>
        <el-table-column prop="address" label="状态"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">
              故障消除
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
      title="消除故障"
      :visible.sync="dialogVisible"
      width="25%"
      custom-class="dialog"
    >
      <div style="font-weight: bolder; margin-bottom: 0.9rem">故障原因</div>
      <el-input v-model="textarea" type="textarea" :rows="5"></el-input>
      <div style="margin-top: 1.4rem; text-align: center">
        <el-button type="primary" style="width: 9.6rem">确认消除</el-button>
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
          data: "",
        },
        dialogVisible: false,
        textarea: "",
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
</style>
