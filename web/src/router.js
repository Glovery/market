import Vue from "vue";
import Router from "vue-router";
import Index from './views/Index.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      redirect: {
        name: 'Login'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/index',
      component: Index,
      children: [{
        path: '/userInfo',
        component: () => import('./views/Main.vue')
      }, {
        path: '/roles',
        component: () => import('./views/Roles.vue')
      }]
    }
    /*
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( "./views/About.vue")
    }
    */
  ]
});