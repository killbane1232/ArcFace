import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import {Login, Strategy, Account, Chart} from "@/pages"
const routes: Array<RouteRecordRaw> = [
    {
        path: "/arcam/authorization",
        name: "authorization",
        component: Login
    },
    {
        path: "/arcam/strategies",
        name: "strategies",
        component: Strategy
    },
    {
        path: "/arcam/accounts",
        name: "accounts",
        component: Account
    },
    {
        path: "/arcam/charts",
        name: "charts",
        component: Chart
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/arcam/authorization'
    }
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;