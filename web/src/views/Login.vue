<template>
  <div class="content">
    <div class="loginContent">
      <el-form
        ref="loginForm"
        :model="loginForm"
        label-width="80px"
        class="loginForm"
        :rules="rules"
      >
        <h3 class="title">用户登录</h3>
        <el-form-item label="用户名" prop="username">
          <i>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-login"></use>
            </svg>
          </i>
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <i>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-mima"></use>
            </svg>
          </i>
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            @keyup.enter.native="submitForm('loginForm')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox
            v-model="loginForm.state"
            class="remember"
            @change.native.prevent="changeCookie('loginForm')"
          >记住用户名</el-checkbox>
          <div class="btngroup">
            <el-button type="primary" @click="submitForm('loginForm')" size="small">登录</el-button>
            <el-button type="primary" size="small" @click="register">注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import iconfont from "../assets/css/iconfont.js"; //矢量图标
import { login } from "../api/api.js";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        state: true
      },
      rules: {
        username: [
          {
            required: true,
            message: "请正确输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请正确输入密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          let paramData = {
            username: this.loginForm.username,
            password: this.loginForm.password
          };
          login(paramData)
            .then(res => {
              if (res.data.code === 200) {
                if (this.loginForm.state) {
                  this.setCookie("username", this.loginForm.username, 1);
                }
                sessionStorage.setItem(
                  "userInfo",
                  JSON.stringify(res.data.data)
                );
                this.$router.push("/userInfo");
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    changeCookie(formname) {
      if (!formname.state) {
        this.delCookie("username");
      }
    },
    setCookie(key, value, time) {
      var date = new Date(); //获取当前时间
      var expiresDays = time; //将date设置为N天以后的时间
      date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
      document.cookie = key + "=" + value + ";expires=" + date.toGMTString(); //设置cookie
    },
    getCookie(key) {
      var getCookie = document.cookie.replace(/[ ]/g, ""); //获取cookie，并将cookie格式化，去掉空格
      var arrCookie = getCookie.split(";"); //将获得的cookie分割
      var tips;
      for (let i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (key === arr[0]) {
          tips = arr[1];
          break;
        }
      }
      return tips;
    },
    delCookie(key) {
      var date = new Date();
      date.setTime(date.getTime() - 10000);
      document.cookie = key + "=v;expires=" + date.toGMTString();
    },
    register() {
      this.$router.push("/register");
    }
  },
  mounted() {
    if (this.getCookie("username")) {
      this.loginForm.username = this.getCookie("username");
    }
  }
};
</script>
<style lang="scss">
.loginContent {
  width: 100%;
  min-width: 1200px;
  height: 100vh;
  background: url("../assets/img/login-bg.jpg");
  position: relative;
  .loginForm {
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
    .btngroup {
      float: right;
    }
    .remember {
      float: left;
    }
    .el-form-item {
      margin-bottom: 35px;
    }
    .el-checkbox,
    .el-form-item__label {
      color: #fff;
    }
  }
}
</style>


