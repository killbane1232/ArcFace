import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import {Login, Strategy, Account} from "@/pages"
const routes: Array<RouteRecordRaw> = [
    {
        path: "/authorization",
        name: "authorization",
        component: Login
    },
    {
        path: "/strategies",
        name: "strategies",
        component: Strategy
    },
    {
        path: "/accounts",
        name: "accounts",
        component: Account
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