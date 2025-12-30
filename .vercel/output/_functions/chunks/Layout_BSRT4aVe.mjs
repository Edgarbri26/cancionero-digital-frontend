import { e as createComponent, f as createAstro, m as maybeRenderHead, l as renderScript, r as renderTemplate, h as addAttribute, o as renderHead, k as renderComponent, p as renderSlot } from './astro/server_6nPDthAX.mjs';
import 'piccolore';
/* empty css                            */
import 'clsx';

const $$Astro$1 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const token = Astro2.cookies.get("token")?.value;
  const isLoggedIn = !!token;
  return renderTemplate`${maybeRenderHead()}<header class="flex items-center justify-between px-4 py-3 bg-bg-secondary border-b border-white/10 sticky top-0 z-50"> <div class="max-w-6xl w-full mx-auto flex justify-between"> <div class="flex items-center gap-4"> <a href="/" class="text-2xl font-bold text-accent-main tracking-tighter"><img src="/ShortLogo.svg" alt="Logo" class="hidden w-auto md:block md:h-11"> <img src="/icono.svg" alt="Logo" class="h-9 w-auto md:hidden"></a> </div> <div class="flex-1 max-w-xl mx-4"> <div class="relative"> <input class="w-full bg-bg-main border border-white/10 rounded-full py-2 px-4 pl-10 text-text-main focus:outline-none focus:border-accent-main transition-colors" type="search" placeholder="¿Qué quieres tocar y cantar hoy?"> <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg> </div> </div> <nav> <ul class="flex items-center h-9 gap-4 text-sm font-medium text-text-secondary"> <li class="hover:text-text-main cursor-pointer transition-colors"> <a href="/masas">Misas</a> </li> ${isLoggedIn && renderTemplate`<li class="hover:text-text-main cursor-pointer transition-colors"> <a href="/add-song">Add</a> </li>`} ${isLoggedIn ? renderTemplate`<li id="logoutBtn" class="text-red-400 hover:text-red-300 cursor-pointer font-bold">
Cerrar Sesión
</li>` : renderTemplate`<li class="text-accent-main hover:text-accent-secondary cursor-pointer font-bold"> <a href="/login">Ingresar</a> </li>`} </ul> </nav> </div> </header> ${renderScript($$result, "C:/dev/letras y acordes/letras-acordes/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/letras y acordes/letras-acordes/src/components/Header.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" class="h-full w-full"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="bg-bg-main text-text-main h-full w-full"> ${renderComponent($$result, "Header", $$Header, {})} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/dev/letras y acordes/letras-acordes/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
