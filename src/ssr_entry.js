import { basename } from "node:path";
import { renderToString } from "vue/server-renderer";

import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import { ssrCreateRouter } from "@/js/index.js";
import App from "./App.vue";

// **SSR 服务端渲染，也是要完整跑一遍你的 Vue 应用组件树的，只是跑在 Node、最终输出 HTML 字符串，而不是挂载到浏览器 DOM。
// Pinia、路由、组件、响应式、模板渲染这些逻辑，Vue 在 Node 环境同样可以执行，只是不执行浏览器 API、不做事件绑定。**
// 为什么每次渲染都要执行 `createApp()`？
// - 每来一个用户请求，**必须新建一套独立的 Vue 实例、Pinia 实例**。
// - 服务器是多请求并发的：A 用户访问 `/about`，B 用户访问 `/`。如果全局只创建一份 app+pinia，两个用户的路由状态、store 数据会互相串掉，A 看到 B 的页面。
// - SPA 浏览器里，一个标签页就一份实例，不存在并发争抢；SSR Node 服务端是共享进程，所以每次请求都要新建隔离实例。
// 不是挂载到浏览器页面，是挂载到**内存里的 SSR 应用实例**，供 `renderToString` 遍历渲染模板。
function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);

  const route = ssrCreateRouter(); //ssrCreateRouter返回路由实例，和支持路由注册一样，但是注意你的路由内部模式选择createMemoryHistory
  app.use(route);
  return { app, router: route };
}

export async function render(url, manifest) {
  const { app, router } = createApp();

  // - 这一步是**在 Node 的内存里模拟路由跳转**
  // - 根据用户访问的 url，让 Vue Router 在服务端内部匹配路由，找到对应的页面组件（About.vue/ Home.vue）
  // - 只有路由匹配完成，组件树确定了，`renderToString` 才知道该渲染哪一部分模板
  // - **完全不会触发浏览器跳转，没有 window**，Vue Router 在 SSR 模式下有一套内存版路由逻辑。
  await router.push(url);
  // 等待路由解析、异步组件准备完成；
  await router.isReady();

  // renderToString() 是 `vue/server-renderer` 的核心 API，在 Node 里遍历组件树、执行 setup、渲染模板，输出 HTML 字符串；
  // `ctx` 是 SSR 上下文对象；Vue 的 Vite 插件会自动追踪：**这次渲染过程，一共激活 / 加载了哪些模块（哪些 .vue、哪些 js）**，渲染结束之后，`ctx.modules` 数组里就存下这些模块 id。
  const ctx = {};
  const html = await renderToString(app, ctx);

  // `renderPreloadLinks` / `renderPreloadLink`？（这一块是【可选优化】，不是 SSR 必须）
  // 拿到本次渲染用到的模块列表，传给 `renderPreloadLinks`，配合打包后的 manifest，生成 `<link modulepreload>`、`<link rel="stylesheet">` 这些标签。最后返回两个东西：
  // 1. `html`：Vue 渲染出来的页面主体 HTML 片段（用来替换 `<!--ssr-outlet-->`）
  // 2. `preloadLinks`：预加载资源标签串，塞到 html 的 head 里，优化浏览器加载性能
  return html;
}

function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          const filename = basename(file);
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile);
              seen.add(depFile);
            }
          }
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}

function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    // TODO
    return "";
  }
}
