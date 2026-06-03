import { useEffect } from 'react';
import { useClima } from './hooks/useClima.js';
import { useTema } from './hooks/useTema.js';
import { Buscador } from './components/Buscador.jsx';
import { ClimaActual } from './components/ClimaActual.jsx';
import { Pronostico } from './components/Pronostico.jsx';

export default function App() {
  const { actual, pronostico, cargando, error, buscar } = useClima();
  const { oscuro, alternar } = useTema();

  // Carga inicial con Santiago para que la pantalla no esté vacía al abrir.
  useEffect(() => { buscar('Santiago'); }, [buscar]);

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-600 text-lg text-white">
              ☁️
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">Clima Live</h1>
              <p className="font-mono text-xs text-text-muted">Secret Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-text-muted sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Clave protegida
            </span>
            <button
              onClick={alternar}
              className="rounded-md border border-border px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface-2"
            >
              {oscuro ? '☀️ Claro' : '🌙 Oscuro'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <Buscador onBuscar={buscar} cargando={cargando} />

        {error && (
          <div className="rounded-md border border-error/30 bg-error-bg p-4 text-sm text-error">
            {error}
          </div>
        )}

        {cargando && (
          <div className="space-y-6">
            <div className="h-72 animate-pulse rounded-md bg-surface-2" />
            <div className="h-44 animate-pulse rounded-md bg-surface-2" />
          </div>
        )}

        {!cargando && actual && (
          <>
            <ClimaActual datos={actual} />
            <Pronostico dias={pronostico} />
          </>
        )}
      </main>
    </div>
  );
}
