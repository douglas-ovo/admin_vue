import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from 'vue'
const Home = defineAsyncComponent(() => import('@/views/Home.vue'))
const Login = defineAsyncComponent(() => import('@/views/Login.vue'))
const ChartPage = defineAsyncComponent(() => import('@/views/home/ChartPage.vue'))

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: 'home',
            component: Home,
            redirect: 'chart',
            children: [
                {
                    path: 'chart',
                    name: 'chart',
                    component: ChartPage
                }
            ]
        },
        {
            path: "/login",
            name: 'login',
            component: Login,
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "/"
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem('userinfo')) {//已登录
        next()
    } else {//未登录
        if (to.name === 'home') {
            next({ name: 'login' })
        } else {
            next()
        }
    }
})

export default router