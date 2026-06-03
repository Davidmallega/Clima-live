// components/Buscador.jsx
import { useState } from 'react';

const SUGERENCIAS = ['Santiago', 'Valparaíso', 'Concepción', 'Buenos Aires', 'Lima', 'Madrid', 'Tokyo'];

export function Buscador({ onBuscar, cargando }) {
  const [ciudad, setCiudad] = useState('');

  const enviar = (e) => {
    e.preventDefault();
    if (ciudad.trim()) onBuscar(ciudad.trim());
  };

  return (
    <div className="space-y-3">
      <form onSubmit={enviar} className="flex gap-2">
        <input
          type="text"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          placeholder="Busca una ciudad..."
          className="flex-1 rounded-sm border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-subtle focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
        <button
          type="submit"
          disabled={cargando || !ciudad.trim()}
          className="rounded-sm bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {cargando ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {/* Sugerencias rápidas */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-text-muted">Prueba:</span>
        {SUGERENCIAS.map((s) => (
          <button
            key={s}
            onClick={() => { setCiudad(s); onBuscar(s); }}
            className="rounded-full border border-border px-3 py-0.5 text-xs text-text-muted transition-colors hover:border-brand-500 hover:text-brand-500"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
