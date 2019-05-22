<template>
  <div class="content">
    <div class="registerContent">
      <el-form :model="regForm" ref="regForm" class="regForm" :rules="rules" label-width="80px">
        <h3 class="title">用户注册</h3>
        <el-form-item label="用户名" prop="username">
          <i>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-login"></use>
            </svg>
          </i>
          <el-input v-model="regForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <i>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-mima"></use>
            </svg>
          </i>
          <el-input v-model="regForm.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <i>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-mima"></use>
            </svg>
          </i>
          <el-input v-model="regForm.confirmPassword" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitForm('regForm')">确认</el-button>
          <el-button size="small" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import iconfont from "../assets/css/iconfont.js"; //矢量图标
export default {
  data() {
    return {
      regForm: {
        username: "",
        password: "",
        confirmPassword: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名,至少6位",
            pattern: /^\w{6,20}$/g,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入6-20位密码(必须有大小写及数字)",
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,20}$/g,
            trigger: "blur"
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: "请再次输入密码",
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,20}$/g,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formname) {
      this.$refs.formname.validate(valid => {
        if (vaild) {
          if (this.regForm.password === this.regForm.confirmPassword) {
            alert("submit success");
          } else {
            this.$message.error("密码不一致，请重新输入");
          }
        } else {
          return false;
        }
      });
    },
    login() {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.registerContent {
  width: 100%;
  min-width: 1200px;
  height: 100vh;
  background: url("../assets/img/login-bg.jpg");
  position: relative;
  .regForm {
    position: absolute;
    width: 15%;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 50px;
    .icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    i {
      position: absolute;
      z-index: 1;
    }
    .title {
      text-align: center;
      margin-bottom: 20px;
      line-height: 30px;
      color: #fff;
      font-size: 30px;
      letter-spacing: 5px;
    }
    .el-form-item {
      margin-bottom: 35px;
    }
  }
}
</style>

