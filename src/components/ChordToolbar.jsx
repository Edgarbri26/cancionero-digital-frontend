import React from 'react';

const commonChords = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Cm', 'Dm', 'Em', 'Am', 'Bm'];

export default function ChordToolbar({ onTranspose, onInsertChord }) {
    return (
        <div className="flex flex-wrap gap-2 p-2 bg-white/5 rounded-lg border border-white/10 items-center">
            <div className="flex gap-1 mr-4 border-r border-white/10 pr-4">
                <button
                    type="button"
                    onClick={() => onTranspose(-1)}
                    className="px-3 py-1 text-sm font-bold text-white bg-red-500/80 hover:bg-red-600 rounded transition-colors"
                    title="Bajar medio tono"
                >
                    - ½ Tono
                </button>
                <button
                    type="button"
                    onClick={() => onTranspose(1)}
                    className="px-3 py-1 text-sm font-bold text-white bg-green-500/80 hover:bg-green-600 rounded transition-colors"
                    title="Subir medio tono"
                >
                    + ½ Tono
                </button>
            </div>

            <span className="text-xs text-white/50 flex items-center mr-2">Insertar:</span>
            {commonChords.map(chord => (
                <button
                    key={chord}
                    type="button"
                    onClick={() => onInsertChord(chord)}
                    className="px-3 py-1 text-sm font-bold text-text-main bg-bg-secondary hover:bg-accent-main hover:text-white border border-white/10 rounded transition-colors"
                >
                    {chord}
                </button>
            ))}
        </div>
    );
}
