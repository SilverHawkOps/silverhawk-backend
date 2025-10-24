// routes/infraRoutes.js
import express from 'express';
import * as analyticsController from '../../controllers/analytics/analyticsController.js';

const analyticsRoutes = express.Router();

analyticsRoutes.post('/', analyticsController.insertAnalyticsMetrics);

export default analyticsRoutes;
