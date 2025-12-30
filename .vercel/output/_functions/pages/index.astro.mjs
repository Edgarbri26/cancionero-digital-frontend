import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_6nPDthAX.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BSRT4aVe.mjs';
/* empty css                                    */
import { $ as $$GirdSongs } from '../chunks/GirdSongs_aEaE9JiS.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let songs = [];
  let categories = [];
  let stats = { totalSongs: 0, totalCategories: 0 };
  let error = null;
  const API_URL = "https://letras-acordes-backend.onrender.com/api";
  try {
    const res = await fetch(`${API_URL}/songs?limit=10`);
    if (!res.ok) throw new Error("Failed to fetch songs");
    songs = await res.json();
    const catRes = await fetch(`${API_URL}/categories`);
    if (catRes.ok) {
      categories = await catRes.json();
    }
    const statsRes = await fetch(`${API_URL}/stats`);
    if (statsRes.ok) {
      stats = await statsRes.json();
    }
  } catch (e) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = String(e);
      console.error("Error fetching songs:", error);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "CancioneroDigital - Tus canciones" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col min-h-screen bg-bg-main text-text-main"> <main class="flex-1 max-w-6xl mx-auto w-full p-6 md:p-10"> <!-- Dashboard Stats --> <section class="mb-12"> <h1 class="text-3xl font-bold text-accent-main mb-6">
Panel Principal
</h1> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="bg-bg-secondary p-6 rounded-xl flex flex-col items-center justify-center shadow-lg border border-white/5 hover:border-accent-main/30 transition-colors"> <h2 class="text-lg font-medium text-text-secondary mb-2">
Total de Canciones
</h2> <p class="text-4xl font-bold text-accent-main"> ${stats.totalSongs} </p> </div> <div class="bg-bg-secondary p-6 rounded-xl flex flex-col items-center justify-center shadow-lg border border-white/5 hover:border-accent-main/30 transition-colors"> <h2 class="text-lg font-medium text-text-secondary mb-2">
Categorías
</h2> <p class="text-4xl font-bold text-accent-main"> ${stats.totalCategories} </p> </div> </div> </section> <section> <div class="flex items-center justify-between mb-8"> <h2 class="text-2xl font-bold text-white">
Últimas Agregadas
</h2> <a href="/search/all" class="text-sm font-medium text-accent-main hover:text-white transition-colors">
Ver todas →
</a> </div> <!-- Categorías Quick Filter --> <div class="flex flex-wrap gap-2 mb-8"> <a href="/search/all" class="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-bg-secondary text-text-secondary hover:text-white hover:bg-white/10">
Explorar Todas
</a> ${categories.map((cat) => renderTemplate`<a${addAttribute(`/search/all?categoryId=${cat.id}`, "href")} class="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-bg-secondary text-text-secondary hover:text-white hover:bg-white/10"> ${cat.name} </a>`)} </div> ${renderComponent($$result2, "GirdSongs", $$GirdSongs, { "songs": songs })} ${(!songs || songs.length === 0) && renderTemplate`<div class="text-center py-20 opacity-50"> <p class="text-xl mb-4">No hay canciones todavía</p> <a href="/add-song" class="text-accent-main hover:underline">
¡Sube la primera!
</a> </div>`} </section> </main> </div> ` })}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/index.astro", void 0);
const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
