const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const BASE = `${API_URL}/api/clima`;

async function manejarRespuesta(r) {
  if (!r.ok) {
    const d = await r.json().catch(() => ({}));
    throw new Error(d.error || `Error HTTP ${r.status}`);
  }
  return r.json();
}

export const climaAPI = {
  actual: (ciudad) => fetch(`${BASE}/actual?ciudad=${encodeURIComponent(ciudad)}`).then(manejarRespuesta),
  pronostico: (ciudad) => fetch(`${BASE}/pronostico?ciudad=${encodeURIComponent(ciudad)}`).then(manejarRespuesta),
};
