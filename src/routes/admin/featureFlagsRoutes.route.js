// routes/infraRoutes.js
import express from 'express';
import * as featureFlagsController from '../../controllers/admin/featureFlagsController.js';

const featureFlagsRoutes = express.Router();

featureFlagsRoutes.post('/', featureFlagsController.createFeatureFlag);
featureFlagsRoutes.post('/first-setup', featureFlagsController.createFirstTimeFeatureFlags);
featureFlagsRoutes.get('/', featureFlagsController.getAllFeatureFlags);
featureFlagsRoutes.get('/:name', featureFlagsController.getFeatureFlagByName);
featureFlagsRoutes.patch('/:name/status', featureFlagsController.updateFeatureFlagStatus);
featureFlagsRoutes.put('/:name', featureFlagsController.updateFeatureFlag);
featureFlagsRoutes.delete('/:name', featureFlagsController.deleteFeatureFlag);

export default featureFlagsRoutes;
