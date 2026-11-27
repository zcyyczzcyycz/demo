import "@/ts/index.ts";
// import { route, routes, setScale } from "@/js/index.js";
import { clientCreateRouter } from "@/js/index.js";
import "@/sass/index.scss";
import App from "./App.vue";

import { ViteSSG } from "vite-ssg";
import { createApp } from "vue";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();
const route = clientCreateRouter();
app.use(route);
app.use(pinia);
app.mount("#app");

// SSG
// import Home from "@/pages/Home.vue";
// import NotFound from "@/pages/NotFound.vue";
// import { setScale } from "@/js/index.js";
// const routes = [
//   { path: "/", component: Home },
//   {
//     path: "/about/:slug",
//     component: () => import("@/pages/About.vue"),
//     name: "Login",
//   },
//   { path: "/:pathMatch(.*)*", component: NotFound },
// ];

// const pinia = createPinia();
// export const createApp = ViteSSG(
//   // the root component
//   App,
//   // vue-router options
//   { routes },
//   // function to have custom setups
//   ({ app, router, routes, isClient, initialState }) => {
//     // install plugins etc.
//     app.use(pinia);

//     if (isClient) {
//       setScale();
//     }
//   },
// );
