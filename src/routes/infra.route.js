// routes/infraRoutes.js
import express from 'express';
import * as infraController from '../controllers/infraController.js';

const infraRoutes = express.Router();

infraRoutes.post('/', infraController.createInfra);
infraRoutes.get('/', infraController.listInfra);
infraRoutes.get('/:id/metrics', infraController.getInfraMetrics);
infraRoutes.get('/:id', infraController.getInfra);
infraRoutes.put('/:id', infraController.updateInfra);
infraRoutes.delete('/:id', infraController.deleteInfra);

// Heartbeat API (agent sends heartbeat)
infraRoutes.post('/heartbeat', infraController.heartbeat);
infraRoutes.post('/metrics', infraController.saveMetrics);
infraRoutes.post('/metrics/stop', infraController.stopInfraAgent);

export default infraRoutes;
