<template>
  <div>
    <div class="sysJur_head">
      <div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">角色管理</el-menu-item>
          <el-menu-item index="2">部门管理</el-menu-item>
          <el-menu-item index="3">平台用户</el-menu-item>
        </el-menu>
      </div>
      <div>
        <el-button type="primary" round size="medium" @click="open">
          {{ c_button }}
        </el-button>
      </div>
    </div>
    <div v-if="activeIndex == 1" class="list_body">
      <el-table
        :data="tableData"
        borderstyle="width: 100%"
        size="small"
        stripe
        style="margin-bottom: 0.2rem"
        fit
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="roleName" label="名称"></el-table-column>
        <el-table-column prop="createAt" label="创建时间"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">
              编辑
            </el-button>
            <el-button type="text" size="small" @click="delete1(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="activeIndex == 2" class="list_body">
      <el-table
        :data="tableData2"
        borderstyle="width: 100%"
        size="small"
        stripe
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="deptName" label="名称"></el-table-column>
        <el-table-column prop="createAt" label="创建时间"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handleClick1(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="activeIndex == 3" class="list_body">
      <div>
        <el-table
          :data="tableData2"
          borderstyle="width: 100%"
          size="small"
          stripe
          @expand-change="expandChange"
        >
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table v-loading="loading" :data="scope.row.user" size="small">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column
                  prop="username"
                  label="登录名"
                ></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column
                  prop="createdAt"
                  label="创建时间"
                ></el-table-column>
                <el-table-column prop="software" label="操作">
                  <template slot-scope="{ row }">
                    <el-button
                      type="text"
                      size="small"
                      @click="handleClick(row)"
                    >
                      编辑
                    </el-button>
                    <el-button type="text" size="small" @click="delete2(row)">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="deptName" label="名称"></el-table-column>
          <el-table-column prop="createAt" label="创建时间"></el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="30%"
      custom-class="dialog"
    >
      <el-form ref="form1" :model="form1" label-width="90px">
        <el-form-item label="角色名称">
          <el-input
            v-model="form1.name"
            style="width: 18rem"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-checkbox-group v-model="form1.menuIds">
            <el-checkbox
              label="新增/编辑车库"
              style="display: block"
            ></el-checkbox>
            <el-checkbox label="财务统计" style="display: block"></el-checkbox>
            <el-checkbox label="删除车库" style="display: block"></el-checkbox>
            <el-checkbox label="审核信息" style="display: block"></el-checkbox>
            <el-checkbox label="权限分配" style="display: block"></el-checkbox>
            <el-checkbox
              label="查看系统日志"
              style="display: block"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 40%" @click="dialogVisible = false">
            取消
          </el-button>
          <el-button type="primary" style="width: 40%" @click="putRoles">
            确认
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="添加部门"
      :visible.sync="dialogVisible2"
      width="30%"
      custom-class="dialog"
    >
      <el-form ref="form2" :model="form2" label-width="90px">
        <el-form-item label="部门名称">
          <el-input
            v-model="form2.name"
            style="width: 18rem"
            placeholder="运营部"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 40%" @click="dialogVisible2 = false">
            取消
          </el-button>
          <el-button type="primary" style="width: 40%" @click="putDepartments">
            确认
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="添加平台用户"
      :visible.sync="dialogVisible3"
      width="30%"
      custom-class="dialog"
    >
      <el-form ref="form3" :model="form3" label-width="90px">
        <el-form-item label="登录名">
          <el-input
            v-model="form3.username"
            style="width: 18rem"
            placeholder="请输入登录名如：admin+名字拼音"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form3.password"
            style="width: 18rem"
            placeholder="请输入6位以上密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门ID">
          <el-input
            v-model="form3.depId"
            style="width: 18rem"
            placeholder="请输入部门ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model="form3.name"
            style="width: 18rem"
            placeholder="请输入用户真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input
            v-model="form3.phone"
            style="width: 18rem"
            placeholder="请输入有效手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 40%" @click="dialogVisible3 = false">
            取消
          </el-button>
          <el-button type="primary" style="width: 40%" @click="putUser">
            确认
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  // import {
  //   getDepartments,
  //   putDepartments,
  //   deleteDepartments,
  //   getRoles,
  //   putRoles,
  //   deleteRoles,
  //   getUser,
  //   putUser,
  //   deleteUser
  // } from "@/api/dxapi";
  export default {
    components: {},
    data() {
      return {
        form: {
          name: "",
          data: "",
        },
        c_button: "添加角色",
        activeIndex: "1",
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible3: false,
        loading: true,
        tableData: [],
        tableData2: [],
        tableData3: [],
        form1: {
          name: "",
          menuIds: [0, 1],
        },
        form2: {
          name: "",
        },
        form3: {
          username: "",
          password: "",
          deptId: "",
          name: "",
          phone: "",
        },
      };
    },
    created() {
      this.getRoles();
      this.getDepartments();
    },
    methods: {
      handleSelect(key) {
        this.activeIndex = key;
        if (key == 1) {
          this.c_button = "添加角色";
        } else if (key == 2) {
          this.c_button = "添加部门";
        } else if (key == 3) {
          this.c_button = "添加平台用户";
        }
      },
      handleClick1(key) {
        this.$confirm("此操作将永久删除该部门 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "primary",
        }).then(() => {
          deleteDepartments(key.id).then((res) => {
            if (res.success) {
              this.getDepartments();
            }
          });
        });
      },
      open() {
        var key = this.activeIndex;
        if (key == 1) {
          this.dialogVisible = true;
        } else if (key == 2) {
          this.dialogVisible2 = true;
        } else if (key == 3) {
          this.dialogVisible3 = true;
        }
      },
      getDepartments() {
        getDepartments().then((res) => {
          this.tableData2 = res.data;
        });
      },
      putDepartments() {
        if (this.form2.name != "") {
          putDepartments(this.form2).then((res) => {
            if (res.success) {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.dialogVisible2 = false;
              this.getDepartments();
            }
          });
        }
      },
      getRoles() {
        getRoles().then((res) => {
          this.tableData = res.data;
        });
      },
      putRoles() {
        if (this.form1.name != "" || this.form1.menuIds.length != 0) {
          putRoles(this.form1).then((res) => {
            if (res.success) {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.dialogVisible = false;
              this.getRoles();
            }
          });
        }
      },
      delete1(key) {
        this.$confirm("此操作将永久删除该角色 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "primary",
        }).then(() => {
          deleteRoles(key.id).then((res) => {
            if (res.success) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getRoles();
            }
          });
        });
      },
      delete2(key) {
        // deleteUser(key.id)
      },
      expandChange(row, expandedRows) {
        if (expandedRows.length != 0) {
          getUser(expandedRows[0].id).then((res) => {
            // for (var item of this.tableData2) {
            //   if (item.id == expandedRows[0].id) {
            //     this.$set(item,'user',res.data)
            //   }
            // }
            row.user = res.data;
            this.loading = false;
          });
        }
      },
      putUser() {
        putUser(this.form3).then((res) => {
          if (res.success) {
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.dialogVisible3 = false;
            this.getDepartments();
          }
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
  .sysJur_head {
    padding: 0.6rem 1.6rem 0rem 0.6rem;
    background-color: #fff;
    display: flex;
    border-radius: 8px;
    margin-bottom: 1rem;
    justify-content: space-between;
    align-items: center;
  }
</style>
