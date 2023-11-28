<template>
  <div>
    <div class="list_head">
      <el-form ref="form" :model="form" inline="true">
        <el-form-item label="接收对象">
          <el-select
            v-model="form.region"
            placeholder="全部"
            style="width: 7rem"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息类型">
          <el-select
            v-model="form.region"
            placeholder="全部"
            style="width: 7rem"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息状态">
          <el-select
            v-model="form.region"
            placeholder="全部"
            style="width: 7rem"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送日期">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="选择日期"
            style="width: 10rem"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="消息标题">
          <el-input
            v-model="form.name"
            placeholder="请输入消息标题或者关键字"
            style="width: 9rem"
          ></el-input>
        </el-form-item>
        <el-button type="primary" style="margin-left: 0.1rem">搜索</el-button>
        <el-button type="info">重置</el-button>
      </el-form>
    </div>
    <div class="list_body">
      <div class="body_head">
        <div class="tip">消息列表</div>
        <div>
          <el-button
            type="primary"
            round
            size="small"
            @click="dialogVisible2 = true"
          >
            发送消息
          </el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        borderstyle="width: 100%"
        size="small"
        stripe="true"
        style="margin-bottom: 0.2rem"
        fit="true"
      >
        <el-table-column prop="date" label="接收对象"></el-table-column>
        <el-table-column prop="name" label="消息类型"></el-table-column>
        <el-table-column prop="address" label="消息标题"></el-table-column>
        <el-table-column prop="address" label="消息内容"></el-table-column>
        <el-table-column prop="address" label="消息图片"></el-table-column>
        <el-table-column prop="address" label="发送人"></el-table-column>
        <el-table-column prop="address" label="发出时间"></el-table-column>
        <el-table-column prop="address" label="消息状态"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">
              审核
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handleClick2(scope.row)"
            >
              撤回
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
      title="信息审核"
      :visible.sync="dialogVisible"
      width="30%"
      custom-class="dialog"
    >
      <div class="dia_text">
        <span>发送对象：</span>
        <span>用户</span>
      </div>
      <div class="dia_text">
        <span>消息类型：</span>
        <span>系统消息</span>
      </div>
      <div class="dia_text">
        <span>消息标题：</span>
        <span>关于大象车库系统2.0升级通知</span>
      </div>
      <div class="dia_text">
        <span>消息内容：</span>
        <div style="margin-top: 1rem; line-height: 1.5">
          为更好得提升系统用户体验，完善系统功能细节，提高用户得操作体验，大象车库2.0系统更新，将于2020年2月22日0:00~6:
        </div>
      </div>
      <div class="dia_text" style="display: flex; align-items: flex-start">
        <span>消息图片：</span>
        <img src="@/assets/logo.png" style="width: 6rem; height: 4rem" />
      </div>
      <div class="dia_text">
        <span>发出时间：</span>
        <span>2019-12-04 12:00</span>
      </div>
      <div style="display: flex; justify-content: space-between">
        <el-button style="width: 45%">驳回</el-button>
        <el-button type="primary" style="width: 45%">审核通过</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="发送消息"
      :visible.sync="dialogVisible2"
      width="55%"
      custom-class="dialog"
    >
      <el-form ref="form1" :model="form1" label-width="90px">
        <el-form-item label="接收对象">
          <el-select
            v-model="form1.region"
            placeholder="用户"
            style="width: 16.3rem"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息类型">
          <el-select
            v-model="form1.region"
            placeholder="系统消息"
            style="width: 16.3rem"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息标题">
          <el-input
            v-model="form1.deviceSn"
            style="width: 32rem"
            placeholder="请输入消息标题，30字以内"
          ></el-input>
        </el-form-item>
        <el-form-item label="消息内容">
          <el-input
            v-model="textarea"
            type="textarea"
            :rows="5"
            placeholder="请输入消息内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="消息图片"></el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 20%">发送</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible3"
      width="30%"
      custom-class="dialog"
    >
      <div style="text-align: center">
        <img style="width: 3rem; height: 3rem" src="@/assets/ts_03.png" />
        <div style="width: 70%; margin: 1.2rem auto 0">
          是否确认撤回该消息？撤回后消息需重新提交，才能审核发送哦！！
        </div>
      </div>
      <div style="text-align: center; margin-top: 3rem">
        <el-button style="width: 40%">取消</el-button>
        <el-button type="primary" style="width: 40%">确定</el-button>
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
        form1: {
          device: "",
          regoin: "",
        },
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible3: false,
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
      handleClick2() {
        this.dialogVisible3 = true;
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
  .dia_text {
    margin-bottom: 1.9rem;
  }
  .dia_text > span:first-child {
    font-weight: bolder;
  }
</style>
