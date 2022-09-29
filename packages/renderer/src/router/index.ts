import { createRouter, createWebHistory } from 'vue-router';

const Login = () => import('@/views/Login.vue')
const Home = () => import('@/views/Home.vue')

const Charts = () => import('@/views/home/Charts.vue')
const About = () => import('@/views/home/About.vue')
const Setting = () => import('@/views/home/Setting.vue')
const Info = () => import('@/views/home/Info.vue')
const Evaluate = () => import('@/views/home/Evaluate.vue')
const Record = () => import('@/views/home/Record.vue')
const Case = () => import('@/views/home/Case.vue')
const Train = () => import('@/views/home/Train.vue')
const Chat = () => import('@/views/home/Chat.vue')

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
                    path: 'info',
                    name: 'info',
                    component: Info
                },
                {
                    path: 'evaluate',
                    name: 'evaluate',
                    component: Evaluate
                },
                {
                    path: 'record',
                    name: 'record',
                    component: Record
                },
                {
                    path: 'case',
                    name: 'case',
                    component: Case
                },
                {
                    path: 'train',
                    name: 'train',
                    component: Train
                },
                {
                    path: 'chat',
                    name: 'chat',
                    component: Chat
                }
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