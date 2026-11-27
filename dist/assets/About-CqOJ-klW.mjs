import { t as _plugin_vue_export_helper_default } from "../ssr_entry.mjs";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
// src/pages/About.vue?vue&type=script&lang.ts
var About_vue_vue_type_script_lang_default = {
	props: { count: Number },
	data() {
		return {};
	},
	methods: { add() {} }
};
// src/pages/About.vue
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><p>about</p></div>`);
}
var _sfc_setup = About_vue_vue_type_script_lang_default.setup;
About_vue_vue_type_script_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/About.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var About_default = /*#__PURE__*/ _plugin_vue_export_helper_default(About_vue_vue_type_script_lang_default, [["ssrRender", _sfc_ssrRender]]);
export { About_default as default };
