<template>
  <div>
    <div class="box">
      <div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          text-color="#000"
          active-text-color="#4880FF"
          @select="handleSelect"
        >
          <el-menu-item index="1">头像设置</el-menu-item>
          <el-menu-item index="2">修改密码</el-menu-item>
        </el-menu>
      </div>
      <div v-if="activeIndex == '1'">
        <div style="margin-top: 2.7rem; display: flex">
          <div class="left">
            <div style="margin-bottom: 2.4rem">
              选择本地照片，上传编辑自己的头像
            </div>
            <el-button type="primary">选择图片</el-button>
            <div style="margin-top: 0.6rem; color: #999999">
              支持jpg、jpeg、gif、png、bmp格式的图片
            </div>
          </div>
          <div style="margin-left: 1.7rem; color: #666666">
            <div style="margin-bottom: 0.9rem">头像预览</div>
            <img src="@/assets/logo.png" style="width: 6rem; height: 6rem" />
            <div style="margin-bottom: 3rem">大头像180*180</div>
            <img src="@/assets/logo.png" style="width: 2rem; height: 2rem" />
            <div>小头像44*44</div>
          </div>
        </div>
      </div>
      <div v-if="activeIndex == '2'">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          status-icon
          :rules="rules"
          class="demo-ruleForm"
          inline-message
          label-width="5rem"
          style="margin: 3rem 0 0 3rem"
        >
          <el-form-item label="原密码" prop="oldPassword">
            <el-input
              v-model="ruleForm.oldPassword"
              type="password"
              autocomplete="off"
              style="width: 20rem"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
              style="width: 20rem"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="ruleForm.confirmPassword"
              type="password"
              autocomplete="off"
              style="width: 20rem"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 20rem"
              @click="submitForm('ruleForm')"
            >
              提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  // import { updataPw } from "@/api/dxapi";
  export default {
    components: {},
    data() {
      var oldPass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (value !== this.oldPass) {
          callback(new Error("原密码输入错误"));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        activeIndex: "1",
        oldPass: "123456",
        ruleForm: {
          password: "",
          oldPassword: "",
          confirmPassword: "",
        },
        rules: {
          oldPassword: [{ validator: oldPass, trigger: "blur" }],
          password: [{ validator: validatePass, trigger: "blur" }],
          confirmPassword: [{ validator: validatePass2, trigger: "blur" }],
        },
      };
    },
    mounted() {
      this.oldPass = JSON.parse(localStorage.getItem("Loginremember")).password;
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updataPw(this.ruleForm).then((res) => {
              if (res.success) {
                const Loginremember = JSON.parse(
                  localStorage.getItem("Loginremember")
                );
                Loginremember.password = this.ruleForm.password;
                localStorage.setItem(
                  "Loginremember",
                  JSON.stringify(Loginremember)
                );
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      handleSelect(key) {
        this.activeIndex = key;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .box {
    height: 40rem;
    background: #fff;
    border-radius: 8px;
    padding: 0 1rem;
  }
  .left {
    width: 26rem;
    padding: 0.8rem 0rem 11rem 0rem;
    border-right: 1px solid #e5e5e5;
    text-align: center;
  }
</style>
