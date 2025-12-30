import { e as createComponent, f as createAstro, m as maybeRenderHead, l as renderScript, r as renderTemplate, h as addAttribute, k as renderComponent } from '../../chunks/astro/server_6nPDthAX.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BSRT4aVe.mjs';
import 'clsx';
import { jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

const $$Astro$3 = createAstro();
const $$HeaderLyric = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$HeaderLyric;
  const {
    title = "T\xEDtulo Desconocido",
    artist = "Artista Desconocido",
    tone = "C",
    category = "",
    url_song = ""
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="mb-8"> <h1 class="text-4xl font-extrabold text-text-main mb-1">${title}</h1> <h2 class="text-xl text-accent-main font-medium"> <span class="text-text-secondary">Autor:</span> ${artist} </h2> <div class="flex items-center gap-4 mt-4 text-sm text-text-secondary"> <span class="bg-bg-secondary px-3 py-1 rounded-full border border-white/10">
Tom: <span id="header-tone" class="text-accent-main font-bold">${tone}</span> </span> <span class="cursor-pointer hover:underline bg-bg-secondary px-3 py-1 rounded-full border border-white/10 text-accent-main/90 font-bold"> ${category} </span> <!-- <span
            class="cursor-pointer hover:underline bg-bg-secondary px-3 py-1 rounded-full border border-white/10 text-text-main"
        >
            <a href={url_song} target="_blank">Escuchar Canción</a>
        </span> --> </div> </header> ${renderScript($$result, "C:/dev/letras y acordes/letras-acordes/src/components/HeaderLyric.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/letras y acordes/letras-acordes/src/components/HeaderLyric.astro", void 0);

const SongLine = ({ line }) => {
  if (!line) return /* @__PURE__ */ jsx("div", { className: "h-8" });
  const segments = line.split(/(\[.*?\])/);
  return /* @__PURE__ */ jsx("div", { className: "relative font-mono text-lg whitespace-pre-wrap leading-10", children: segments.map((seg, i) => {
    const match = seg.match(/^\[(.*?)\]$/);
    if (match) {
      return /* @__PURE__ */ jsx("span", { className: "inline-block relative w-0 overflow-visible align-baseline", children: /* @__PURE__ */ jsx("span", { className: "absolute bottom-[1.2em] left-0 -translate-x-1/2 text-accent-main font-bold text-sm select-none whitespace-nowrap", children: match[1] }) }, i);
    }
    return /* @__PURE__ */ jsx("span", { className: "text-text-main", children: seg }, i);
  }) });
};

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const normalizeNote = (note) => {
    const map = {
        'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
        'Cb': 'B', 'Fb': 'E', 'E#': 'F', 'B#': 'C'
    };
    return map[note] || note;
};

const getSemidistance = (note1, note2) => {
    const n1 = normalizeNote(note1);
    const n2 = normalizeNote(note2);
    const i1 = NOTES.indexOf(n1);
    const i2 = NOTES.indexOf(n2);
    if (i1 === -1 || i2 === -1) return 0;
    return i2 - i1;
};

const transposeChord = (chord, semitones) => {
    if (!chord) return chord;

    // Regex para separar la nota base del resto (m, 7, sus4, /G, etc)
    // Ejemplo: C#m7/G# -> C#, m7/G#
    const match = chord.match(/^([A-G][#b]?)(.*)$/);
    if (!match) return chord;

    let [_, root, suffix] = match;
    root = normalizeNote(root);

    const rootIndex = NOTES.indexOf(root);
    if (rootIndex === -1) return chord;

    let newIndex = (rootIndex + semitones) % 12;
    if (newIndex < 0) newIndex += 12;

    let newRoot = NOTES[newIndex];

    // Manejo de bajos (bass notes) ej: /G -> /A
    if (suffix.includes('/')) {
        const parts = suffix.split('/');
        // El primer elemento es el sufijo del acorde (m7, sus), el ultimo es el bajo
        const bass = parts[parts.length - 1];
        const bassMatch = bass.match(/^([A-G][#b]?)$/);

        if (bassMatch) {
            const bassRoot = normalizeNote(bassMatch[1]);
            const bassIndex = NOTES.indexOf(bassRoot);
            if (bassIndex !== -1) {
                let newBassIndex = (bassIndex + semitones) % 12;
                if (newBassIndex < 0) newBassIndex += 12;
                const newBass = NOTES[newBassIndex];
                // Reconstruir sufijo reemplazando el bajo
                suffix = suffix.substring(0, suffix.lastIndexOf('/')) + '/' + newBass;
            }
        }
    }

    return newRoot + suffix;
};

const transposeText = (text, fromKey, toKey) => {
    const semitones = getSemidistance(fromKey, toKey);
    if (semitones === 0) return text;

    return text.replace(/\[(.*?)\]/g, (match, chord) => {
        return `[${transposeChord(chord, semitones)}]`;
    });
};

function SongView({ initialContent, initialKey = "C" }) {
  const [content, setContent] = useState(initialContent);
  const [currentKey, setCurrentKey] = useState(initialKey);
  useEffect(() => {
    const transposeKey = (key, semitones) => {
      const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      const map = {
        "Db": "C#",
        "Eb": "D#",
        "Gb": "F#",
        "Ab": "G#",
        "Bb": "A#",
        "Cb": "B",
        "Fb": "E",
        "E#": "F",
        "B#": "C"
      };
      const n = map[key] || key;
      let idx = NOTES.indexOf(n);
      if (idx === -1) return key;
      let newIdx = (idx + semitones) % 12;
      if (newIdx < 0) newIdx += 12;
      return NOTES[newIdx];
    };
    const handleTransposeEvent = (e) => {
      const semitones = e.detail.semitones;
      setCurrentKey((prevKey) => {
        const newKey = transposeKey(prevKey, semitones);
        setContent((prevContent) => transposeText(prevContent, prevKey, newKey));
        return newKey;
      });
    };
    window.addEventListener("song-transpose", handleTransposeEvent);
    return () => window.removeEventListener("song-transpose", handleTransposeEvent);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "pb-20", children: content.split("\n").map((line, i) => /* @__PURE__ */ jsx(SongLine, { line }, i)) });
}

const $$Astro$2 = createAstro();
const $$SongTools = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SongTools;
  const { id } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<aside class="w-16 flex flex-col items-center py-4 gap-4 sticky top-16 h-[calc(100vh-4rem)] border-r border-white/5 md:flex"> <a${addAttribute(`/`, "href")} class="p-2 text-text-secondary hover:text-accent-main transition" title="Auto-scroll"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg> </a>  <div class="flex flex-col gap-1 items-center"> <button id="btn-transpose-up" class="p-2 text-text-secondary hover:text-accent-main transition font-bold" title="Subir Tono">
+
</button> <span class="text-xs text-text-secondary">Tono</span> <button id="btn-transpose-down" class="p-2 text-text-secondary hover:text-accent-main transition font-bold" title="Bajar Tono">
-
</button> </div> <div class="h-px w-8 bg-white/10 my-1"></div> <a${addAttribute(`/edit-song/${id}`, "href")} class="p-2 text-text-secondary hover:text-accent-main transition flex flex-col items-center gap-1" title="Editar"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg> </a> <a${addAttribute(`/print-song/${id}`, "href")} class="p-2 text-text-secondary hover:text-accent-main transition" title="Imprimir"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect width="12" height="8" x="6" y="14"></rect></svg> </a> </aside> ${renderScript($$result, "C:/dev/letras y acordes/letras-acordes/src/components/SongTools.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/letras y acordes/letras-acordes/src/components/SongTools.astro", void 0);

const $$Astro$1 = createAstro();
const $$YouTubePlayer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$YouTubePlayer;
  const { url } = Astro2.props;
  const getYouTubeId = (url2) => {
    if (!url2) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url2.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  const videoId = getYouTubeId(url);
  return renderTemplate`${videoId && renderTemplate`${maybeRenderHead()}<div class="sticky top-20 rounded-xl overflow-hidden shadow-2xl bg-black aspect-video"><iframe width="100%" height="100%"${addAttribute(`https://www.youtube.com/embed/${videoId}`, "src")} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`}`;
}, "C:/dev/letras y acordes/letras-acordes/src/components/YouTubePlayer.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  let song = null;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/");
  }
  try {
    const API_URL = "https://letras-acordes-backend.onrender.com/api";
    const res = await fetch(`${API_URL}/songs/${id}`);
    if (!res.ok) {
      if (res.status === 404) return Astro2.redirect("/");
      throw new Error("Failed to fetch song");
    }
    song = await res.json();
  } catch (e) {
    console.error("Error fetching song:", e);
    return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${song?.title} - ${song?.artist}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col min-h-screen bg-bg-main text-text-main"> <div class="flex flex-1 max-w-[1400px] mx-auto w-full"> ${renderComponent($$result2, "SongTools", $$SongTools, { "id": id })} <main class="flex-1 p-6 md:p-10 min-w-0"> ${renderComponent($$result2, "HeaderLyric", $$HeaderLyric, { "title": song?.title, "artist": song?.artist, "tone": song?.key, "category": song?.category?.name })} <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"> <div class="lg:col-span-2"> ${renderComponent($$result2, "SongView", SongView, { "client:load": true, "initialContent": song?.content, "initialKey": song?.key, "client:component-hydration": "load", "client:component-path": "@components/SongView.jsx", "client:component-export": "default" })} </div> <div class="lg:col-span-1"> ${renderComponent($$result2, "YouTubePlayer", $$YouTubePlayer, { "url": song?.url_song })} </div> </div> </main> </div> </div> ` })}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/songs/[id].astro", void 0);
const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/songs/[id].astro";
const $$url = "/songs/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
