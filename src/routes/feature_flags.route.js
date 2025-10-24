import express from 'express';
import * as featureFlagController from '../controllers/featureFlagController.js';

const featureFlagsRoutes = express.Router();

featureFlagsRoutes.get('/', featureFlagController.getApplicationFeatureFlags);

export default featureFlagsRoutes;
