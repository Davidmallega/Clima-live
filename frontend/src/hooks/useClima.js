// Carga clima actual y pronóstico en paralelo para máxima velocidad.
import { useState, useCallback } from 'react';
import { climaAPI } from '../services/api.js';

export function useClima() {
  const [actual, setActual] = useState(null);
  const [pronostico, setPronostico] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const buscar = useCallback(async (ciudad) => {
    if (!ciudad?.trim()) return;
    try {
      setCargando(true);
      setError(null);
      const [datosActual, datosPronostico] = await Promise.all([
        climaAPI.actual(ciudad),
        climaAPI.pronostico(ciudad),
      ]);
      setActual(datosActual);
      setPronostico(datosPronostico.dias);
    } catch (err) {
      setError(err.message);
      setActual(null);
      setPronostico([]);
    } finally {
      setCargando(false);
    }
  }, []);

  return { actual, pronostico, cargando, error, buscar };
}
