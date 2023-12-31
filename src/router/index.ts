import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import {Login, Home} from "@/pages"
const routes: Array<RouteRecordRaw> = [
    {
        path: "/authorization",
        name: "authorization",
        component: Login
    },
    {
        path: "/home",
        name: "home",
        component: Home
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/authorization'
    }
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;