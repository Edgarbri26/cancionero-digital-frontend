import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DuIYPZQY.mjs';
import { manifest } from './manifest_DBtc3hcV.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/add-song.astro.mjs');
const _page3 = () => import('./pages/debug.astro.mjs');
const _page4 = () => import('./pages/edit-song/_id_.astro.mjs');
const _page5 = () => import('./pages/login.astro.mjs');
const _page6 = () => import('./pages/search/_search_.astro.mjs');
const _page7 = () => import('./pages/songs/_id_.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/add-song.astro", _page2],
    ["src/pages/debug.astro", _page3],
    ["src/pages/edit-song/[id].astro", _page4],
    ["src/pages/login.astro", _page5],
    ["src/pages/search/[search].astro", _page6],
    ["src/pages/songs/[id].astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "28df856b-a2f0-4a99-921d-ed144b16a9a5",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
