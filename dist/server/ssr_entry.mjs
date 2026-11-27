import { renderToString, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { createSSRApp, defineComponent, mergeProps, reactive, ref, resolveComponent, useSSRContext, watch } from "vue";
import { createPinia, defineStore } from "pinia";
import { createMemoryHistory, createRouter } from "vue-router";
// src/ts/store.ts
var useCounterStore = defineStore("counter", {
	state: () => ({ count: 0 }),
	getters: { doubleCount: (state) => state.count * 2 },
	actions: { increment() {
		this.count++;
	} }
});
// src/components/Test.vue?vue&type=script&lang.ts
var Test_vue_vue_type_script_lang_default = {
	props: { count: Number },
	data() {
		return { counterStore: useCounterStore() };
	},
	methods: { add() {} }
};
// \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
// src/components/Test.vue
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><p>count: ${ssrInterpolate($props.count)}</p><p>storeCount: ${ssrInterpolate($data.counterStore.count)}</p></div>`);
}
var _sfc_setup$3 = Test_vue_vue_type_script_lang_default.setup;
Test_vue_vue_type_script_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Test.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var Test_default = /*#__PURE__*/ _plugin_vue_export_helper_default(Test_vue_vue_type_script_lang_default, [["ssrRender", _sfc_ssrRender$2]]);
// src/pages/Home.vue?vue&type=script&setup=true&lang.ts
var Home_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Home",
	__ssrInlineRender: true,
	setup(__props) {
		const counterStore = useCounterStore();
		console.log("counterStore:", counterStore);
		ref(0);
		const state = reactive({
			count: 0,
			info: {
				name: "zcy",
				age: 18
			}
		});
		watch(state, (newValue) => {
			console.log("count changed:", state.count, window.location.hash, window.location.hash.slice(1));
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[--><label for="input">输入一个数：</label>`);
			if (state.info.age) _push(`<input type="text" id="input"${ssrRenderAttr("value", state.count)}>`);
			else _push(`<!---->`);
			_push(`<span>count: ${ssrInterpolate(state.count)}</span><button id="addBtn">add1</button><button id="lessBtn">less</button>`);
			_push(ssrRenderComponent(Test_default, { count: state.count }, null, _parent));
			_push(`<!--]-->`);
		};
	}
});
// src/pages/Home.vue
var cssModules = { "$style": {} };
var _sfc_setup$2 = Home_vue_vue_type_script_setup_true_lang_default.setup;
Home_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/Home.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var Home_default = /*#__PURE__*/ _plugin_vue_export_helper_default(Home_vue_vue_type_script_setup_true_lang_default, [["__cssModules", cssModules]]);
// src/pages/NotFound.vue?vue&type=script&lang.ts
var NotFound_vue_vue_type_script_lang_default = {
	props: { count: Number },
	data() {
		return {};
	},
	methods: { add() {} }
};
// src/pages/NotFound.vue
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h2>404 Not Found</h2></div>`);
}
var _sfc_setup$1 = NotFound_vue_vue_type_script_lang_default.setup;
NotFound_vue_vue_type_script_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/NotFound.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var NotFound_default = /*#__PURE__*/ _plugin_vue_export_helper_default(NotFound_vue_vue_type_script_lang_default, [["ssrRender", _sfc_ssrRender$1]]);
// src/js/route.js
function ssrCreateRouter() {
	const routes = [
		{
			path: "/",
			component: Home_default
		},
		{
			path: "/about",
			component: () => import("./assets/About-CqOJ-klW.mjs"),
			name: "Login"
		},
		{
			path: "/:pathMatch(.*)*",
			component: NotFound_default
		}
	];
	const routerOptions = {
		history: createMemoryHistory(),
		routes
	};
	return createRouter(routerOptions);
}
// src/App.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	const _component_router_view = resolveComponent("router-view");
	_push(`<div${ssrRenderAttrs(mergeProps({ id: "container" }, _attrs))}>`);
	_push(ssrRenderComponent(_component_router_view, null, null, _parent));
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var App_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
// src/ssr_entry.js
function createApp() {
	const app = createSSRApp(App_default);
	const pinia = createPinia();
	app.use(pinia);
	const route = ssrCreateRouter();
	app.use(route);
	return {
		app,
		router: route
	};
}
async function render(url, manifest) {
	const { app, router } = createApp();
	await router.push(url);
	await router.isReady();
	return await renderToString(app, {});
}
export { render, _plugin_vue_export_helper_default as t };
