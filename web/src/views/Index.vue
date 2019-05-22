<template>
  <div class="content">
    <Header></Header>
    <div class="main">
      <el-row class="mainContent">
        <el-col :span="3">
          <el-menu
            class="menuList"
            :default-active="activeIndex"
            background-color="#333"
            text-color="#fff"
            active-text-color="#0bc9c3"
            router
          >
            <template v-for="(menu,i) in menuList">
              <template v-if="menu.subs">
                <el-submenu :index="menu.index" :key="i">
                  <template slot="title">
                    <span>{{menu.title}}</span>
                  </template>
                  <el-menu-item
                    v-for="(submenu,i) in menu.subs"
                    :key="i"
                    :index="submenu.path"
                  >{{submenu.title}}</el-menu-item>
                </el-submenu>
              </template>
            </template>
          </el-menu>
        </el-col>
        <el-col :span="21">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  data() {
    return {
      menuList: [
        {
          title: "个人信息管理",
          index: "1",
          subs: [
            {
              title: "个人信息",
              path: "/userInfo"
            }
          ]
        },
        {
          title: "角色管理",
          index: "2",
          subs: [
            {
              title: "角色信息",
              path: "/roles"
            }
          ]
        },
        {
          title: "订单管理",
          index: "3",
          subs: [
            {
              title: "全部订单",
              path: "/orderList"
            },
            {
              title: "待发货订单",
              path: "/order"
            },
            {
              title: "已发货订单",
              path: "/ordered"
            },
            {
              title: "已删除订单",
              path: "/delOrder"
            }
          ]
        },
        {
          title: "客户管理",
          index: "4",
          subs: [
            {
              title: "客户信息",
              path: "/customerInfo"
            }
          ]
        }
      ],
      activeIndex: ""
    };
  },
  components: {
    Header
  },
  mounted() {
    this.activeIndex = this.$route.matched[1].path;
  }
};
</script>

<style lang="scss" scoped>
.menuList {
  height: calc(100vh - 90px);
}
</style>

