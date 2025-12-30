import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_6nPDthAX.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BSRT4aVe.mjs';
/* empty css                                       */
import { u as updateSong } from '../../chunks/songs_Cx5R-d1V.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const token = Astro2.cookies.get("token")?.value;
  if (!token) {
    return Astro2.redirect("/login");
  }
  const { id } = Astro2.params;
  const API_URL = "https://letras-acordes-backend.onrender.com/api";
  let song = null;
  let categories = [];
  try {
    const res = await fetch(`${API_URL}/categories`);
    if (res.ok) {
      categories = await res.json();
    }
  } catch (e) {
    console.error("Error fetching categories:", e);
  }
  try {
    const res = await fetch(`${API_URL}/songs/${id}`);
    if (res.ok) {
      song = await res.json();
    } else {
      return Astro2.redirect("/");
    }
  } catch (e) {
    console.error("Error fetching song:", e);
    return Astro2.redirect("/");
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const result = await updateSong(Number(id), formData, token);
    if (result.success) {
      return Astro2.redirect(`/songs/${id}`);
    } else {
      result.error || "Error al actualizar la canción";
      console.error(result.data);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Editar Canción" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col min-h-screen bg-bg-main text-text-main"> <main class="flex-1 max-w-6xl mx-auto w-full p-6 md:p-10"> <h1 class="text-3xl font-bold text-accent-main mb-8">
Editar Canción
</h1> <form class="space-y-8" method="POST"> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <div class="space-y-2"> <label for="artist" class="block text-sm font-medium text-text-secondary">Artista / Banda</label> <input type="text" id="artist" name="artist"${addAttribute(song.artist, "value")} class="w-full bg-bg-secondary border border-white/10 rounded-lg p-3 text-text-main focus:outline-none focus:border-accent-main transition-colors placeholder-white/20"> </div> <div class="space-y-2"> <label for="title" class="block text-sm font-medium text-text-secondary">Nombre de la canción</label> <input type="text" id="title" name="title"${addAttribute(song.title, "value")} class="w-full bg-bg-secondary border border-white/10 rounded-lg p-3 text-text-main focus:outline-none focus:border-accent-main transition-colors placeholder-white/20"> </div> <div class="space-y-2"> <label for="key" class="block text-sm font-medium text-text-secondary">Tono Principal</label> <select id="key" name="key" class="w-full bg-bg-secondary border border-white/10 rounded-lg p-3 text-text-main focus:outline-none focus:border-accent-main transition-colors appearance-none cursor-pointer"> ${[
    "C",
    "C#",
    "Cm",
    "D",
    "D#",
    "Dm",
    "E",
    "Em",
    "F",
    "F#",
    "G",
    "G#",
    "Gm",
    "A",
    "A#",
    "Am",
    "B",
    "Bm"
  ].map((k) => renderTemplate`<option${addAttribute(k, "value")}${addAttribute(song.key === k, "selected")}> ${k} </option>`)} </select> </div> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="space-y-2"> <label for="url_song" class="block text-sm font-medium text-text-secondary">Link del Video (YouTube)</label> <input type="url" id="url_song" name="url_song"${addAttribute(song.url_song || "", "value")} class="w-full bg-bg-secondary border border-white/10 rounded-lg p-3 text-text-main focus:outline-none focus:border-accent-main transition-colors placeholder-white/20"> </div> <div class="space-y-2"> <label for="categoryId" class="block text-sm font-medium text-text-secondary">Categoría</label> <select id="categoryId" name="categoryId" class="w-full bg-bg-secondary border border-white/10 rounded-lg p-3 text-text-main focus:outline-none focus:border-accent-main transition-colors appearance-none cursor-pointer"> ${categories.map((cat) => renderTemplate`<option${addAttribute(cat.id, "value")}${addAttribute(song.categoryId === cat.id, "selected")}> ${cat.name} </option>`)} </select> </div> </div> <div class="border-t border-white/10 pt-6 flex flex-col gap-20"> <div class="mb-4"> <h3 class="text-xl font-semibold text-white">
Letra y Acordes
</h3> <p class="text-sm text-text-secondary">
Edita la letra y posición de los acordes.
</p> </div>  ${renderComponent($$result2, "ChordEditor", null, { "client:only": "react", "name": "content", "initialContent": song.content, "client:component-hydration": "only", "client:component-path": "C:/dev/letras y acordes/letras-acordes/src/components/ChordEditor.jsx", "client:component-export": "default" })} <div class="pt-4 flex justify-end"> <button type="submit" class="bg-accent-main hover:bg-accent-main/90 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-accent-main/20">
Guardar Cambios
</button> </div> </div> </form> </main> </div> ` })}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/edit-song/[id].astro", void 0);
const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/edit-song/[id].astro";
const $$url = "/edit-song/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
