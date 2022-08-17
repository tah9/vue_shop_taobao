import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
    {
        path: '/main',
        name: 'main',
        component: () => import('../views/Main/Main'),
        children: [
            {
                path: 'home',
                component: () => import('../views/Main/Home'),
            }, {
                path: 'car',
                component: () => import('../views/Main/Car')
            }, {
                path: 'mine',
                component: () => import('../views/Main/Mine')
            }
        ],
    },
    {
        path: '/',
        component: () => import('../views/login/Login')
    },{
        path: '/editPwd',
        component: () => import('../views/login/EditPwd')
    },
    {
        path: '/more',
        component: () => import('../views/More')
    },
    {
        path: '/type',
        component: () => import('../views/Main/TypeThing')
    }, {
        path: '/login',
        component: () => import('../views/login/Login')
    }, {
        path: '/register',
        component: () => import('../views/login/Register')
    }, {
        path: '/search',
        component: () => import('../views/Search')
    }, {
        path: "/DaiFu",
        component: () => import('../views/order/DaiFu')
    }, {
        path: "/ShouHuo",
        component: () => import('../views/order/ShouHuo')
    }, {
        path: "/Wan",
        component: () => import('../views/order/Wan')
    }, {
        path: "/MyOrder",
        component: () => import('../views/order/MyOrder')
    }
]

const router = new VueRouter({
    base: "/dist/",
    routes
})

export default router
