import { Router } from 'express';
import { actual, forecast } from '../controllers/climaController.js';

const router = Router();

router.get('/actual', actual);
router.get('/pronostico', forecast);

export default router;
