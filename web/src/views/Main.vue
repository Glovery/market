<template>
  <div class="mianWrapper">
    <div class="formContent">
      <div class="userInfo">
        <span class="user">当前登录用户：{{username}}</span>
        <span class="role">角色：{{roles}}</span>
      </div>
      <el-form
        ref="passwordForm"
        :rules="rules"
        :model="passwordForm"
        class="passwordForm"
        label-width="100px"
      >
        <el-form-item prop="oldPassword" label="旧的密码：">
          <el-input v-model="passwordForm.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新的密码：">
          <el-input v-model="passwordForm.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码：">
          <el-input
            v-model="passwordForm.confirmPassword"
            type="password"
            @keyup.enter.native="submitForm('passwordForm')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submitForm('passwordForm')">提交</el-button>
          <el-button size="small" @click="resetForm('passwordForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { update } from "../api/api.js";
export default {
  data() {
    return {
      username: "",
      roles: "",
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        newPassword: [
          {
            required: true,
            message: "请输入6-20位数密码，密码由字母、数字组成，区分大小写",
            pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,20}$/,
            trigger: "blur"
          }
        ],
        confirmPassword: [
          { required: true, message: "请输入6-20位密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(vaild => {
        if (vaild) {
          if (
            this.passwordForm.newPassword === this.passwordForm.confirmPassword
          ) {
            let paramData = {
              username: this.username,
              password: this.passwordForm.newPassword
            };
            update(paramData).then(res => {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.resetForm("passwordForm");
            });
          } else {
            this.$message.error("输入密码不一致，请重新输入");
            this.resetForm("passwordForm");
          }
        }
      });
    },
    getUserInfo() {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      this.roles = userInfo.roleId;
      this.username = userInfo.username;
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>
<style lang="scss" scoped>
.mianWrapper {
  position: relative;
  height: calc(100vh - 90px);
  background-color: #e0e0e0;
  .formContent {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25%;
    padding: 10px;
    .userInfo {
      padding: 10px 40px 30px;
      .user {
        margin-right: 60px;
      }
    }
    .passwordForm {
      background-color: #fff;
      padding: 20px 10px 10px 0;
    }
  }
}
.el-form-item__label {
  color: #000;
}
</style>

