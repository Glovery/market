<template>
  <section class="mainContent">
    <div class="searchForm">
      <el-form :model="queryForm" label-width="90px" ref="queryForm" size="small">
        <el-row>
          <el-col :span="4">
            <el-form-item label="用户名：" prop="username">
              <el-input v-model="queryForm.username" placeholder="请输入用户名" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="联系方式：" prop="phone">
              <el-input v-model="queryForm.phone" placeholder="请输入联系方式" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item>
              <el-button size="medium" type="primary" @click="_userList()">搜索</el-button>
              <el-button size="medium" type="primary" @click.native="resetForm('queryForm')">重置</el-button>
              <el-button size="medium" type="primary" @click="openDialog">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="userTable">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="roleId" label="用户角色"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="IP" label="Ip地址"></el-table-column>
        <el-table-column fixed="right" label="操作" v-if="this.roleId === '0'">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editDialog(scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleDelete(scope.row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="prev,next,total,pager,jumper"
        :total="total"
        :page-size="pageSize"
      ></el-pagination>
    </div>
    <!-- 新增用户 -->
    <el-dialog :visible.sync="dialogFormVisible" title="新增用户" width="30%" :show-close="false">
      <el-form :model="dialogForm" ref="dialogForm" label-width="100px" :rules="rule">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="dialogForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="dialogForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="roleId">
          <el-select v-model="dialogForm.roleId" placeholder="请选择用户角色" clearable>
            <el-option
              v-for="item in roleOptions"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="dialogForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dialogForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Ip地址" prop="IP">
          <el-input v-model="dialogForm.IP"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" size="small" @click="closeDialog('dialogForm')">取消</el-button>
        <el-button type="primary" size="small" @click="confirmDialog">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户信息 -->
    <el-dialog :visible.sync="editFormVisible" title="编辑用户信息" width="30%" :show-close="false">
      <el-form :model="editForm" ref="editForm" label-width="100px" :rules="rule">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="roleId">
          <el-select v-model="editForm.roleId" placeholder="请选择用户角色" clearable>
            <el-option
              v-for="item in roleOptions"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Ip地址" prop="IP">
          <el-input v-model="editForm.IP"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" size="small" @click="cancelEditDialog('editForm')">取消</el-button>
        <el-button type="primary" size="small" @click="confirmEditDialog('editForm')">确定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import {
  resigter,
  userList,
  queryUser,
  update,
  deleteUser
} from "../api/api.js";
export default {
  data() {
    return {
      queryForm: {
        username: "",
        phone: ""
      },
      roleId: "",
      username: "",
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 30,
      dialogFormVisible: false,
      editFormVisible: false,
      dialogForm: {
        username: "",
        password: "",
        phone: "",
        email: "",
        roleId: "",
        IP: ""
      },
      editForm: {
        username: "",
        phone: "",
        email: "",
        roleId: "",
        IP: ""
      },
      rule: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "请输入6-20位数密码，密码由字母、数字组成，区分大小写",
            pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,20}$/,
            trigger: "blur"
          }
        ],
        roleId: [
          { required: true, message: "请输入用户角色", trigger: "blur" }
        ],
        phone: [
          {
            required: true,
            message: "请输入联系方式",
            trigger: "blur",
            pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            pattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            trigger: "blur"
          }
        ]
      },
      roleOptions: [
        {
          id: "0",
          name: "超级管理员"
        },
        {
          id: "1",
          name: "管理员"
        },
        {
          id: "2",
          name: "普通用户"
        }
      ]
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    openDialog() {
      this.dialogFormVisible = true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    closeDialog(formName) {
      this.resetForm(formName);
      this.dialogFormVisible = false;
    },
    confirmDialog() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          let paramData = {
            username: this.dialogForm.username,
            roleId: this.dialogForm.roleId,
            email: this.dialogForm.email,
            phone: this.dialogForm.phone,
            IP: this.dialogForm.IP,
            password: this.dialogForm.password
          };
          resigter(paramData).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: "用户创建成功",
                type: "success"
              });
              this._userList();
            } else {
              this.$message.error("创建用户失败");
            }
          });
        }
      });
      this.$refs.dialogForm.resetFields();
      this.dialogFormVisible = false;
    },
    _userList() {
      let paramData = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        username: this.queryForm.username,
        phone: this.queryForm.phone
      };
      userList(paramData).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.rows;
          this.tableData.forEach(item => {
            if (item.roleId === "0") {
              item.roleId = "超级管理员";
            } else if (item.roleId === "1") {
              item.roleId = "管理员";
            } else {
              item.roleId = "普通用户";
            }
          });
          this.total = res.data.data.count;
        }
      });
    },
    editDialog(row) {
      this.editFormVisible = true;
      let paramData = {
        username: row.username
      };
      queryUser(paramData).then(res => {
        if (res.data.code === 200) {
          this.editForm = res.data.data;
        }
      });
    },
    cancelEditDialog(formName) {
      this.$refs[formName].resetFields();
      this.editFormVisible = false;
      this.editForm = {
        username: "",
        email: "",
        phone: "",
        IP: "",
        roleId: ""
      };
    },
    confirmEditDialog(formName) {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          let paramData = {
            username: this.editForm.username,
            email: this.editForm.email,
            phone: this.editForm.phone,
            IP: this.editForm.IP,
            roleId: this.editForm.roleId
          };
          update(paramData).then(res => {
            if (res.data.code === 200) {
              this._userList();
            } else {
              this.$message.error("修改用户信息失败");
            }
          });
          this.cancelEditDialog(formName);
        }
      });
    },
    handleDelete(row) {
      this.$confirm("是否删除本条数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser(row.id).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this._userList();
            }
          });
        })
        .catch(() => {
          this.$message({
            message: "已取消删除",
            type: "info"
          });
        });
    },
    getUserInfo() {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      this.username = userInfo.username;
      this.roleId = userInfo.roleId;
    }
  },
  mounted() {
    this._userList();
    this.getUserInfo();
  }
};
</script>

<style lang="scss">
.searchForm {
  padding: 20px 0px;
}
.userTable {
  padding: 0 10px;
}
</style>

