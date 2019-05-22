<template>
  <div class="header clearfix">
    <div class="logo">
      <div class="img">
        <img src="../assets/img/logo.jpg" alt>
      </div>
      <h3 class="title">我的后台管理系统</h3>
    </div>
    <div class="toolbox">
      <div class="name">
        <i>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-login"></use>
          </svg>
        </i>
        <span class="user">{{username}}</span>
      </div>
      <div class="logout">
        <a href="javascript:;" class="btn" @click="logout">退出</a>
      </div>
    </div>
  </div>
</template>

<script>
import iconfont from "../assets/css/iconfont.js"; //矢量图标
export default {
  data() {
    return {
      username: ""
    };
  },
  methods: {
    logout() {
      this.$router.push({
        path: "/login"
      });
    }
  },
  mounted() {
    this.username = JSON.parse(sessionStorage.getItem("userInfo")).username;
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 90px;
  line-height: 90px;
  overflow: hidden;
  background-color: rgb(40, 45, 49);
  .logo {
    float: left;
    display: flex;
    .img {
      width: 45px;
      flex: 1;
      margin: 25px 20px 20px;
      img {
        border-radius: 50%;
      }
    }
    .title {
      color: rgb(11, 201, 195);
    }
  }
  .toolbox {
    float: right;
    display: flex;
    margin-right: 50px;
    .name {
      flex: 1;
      margin-right: 20px;
      i {
        float: left;
        height: 90px;
        margin-right: 5px;
      }
      .icon {
        width: 20px;
        height: 90px;
        fill: #fff;
      }
      .user {
        float: left;
        color: rgb(11, 201, 195);
      }
    }
    .btn {
      color: #fff;
    }
  }
}
</style>

