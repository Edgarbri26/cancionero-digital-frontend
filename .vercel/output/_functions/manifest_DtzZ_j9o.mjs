import 'piccolore';
import { q as decodeKey } from './chunks/astro/server_6nPDthAX.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DAQ0dygz.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/dev/letras%20y%20acordes/letras-acordes/","cacheDir":"file:///C:/dev/letras%20y%20acordes/letras-acordes/node_modules/.astro/","outDir":"file:///C:/dev/letras%20y%20acordes/letras-acordes/dist/","srcDir":"file:///C:/dev/letras%20y%20acordes/letras-acordes/src/","publicDir":"file:///C:/dev/letras%20y%20acordes/letras-acordes/public/","buildClientDir":"file:///C:/dev/letras%20y%20acordes/letras-acordes/dist/client/","buildServerDir":"file:///C:/dev/letras%20y%20acordes/letras-acordes/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/add-song.CqfbGN1A.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/add-song.CqfbGN1A.css"}],"routeData":{"route":"/add-song","isIndex":false,"type":"page","pattern":"^\\/add-song\\/?$","segments":[[{"content":"add-song","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/add-song.astro","pathname":"/add-song","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/add-song.CqfbGN1A.css"}],"routeData":{"route":"/edit-song/[id]","isIndex":false,"type":"page","pattern":"^\\/edit-song\\/([^/]+?)\\/?$","segments":[[{"content":"edit-song","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/edit-song/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/add-song.CqfbGN1A.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/add-song.CqfbGN1A.css"}],"routeData":{"route":"/search/[search]","isIndex":false,"type":"page","pattern":"^\\/search\\/([^/]+?)\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}],[{"content":"search","dynamic":true,"spread":false}]],"params":["search"],"component":"src/pages/search/[search].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/add-song.CqfbGN1A.css"}],"routeData":{"route":"/songs/[id]","isIndex":false,"type":"page","pattern":"^\\/songs\\/([^/]+?)\\/?$","segments":[[{"content":"songs","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/songs/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/add-song.CqfbGN1A.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/dev/letras y acordes/letras-acordes/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/dev/letras y acordes/letras-acordes/src/pages/add-song.astro",{"propagation":"none","containsHead":true}],["C:/dev/letras y acordes/letras-acordes/src/pages/edit-song/[id].astro",{"propagation":"none","containsHead":true}],["C:/dev/letras y acordes/letras-acordes/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/dev/letras y acordes/letras-acordes/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/dev/letras y acordes/letras-acordes/src/pages/search/[search].astro",{"propagation":"none","containsHead":true}],["C:/dev/letras y acordes/letras-acordes/src/pages/songs/[id].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/add-song@_@astro":"pages/add-song.astro.mjs","\u0000@astro-page:src/pages/edit-song/[id]@_@astro":"pages/edit-song/_id_.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/search/[search]@_@astro":"pages/search/_search_.astro.mjs","\u0000@astro-page:src/pages/songs/[id]@_@astro":"pages/songs/_id_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DtzZ_j9o.mjs","C:/dev/letras y acordes/letras-acordes/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_kcocFtcv.mjs","@components/SongView.jsx":"_astro/SongView.B_7GqhYl.js","C:/dev/letras y acordes/letras-acordes/src/components/ChordEditor.jsx":"_astro/ChordEditor.kR_Pbdnc.js","@astrojs/react/client.js":"_astro/client.9unXo8s5.js","C:/dev/letras y acordes/letras-acordes/src/pages/add-song.astro?astro&type=script&index=0&lang.ts":"_astro/add-song.astro_astro_type_script_index_0_lang.CotZLIVw.js","C:/dev/letras y acordes/letras-acordes/src/pages/login.astro?astro&type=script&index=0&lang.ts":"_astro/login.astro_astro_type_script_index_0_lang.UwIARoej.js","C:/dev/letras y acordes/letras-acordes/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.DHMekhMi.js","C:/dev/letras y acordes/letras-acordes/src/components/HeaderLyric.astro?astro&type=script&index=0&lang.ts":"_astro/HeaderLyric.astro_astro_type_script_index_0_lang.CxhPwCGx.js","C:/dev/letras y acordes/letras-acordes/src/components/SongTools.astro?astro&type=script&index=0&lang.ts":"_astro/SongTools.astro_astro_type_script_index_0_lang.Bwnj_dzK.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/dev/letras y acordes/letras-acordes/src/pages/add-song.astro?astro&type=script&index=0&lang.ts","const c=document.getElementById(\"key\");c?.addEventListener(\"change\",e=>{const t=e.target.value,n=new CustomEvent(\"song-key-change\",{detail:{key:t}});window.dispatchEvent(n)});"],["C:/dev/letras y acordes/letras-acordes/src/pages/login.astro?astro&type=script&index=0&lang.ts","const c=async(n,r)=>{const t=\"https://letras-acordes-backend.onrender.com/api\";return!n||!r?(console.error(\"Email and Password are required\"),null):await fetch(`${t}/auth/login`,{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({email:n,password:r}),credentials:\"include\"})},s=document.getElementById(\"loginForm\"),o=document.getElementById(\"errorMessage\");s instanceof HTMLFormElement&&o&&s.addEventListener(\"submit\",async n=>{n.preventDefault();const r=new FormData(s),t=r.get(\"email\"),a=r.get(\"password\");try{const e=await c(t,a);if(e&&e.ok)window.location.href=\"/\";else{const i=e?await e.json():{error:\"Error desconocido\"};o.textContent=i.error||\"Error al iniciar sesión\",o.classList.remove(\"hidden\")}}catch(e){console.error(e),o.textContent=\"Error de conexión\",o.classList.remove(\"hidden\")}});"],["C:/dev/letras y acordes/letras-acordes/src/components/Header.astro?astro&type=script&index=0&lang.ts","const n=document.getElementById(\"logoutBtn\");n&&n.addEventListener(\"click\",async()=>{try{await fetch(\"https://letras-acordes-backend.onrender.com/api/auth/logout\",{method:\"POST\",credentials:\"include\"}),window.location.href=\"/\"}catch(e){console.error(\"Logout failed\",e)}});const t=document.querySelector('input[type=\"search\"]');t&&t.addEventListener(\"keydown\",e=>{if(e.key===\"Enter\"){const o=t.value.trim();o?window.location.href=`/search/${encodeURIComponent(o)}`:window.location.href=\"/search/all\"}});"],["C:/dev/letras y acordes/letras-acordes/src/components/SongTools.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"btn-transpose-up\"),s=document.getElementById(\"btn-transpose-down\"),n=t=>{window.dispatchEvent(new CustomEvent(\"song-transpose\",{detail:{semitones:t}}))};e?.addEventListener(\"click\",()=>n(1));s?.addEventListener(\"click\",()=>n(-1));"]],"assets":["/_astro/perro.CZAn00p1.gif","/_astro/add-song.CqfbGN1A.css","/favicon.svg","/icono.svg","/largeLogo.svg","/ShortLogo.svg","/_astro/ChordEditor.kR_Pbdnc.js","/_astro/client.9unXo8s5.js","/_astro/HeaderLyric.astro_astro_type_script_index_0_lang.CxhPwCGx.js","/_astro/index.WFquGv8Z.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/music.CzqZO0zE.js","/_astro/SongView.B_7GqhYl.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"tOmuU25YUiUB2ZtYidU3rcU5jtkIqc/XhVQm1wY1lY4="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
