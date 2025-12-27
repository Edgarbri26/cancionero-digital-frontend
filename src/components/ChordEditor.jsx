import React, { useState, useRef, useEffect } from 'react';
import { transposeText } from '../utils/music';

export default function ChordEditor({ name = "content", initialContent = "" }) {
    // Estado inicial vacío o con instrucciones
    const [content, setContent] = useState(initialContent);
    const [currentKey, setCurrentKey] = useState("C");
    const textareaRef = useRef(null);

    const commonChords = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Cm', 'Dm', 'Em', 'Am', 'Bm'];

    useEffect(() => {
        const handleKeyChange = (e) => {
            const newKey = e.detail.key;
            setContent(prevContent => transposeText(prevContent, currentKey, newKey));
            setCurrentKey(newKey);
        };

        window.addEventListener('song-key-change', handleKeyChange);
        return () => window.removeEventListener('song-key-change', handleKeyChange);
    }, [currentKey]);

    const addChord = (chordName) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;

        // Insertamos formato [Acorde]
        const newText = text.substring(0, start) + `[${chordName}]` + text.substring(end);

        setContent(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + chordName.length + 2, start + chordName.length + 2);
        }, 0);
    };

    return (
        <div className="space-y-4">
            {/* TRUCO: Input oculto para que el formulario de Astro reciba los datos */}
            <input type="hidden" name={name} value={content} />

            {/* Botonera */}
            <div className="flex flex-wrap gap-2 p-2 bg-white/5 rounded-lg border border-white/10">
                <span className="text-xs text-white/50 flex items-center mr-2">Insertar:</span>
                {commonChords.map(chord => (
                    <button
                        key={chord}
                        type="button" // Importante: type="button" para no enviar el form al hacer click
                        onClick={() => addChord(chord)}
                        className="px-3 py-1 text-sm font-bold text-text-main bg-bg-secondary hover:bg-accent-main hover:text-white border border-white/10 rounded transition-colors"
                    >
                        {chord}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
                {/* Área de Edición */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-text-secondary mb-2">Editor (Código)</label>
                    <textarea
                        ref={textareaRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-full bg-bg-secondary border border-white/10 rounded-lg p-4 font-mono text-sm text-text-main focus:outline-none focus:border-accent-main resize-none placeholder-white/20"
                        placeholder="Escribe la letra aquí y presiona los botones de acordes para insertar...&#10;Ejemplo: Dios es[C]ta aqui"
                    />
                </div>

                {/* Vista Previa */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-text-secondary mb-2">Vista Previa (En vivo)</label>
                    <div className="w-full h-full bg-[#fffbf6] text-gray-900 border border-white/10 rounded-lg p-6 overflow-y-auto shadow-inner">
                        {content.split('\n').map((line, i) => (
                            <LineRenderer key={i} line={line} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Renderizador visual (El que arreglamos anteriormente)
const LineRenderer = ({ line }) => {
    if (!line) return <div className="h-8"></div>;
    const segments = line.split(/(\[.*?\])/);

    return (
        <div className="relative font-mono text-lg whitespace-pre-wrap leading-[3.5rem]">
            {segments.map((seg, i) => {
                const match = seg.match(/^\[(.*?)\]$/);
                if (match) {
                    return (
                        <span key={i} className="inline-block relative w-0 overflow-visible align-baseline">
                            <span className="absolute bottom-[1.2em] left-0 -translate-x-1/2 text-red-600 font-bold text-sm select-none whitespace-nowrap">
                                {match[1]}
                            </span>
                        </span>
                    );
                }
                return <span key={i}>{seg}</span>;
            })}
        </div>
    );
};