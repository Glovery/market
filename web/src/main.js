import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'
import promise from 'es6-promise'

import './assets/css/common.css' //引入公共样式

Vue.config.productionTip = false;
Vue.use(elementUI)
Vue.prototype.$axios = axios;
// axios promise 兼容ie
promise.polyfill();

axios.defaults.baseURL = '/api/v1';
axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token')
axios.interceptors.response.use(res => {
    if (res.data.code === 401) {
      this.$alert('用户信息已失效，请重新登录', {
        confirmButtonText: '确定',
        callback: action => {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('username');
          router.replace({
            path: '/login'
          })
        }
      })
    }
    return res;
    console.log(res)
  },
  error => {}
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");