// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Router from 'vue-router'
import menuRoutes from './router/menu-routes'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(ElementUI)
Vue.use(Router)
Vue.use(VueAxios, axios)

const router = new Router({
    mode: 'history',
    routes: menuRoutes
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: "<App/>"
})
