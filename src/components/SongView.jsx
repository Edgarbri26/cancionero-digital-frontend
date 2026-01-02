import React, { useState, useEffect } from 'react';
import SongLine from './SongLine';
import { transposeText } from '../utils/music';

export default function SongView({ initialContent, initialKey = 'C', originalKey = 'C' }) {
    const [content, setContent] = useState(() => {
        // If initialKey (target) is different from originalKey (source), transpose immediately
        if (initialKey && originalKey && initialKey !== originalKey) {
            return transposeText(initialContent, originalKey, initialKey);
        }
        return initialContent;
    });
    const [currentKey, setCurrentKey] = useState(initialKey || originalKey);

    useEffect(() => {

        // Helper interno simple para calcular la nueva nota clave
        // Nota: music.js tiene transposeChord, pero aquí necesitamos mover solo el Key un paso.
        // Podríamos usar la lógica full de music.js pero para "semitonos" es más directo calcular el índice.
        const transposeKey = (key, semitones) => {
            const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
            // Normalizar flat a sharp si es necesario
            const map = {
                'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
                'Cb': 'B', 'Fb': 'E', 'E#': 'F', 'B#': 'C'
            };
            const n = map[key] || key;
            let idx = NOTES.indexOf(n);
            if (idx === -1) return key;

            let newIdx = (idx + semitones) % 12;
            if (newIdx < 0) newIdx += 12;
            return NOTES[newIdx];
        };

        // Versión mejorada que usa transposeText directamente si pasamos la lógica correcta:
        // Pero transposeText pide (text, fromKey, toKey).
        // Así que calculemos el newKey primero.

        const handleTransposeEvent = (e) => {
            const semitones = e.detail.semitones;
            setCurrentKey(prevKey => {
                const newKey = transposeKey(prevKey, semitones);
                setContent(prevContent => transposeText(prevContent, prevKey, newKey));
                return newKey;
            });
        };

        window.addEventListener('song-transpose', handleTransposeEvent);
        return () => window.removeEventListener('song-transpose', handleTransposeEvent);
    }, []);

    return (
        <div className="pb-20">
            {content.split('\n').map((line, i) => (
                <SongLine key={i} line={line} />
            ))}
        </div>
    );
}
