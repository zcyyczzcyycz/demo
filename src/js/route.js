import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from "vue-router";
import Home from "@/pages/Home.vue";
import NotFound from "@/pages/NotFound.vue";

// export const routes = [
//   { path: "/", component: Home },
//   {
//     path: "/about",
//     component: () => import("@/pages/About.vue"),
//     name: "Login",
//   },
//   { path: "/:pathMatch(.*)*", component: NotFound },
// ];

// export const routerOptions = {
//   history: createWebHistory(),
//   routes,
// };

// const router = createRouter(routerOptions);

// router.beforeEach(async (to, from) => {
//   // 未登录且不是登录页，重定向登录
//   console.log(to);
// });

// export default router;

// setTimeout(() => {
//   router.push({ path: "/about", hash: "#team" });
// }, 2000);

export function ssrCreateRouter() {
  const routes = [
    { path: "/", component: Home },
    {
      path: "/about",
      component: () => import("@/pages/About.vue"),
      name: "Login",
    },
    { path: "/:pathMatch(.*)*", component: NotFound },
  ];

  const routerOptions = {
    history: createMemoryHistory(),
    routes,
  };
  return createRouter(routerOptions);
}
export function clientCreateRouter() {
  const routes = [
    { path: "/", component: Home },
    {
      path: "/about",
      component: () => import("@/pages/About.vue"),
      name: "Login",
    },
    { path: "/:pathMatch(.*)*", component: NotFound },
  ];

  const routerOptions = {
    history: createWebHistory(),
    routes,
  };
  return createRouter(routerOptions);
}
