import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_6nPDthAX.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BSRT4aVe.mjs';
import { $ as $$GirdSongs } from '../../chunks/GirdSongs_aEaE9JiS.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$search;
  const { search } = Astro2.params;
  let songs = [];
  let categories = [];
  let error = null;
  try {
    const q = search === "all" ? "" : search || "";
    const categoryId = Astro2.url.searchParams.get("categoryId") || "";
    const API_URL = "https://letras-acordes-backend.onrender.com/api";
    const res = await fetch(
      `${API_URL}/songs?q=${encodeURIComponent(q)}&categoryId=${categoryId}`
    );
    if (!res.ok) throw new Error("Failed to fetch songs");
    songs = await res.json();
    songs.reverse();
    const catRes = await fetch(`${API_URL}/categories`);
    if (catRes.ok) {
      categories = await catRes.json();
    }
  } catch (e) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = String(e);
      console.error("Error fetching songs:", error);
    }
  }
  const currentCategoryId = Astro2.url.searchParams.get("categoryId");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `CancioneroDigital - Buscando: ${search}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col min-h-screen bg-bg-main text-text-main"> <main class="flex-1 max-w-6xl mx-auto w-full p-6 md:p-10"> <h1 class="text-3xl font-bold text-accent-main mb-8"> ${search === "all" ? "Todas las canciones" : `Resultados para: "${search}"`} </h1> <!-- Categorías --> <div class="flex flex-wrap gap-2 mb-8"> <a${addAttribute(`/search/${search === "all" ? "all" : search}`, "href")}${addAttribute(`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!currentCategoryId ? "bg-accent-main text-white" : "bg-bg-secondary text-text-secondary hover:text-white hover:bg-white/10"}`, "class")}>
Todas
</a> ${categories.map((cat) => renderTemplate`<a${addAttribute(`/search/${search === "all" ? "all" : search}?categoryId=${cat.id}`, "href")}${addAttribute(`px-4 py-2 rounded-full text-sm font-medium transition-colors ${currentCategoryId === String(cat.id) ? "bg-accent-main text-white" : "bg-bg-secondary text-text-secondary hover:text-white hover:bg-white/10"}`, "class")}> ${cat.name} </a>`)} </div> ${renderComponent($$result2, "GirdSongs", $$GirdSongs, { "songs": songs })} ${(!songs || songs.length === 0) && renderTemplate`<div class="text-center py-20 opacity-50"> <p class="text-xl mb-4">No se encontraron resultados</p> <a href="/search/all" class="text-accent-main hover:underline">
Ver todas las canciones
</a> </div>`} </main> </div> ` })}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/search/[search].astro", void 0);
const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/search/[search].astro";
const $$url = "/search/[search]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$search,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
