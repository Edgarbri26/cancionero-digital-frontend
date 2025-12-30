import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_6nPDthAX.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BSRT4aVe.mjs';
export { renderers } from '../renderers.mjs';

const perro = new Proxy({"src":"/_astro/perro.CZAn00p1.gif","width":354,"height":200,"format":"gif"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/dev/letras y acordes/letras-acordes/src/assets/perro.gif";
							}
							
							return target[name];
						}
					});

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 - P\xE1gina no encontrada" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col items-center justify-center min-h-screen text-center px-4"> <h1 class="text-4xl font-bold text-accent-main mb-2 animate-pulse">
404
</h1> <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
¡Página no encontrada!
</h2> <img${addAttribute(perro.src, "src")} alt="Perro 404" class="w-64 h-64 object-cover rounded-full mb-8"> <p class="text-text-secondary text-lg mb-8 max-w-md">
Parece que la página que buscas no existe o se ha movido a otro
            escenario.
</p> <a href="/" class="bg-accent-main hover:bg-accent-secondary text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-accent-main/20 flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path> </svg>
Volver al Inicio
</a> </div> ` })}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/404.astro", void 0);

const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
