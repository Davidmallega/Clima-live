const ICONOS = {
  '01': '☀️', '02': '⛅', '03': '☁️', '04': '☁️',
  '09': '🌧️', '10': '🌦️', '11': '⛈️', '13': '❄️', '50': '🌫️',
};
function iconoPorCodigo(codigo) {
  if (!codigo) return '🌡️';
  return ICONOS[codigo.slice(0, 2)] || '🌡️';
}

export function ClimaActual({ datos }) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-surface shadow-sm">
      <div className="border-b border-border bg-surface-2 px-6 py-3">
        <p className="text-xs uppercase tracking-wide text-text-muted">Clima actual</p>
        <h2 className="text-lg font-semibold">
          {datos.ciudad}
          {datos.pais && <span className="ml-2 text-sm font-mono text-text-muted">{datos.pais}</span>}
        </h2>
      </div>

      <div className="flex flex-col items-center gap-2 px-6 py-8 text-center sm:flex-row sm:justify-center sm:gap-8">
        <div className="text-7xl leading-none">{iconoPorCodigo(datos.icono)}</div>
        <div>
          <div className="flex items-start justify-center">
            <span className="text-6xl font-bold text-text leading-none">{datos.temperatura}</span>
            <span className="text-2xl text-text-muted mt-1">°C</span>
          </div>
          <p className="mt-1 text-sm capitalize text-text-muted">{datos.descripcion}</p>
          <p className="mt-0.5 text-xs text-text-subtle">Sensación térmica {datos.sensacion}°</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-border px-6 py-4 sm:grid-cols-4">
        <Metrica etiqueta="Mín / Máx" valor={`${datos.minima}° / ${datos.maxima}°`} />
        <Metrica etiqueta="Humedad" valor={`${datos.humedad}%`} />
        <Metrica etiqueta="Viento" valor={`${datos.viento} km/h`} />
        <Metrica etiqueta="Presión" valor={`${datos.presion} hPa`} />
      </div>
    </div>
  );
}

function Metrica({ etiqueta, valor }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-text-muted">{etiqueta}</p>
      <p className="mt-0.5 text-sm font-medium">{valor}</p>
    </div>
  );
}
