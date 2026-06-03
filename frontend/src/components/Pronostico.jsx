// components/Pronostico.jsx
const ICONOS = {
  '01': '☀️', '02': '⛅', '03': '☁️', '04': '☁️',
  '09': '🌧️', '10': '🌦️', '11': '⛈️', '13': '❄️', '50': '🌫️',
};
function iconoPorCodigo(codigo) {
  if (!codigo) return '🌡️';
  return ICONOS[codigo.slice(0, 2)] || '🌡️';
}

const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export function Pronostico({ dias }) {
  if (!dias || dias.length === 0) return null;

  return (
    <div className="rounded-md border border-border bg-surface p-5 shadow-sm">
      <h3 className="mb-1 text-base font-semibold">Próximos 5 días</h3>
      <p className="mb-4 text-xs text-text-muted">Pronóstico al mediodía</p>

      <div className="grid grid-cols-5 gap-2">
        {dias.map((dia) => {
          const fecha = new Date(dia.fecha);
          const nombreDia = DIAS[fecha.getDay()];
          return (
            <div
              key={dia.fecha}
              className="flex flex-col items-center gap-1.5 rounded-sm border border-border bg-bg p-3 text-center"
            >
              <p className="text-xs font-medium text-text-muted">{nombreDia}</p>
              <div className="text-3xl">{iconoPorCodigo(dia.icono)}</div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-semibold">{dia.maxima}°</span>
                <span className="text-xs text-text-muted">{dia.minima}°</span>
              </div>
              <p className="line-clamp-1 text-[10px] capitalize text-text-subtle">
                {dia.descripcion}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
