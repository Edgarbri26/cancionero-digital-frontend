import React, { useState, useRef, useEffect } from 'react';
import { transposeText, transposeChord } from '../utils/music';
import ChordToolbar from './ChordToolbar';

export default function ChordEditor({ name = "content", initialContent = "" }) {
    // Estado inicial vacío o con instrucciones
    const [content, setContent] = useState(initialContent);
    const [currentKey, setCurrentKey] = useState("C");
    const keyRef = useRef("C"); // Ref para acceso síncrono y evitar doble transposición
    const textareaRef = useRef(null);

    const commonChords = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Cm', 'Dm', 'Em', 'Am', 'Bm'];

    useEffect(() => {
        const handleKeyChange = (e) => {
            const newKey = e.detail.key;
            // Usamos keyRef.current para saber la tonalidad ACTUAL real (incluso si se acabó de cambiar localmente)
            const fromKey = keyRef.current;

            if (fromKey !== newKey) {
                setContent(prevContent => transposeText(prevContent, fromKey, newKey));
                setCurrentKey(newKey);
                keyRef.current = newKey; // Sincronizamos ref
            }
        };

        window.addEventListener('song-key-change', handleKeyChange);
        return () => window.removeEventListener('song-key-change', handleKeyChange);
    }, []); // Ya no depende de currentKey porque usamos ref

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

    const handleTranspose = (semitones) => {
        const newContent = content.replace(/\[(.*?)\]/g, (match, chord) => {
            return `[${transposeChord(chord, semitones)}]`;
        });
        setContent(newContent);

        // Calcular nueva tonalidad
        const nextKey = transposeChord(keyRef.current, semitones);

        // Actualizamos Refs y Estado INMEDIATAMENTE antes de despachar el evento
        keyRef.current = nextKey;
        setCurrentKey(nextKey);

        // Despachamos evento. 
        // Cuando el evento 'song-key-change' regrese (eco), handleKeyChange verá que keyRef.current === nextKey
        // y NO hará una segunda transposición.
        window.dispatchEvent(new CustomEvent('editor-key-change', {
            detail: { key: nextKey }
        }));
    };

    return (
        <div className="space-y-4">
            {/* TRUCO: Input oculto para que el formulario de Astro reciba los datos */}
            <input type="hidden" name={name} value={content} />

            {/* Botonera Reutilizable */}
            <ChordToolbar onTranspose={handleTranspose} onInsertChord={addChord} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Área de Edición */}
                <div className="flex flex-col h-[400px] lg:h-[500px]">
                    <label className="text-sm font-medium text-text-secondary mb-2">Editor (Código)</label>
                    <textarea
                        ref={textareaRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full flex-1 bg-bg-secondary border border-white/10 rounded-lg p-4 font-mono text-sm text-text-main focus:outline-none focus:border-accent-main resize-none placeholder-white/20"
                        placeholder="Escribe la letra aquí y presiona los botones de acordes para insertar...&#10;Ejemplo: Dios es[C]ta aqui"
                    />
                </div>

                {/* Vista Previa */}
                <div className="flex flex-col h-[400px] lg:h-[500px]">
                    <label className="text-sm font-medium text-text-secondary mb-2">Vista Previa (En vivo)</label>
                    <div className="w-full flex-1 bg-[#fffbf6] text-gray-900 border border-white/10 rounded-lg p-6 overflow-y-auto shadow-inner">
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