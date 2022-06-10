import { userInfo } from "os";
import { createRouter, createWebHistory } from "vue-router";
const Home = () => import('@/views/Home.vue')
const Login = () => import('@/views/Login.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: 'home',
            component: Home,
        },
        {
            path: "/login",
            name: 'login',
            component: Login,
        },
        // {
        //     path: '*',
        //     redirect: '/'
        // }
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