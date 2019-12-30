import VueRouter from 'vue-router'
import Login from "./views/Login.vue";
import game from "@/views/Game.vue";
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
            path: '/game',
            name: 'game',
            component: game,
            props: true,
            beforeEnter: (to, from, next) => {
                if (to.params.playername && to.params.playerid) {
                    next();
                } else {
                    next({ name: 'Login' })
                }
            }
        },
        {
            path: '*',
            component: errorPage
        }
    ]
})