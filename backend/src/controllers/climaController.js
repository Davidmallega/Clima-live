import * as openWeather from '../services/openWeather.js';

export async function actual(req, res) {
  try {
    const { ciudad } = req.query;
    if (!ciudad || ciudad.trim().length < 2) {
      return res.status(400).json({ error: 'Debes indicar una ciudad.' });
    }
    const datos = await openWeather.climaActual(ciudad.trim());
    res.status(200).json(datos);
  } catch (error) {
    const status = error.message === 'Ciudad no encontrada.' ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
}

export async function forecast(req, res) {
  try {
    const { ciudad } = req.query;
    if (!ciudad || ciudad.trim().length < 2) {
      return res.status(400).json({ error: 'Debes indicar una ciudad.' });
    }
    const datos = await openWeather.pronostico(ciudad.trim());
    res.status(200).json({ dias: datos });
  } catch (error) {
    const status = error.message === 'Ciudad no encontrada.' ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
}
