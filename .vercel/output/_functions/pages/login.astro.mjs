import { e as createComponent, f as createAstro, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_6nPDthAX.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BSRT4aVe.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const login = async (email, password) => {
  const API_URL = "https://letras-acordes-backend.onrender.com/api";
  if (!email || !password) {
    console.error("Email and Password are required");
    return null;
  }
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  });
  return response;
};

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  if (Astro2.request.method === "POST") {
    try {
      const data = await Astro2.request.formData();
      const email = data.get("email");
      const password = data.get("password");
      const response = await login(email, password);
      if (response && response.ok) {
        const setCookie = response.headers.get("set-cookie");
        if (setCookie) {
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Iniciar Sesi\xF3n - Cancionero" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col min-h-screen bg-bg-main text-text-main items-center justify-center p-4"> <div class="w-full max-w-md bg-bg-secondary p-8 rounded-xl shadow-lg border border-white/5"> <h1 class="text-2xl font-bold text-accent-main mb-6 text-center">
Iniciar Sesión
</h1> <form id="loginForm" class="space-y-6"> <div> <label for="email" class="block text-sm font-medium text-text-secondary mb-2">Correo Electrónico</label> <input type="email" id="email" name="email" required class="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-main transition-colors" placeholder="admin@example.com"> </div> <div> <label for="password" class="block text-sm font-medium text-text-secondary mb-2">Contraseña</label> <input type="password" id="password" name="password" required class="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-main transition-colors" placeholder="••••••••"> </div> <div id="errorMessage" class="text-red-500 text-sm text-center hidden"></div> <button type="submit" class="w-full bg-accent-main text-white font-bold py-3 rounded-lg hover:bg-accent-secondary transition-transform transform active:scale-95">
Ingresar
</button> </form> </div> </div> ` })} ${renderScript($$result, "C:/dev/letras y acordes/letras-acordes/src/pages/login.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/login.astro", void 0);

const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
