const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Inyectada una vez al arrancar desde Secret Manager — no se lee en cada petición.
let API_KEY = null;

export function configurar(apiKey) {
  API_KEY = apiKey;
}

async function llamar(endpoint) {
  if (!API_KEY) {
    throw new Error('El servicio de clima no fue inicializado con su clave.');
  }
  const respuesta = await fetch(`${BASE_URL}${endpoint}&appid=${API_KEY}&units=metric&lang=es`);
  if (!respuesta.ok) {
    if (respuesta.status === 404) throw new Error('Ciudad no encontrada.');
    if (respuesta.status === 401) throw new Error('Clave de API inválida.');
    throw new Error(`OpenWeather respondió ${respuesta.status}`);
  }
  return respuesta.json();
}

export async function climaActual(ciudad) {
  const datos = await llamar(`/weather?q=${encodeURIComponent(ciudad)}`);
  return {
    ciudad: datos.name,
    pais: datos.sys?.country,
    temperatura: Math.round(datos.main.temp),
    sensacion: Math.round(datos.main.feels_like),
    descripcion: datos.weather[0]?.description,
    icono: datos.weather[0]?.icon,
    humedad: datos.main.humidity,
    viento: Math.round(datos.wind.speed * 3.6), // m/s a km/h
    presion: datos.main.pressure,
    minima: Math.round(datos.main.temp_min),
    maxima: Math.round(datos.main.temp_max),
    nubosidad: datos.clouds?.all,
    actualizado: new Date(datos.dt * 1000).toISOString(),
  };
}

export async function pronostico(ciudad) {
  const datos = await llamar(`/forecast?q=${encodeURIComponent(ciudad)}`);

  const porDia = new Map();
  for (const item of datos.list) {
    const fecha = new Date(item.dt * 1000);
    const dia = fecha.toISOString().split('T')[0];
    const hora = fecha.getUTCHours();
    // Usamos la lectura más cercana a las 12:00 UTC como representativa del día.
    const distanciaActual = Math.abs(hora - 12);
    const guardado = porDia.get(dia);
    if (!guardado || Math.abs(new Date(guardado.dt * 1000).getUTCHours() - 12) > distanciaActual) {
      porDia.set(dia, item);
    }
  }

  return Array.from(porDia.values())
    .sort((a, b) => a.dt - b.dt)
    .slice(0, 5)
    .map((item) => ({
      fecha: new Date(item.dt * 1000).toISOString(),
      temperatura: Math.round(item.main.temp),
      minima: Math.round(item.main.temp_min),
      maxima: Math.round(item.main.temp_max),
      descripcion: item.weather[0]?.description,
      icono: item.weather[0]?.icon,
    }));
}
