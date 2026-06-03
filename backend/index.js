import express from 'express';
import cors from 'cors';
import { leerSecreto } from './src/services/secretos.js';
import { configurar as configurarOpenWeather } from './src/services/openWeather.js';
import climaRouter from './src/routes/clima.js';

const app = express();

const origenesPermitidos = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://clima-live.web.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origenesPermitidos.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origen no permitido por CORS'));
      }
    },
  })
);

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ estado: 'ok', servicio: 'clima-api' });
});

app.use('/api/clima', climaRouter);

app.use((req, res) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.path}` });
});

app.use((err, req, res, next) => {
  console.error('Error no controlado:', err.message);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

// Secreto leído una vez al arrancar — si falla, el proceso termina inmediatamente.
const PORT = process.env.PORT || 8080;
const NOMBRE_SECRETO = process.env.NOMBRE_SECRETO || 'openweather-api-key';

async function arrancar() {
  try {
    console.log(`🔐 Leyendo "${NOMBRE_SECRETO}" desde Secret Manager...`);
    const apiKey = await leerSecreto(NOMBRE_SECRETO);
    configurarOpenWeather(apiKey);
    console.log(`✅ Clave cargada (${apiKey.length} caracteres, no se mostrará).`);

    app.listen(PORT, () => {
      console.log(`☁️  Clima API corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ No se pudo cargar la clave de OpenWeather:', error.message);
    console.error('   Verifica que el secreto existe y que esta cuenta tiene permisos.');
    process.exit(1);
  }
}

arrancar();
