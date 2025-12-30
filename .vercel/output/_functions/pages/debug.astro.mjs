import { e as createComponent, r as renderTemplate, n as defineScriptVars, o as renderHead } from '../chunks/astro/server_6nPDthAX.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const prerender = false;
const $$Debug = createComponent(($$result, $$props, $$slots) => {
  const API_URL = "https://letras-acordes-backend.onrender.com/api";
  const NODE_ENV = "production";
  return renderTemplate(_a || (_a = __template(["<html> <head><title>Debug Page</title>", '</head> <body style="font-family: monospace; padding: 2rem;"> <h1>Debug Status</h1> <ul> <li><strong>Time:</strong> ', "</li> <li><strong>Environment:</strong> ", "</li> <li> <strong>API URL Configured:</strong> ", " </li> <li><strong>API URL Value:</strong> ", '</li> </ul> <hr> <h2>Connectivity Test</h2> <p>Attempting to fetch backend...</p> <pre id="fetch-result">Loading...</pre> <script>(function(){', '\n            const pre = document.getElementById("fetch-result");\n            if (!API_URL) {\n                pre.textContent = "FATAL: PUBLIC_API_URL is missing in client.";\n            } else {\n                fetch(`${API_URL}/`)\n                    .then((res) => {\n                        pre.textContent = `Status: ${res.status} ${res.statusText}`;\n                        return res.text();\n                    })\n                    .then((txt) => {\n                        pre.textContent += `\\nResponse: ${txt}`;\n                    })\n                    .catch((err) => {\n                        pre.textContent = `Error: ${err.message}`;\n                    });\n            }\n        })();</script> </body> </html>'], ["<html> <head><title>Debug Page</title>", '</head> <body style="font-family: monospace; padding: 2rem;"> <h1>Debug Status</h1> <ul> <li><strong>Time:</strong> ', "</li> <li><strong>Environment:</strong> ", "</li> <li> <strong>API URL Configured:</strong> ", " </li> <li><strong>API URL Value:</strong> ", '</li> </ul> <hr> <h2>Connectivity Test</h2> <p>Attempting to fetch backend...</p> <pre id="fetch-result">Loading...</pre> <script>(function(){', '\n            const pre = document.getElementById("fetch-result");\n            if (!API_URL) {\n                pre.textContent = "FATAL: PUBLIC_API_URL is missing in client.";\n            } else {\n                fetch(\\`\\${API_URL}/\\`)\n                    .then((res) => {\n                        pre.textContent = \\`Status: \\${res.status} \\${res.statusText}\\`;\n                        return res.text();\n                    })\n                    .then((txt) => {\n                        pre.textContent += \\`\\\\nResponse: \\${txt}\\`;\n                    })\n                    .catch((err) => {\n                        pre.textContent = \\`Error: \\${err.message}\\`;\n                    });\n            }\n        })();</script> </body> </html>'])), renderHead(), (/* @__PURE__ */ new Date()).toISOString(), NODE_ENV, "YES" , API_URL, defineScriptVars({ API_URL }));
}, "C:/dev/letras y acordes/letras-acordes/src/pages/debug.astro", void 0);
const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/debug.astro";
const $$url = "/debug";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Debug,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
