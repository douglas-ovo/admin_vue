import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('@/views/Home.vue')
const Login = () => import('@/views/Login.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/login', name: 'login', component: Login },
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
})

router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem('userinfo')) {
        next()
    } else {
        if (to.name === 'home') {
            next({ name: 'login' })
        } else {
            next()
        }
    }
})

export default router