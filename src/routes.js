import VueRouter from 'vue-router'
import Login from "./views/Login.vue";
import Start from "./views/Start.vue";

import errorPage from './components/ErrorPage.vue'

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: "/",
            name: "Login",
            component: Login,
        },
        {
            path: '*',
            component: errorPage
        },
    ]
})