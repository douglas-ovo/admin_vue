import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('@/views/Home.vue')
const Login = () => import('@/views/Login.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/login', name: 'login', component: Login },
    ]
})

router.beforeEach((to, from, next) => {
    next()
})

export default router