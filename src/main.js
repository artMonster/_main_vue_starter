// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueChatScroll from 'vue-chat-scroll'
import BootstrapVue from 'bootstrap-vue'
import app from './app'
import router from './routes'
import errorPage from './components/ErrorPage'
import store from './store/index.js'



Vue.config.productionTip = false;

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueChatScroll)

Vue.component('error-page', errorPage)

new Vue({
    el: '#app',
    template: '<app/>',
    components: { app },
    router,
    store
});