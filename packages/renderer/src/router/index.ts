import { createRouter, createWebHistory } from 'vue-router';

const Login = () => import('@/views/Login.vue')
const Home = () => import('@/views/Home.vue')

const Charts = () => import('@/views/home/Charts.vue')
const About = () => import('@/views/home/About.vue')
const Setting = () => import('@/views/home/Setting.vue')

const Role = () => import('@/views/manage/Role.vue')
const Cate = () => import('@/views/manage/Cate.vue')
const Goods = () => import('@/views/manage/Goods.vue')
const User = () => import('@/views/manage/User.vue')

const CateQuery = () => import('@/views/query/CateQuery.vue')
const GoodsQuery = () => import('@/views/query/GoodsQuery.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', name: 'home', component: Home, redirect: 'charts',
            children: [
                {
                    path: 'charts',
                    name: 'charts',
                    component: Charts
                },
                {
                    path: 'about',
                    name: 'about',
                    component: About
                },
                {
                    path: 'setting',
                    name: 'setting',
                    component: Setting
                },
                {
                    path: 'role',
                    name: 'role',
                    component: Role
                },
                {
                    path: 'cate',
                    name: 'cate',
                    component: Cate
                },
                {
                    path: 'goods',
                    name: 'goods',
                    component: Goods
                },
                {
                    path: 'user',
                    name: 'user',
                    component: User
                },
                {
                    path: 'catequery',
                    name: 'catequery',
                    component: CateQuery
                },
                {
                    path: 'goodsquery',
                    name: 'goodsquery',
                    component: GoodsQuery
                },
            ]
        },
        { path: '/login', name: 'login', component: Login },
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
})

router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem('userinfo')) {
        next()
    } else {
        if (to.name === 'charts') {
            next({ name: 'login' })
        } else {
            next()
        }
    }
})

export default router