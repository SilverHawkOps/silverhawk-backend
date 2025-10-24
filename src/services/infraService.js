// services/infraService.js
import { Infra } from '../models/infra.model.js';

export const createInfra = async (data) => {
  // generate API key if not provided
  if (!data.apiKey) data.apiKey = Math.random().toString(36).substr(2, 16);
  return Infra.create(data);
};

export const listInfra = async (query) => {
  return Infra.find(query).sort({ createdAt: -1 });
};

export const getInfra = async (id) => {
  return Infra.findById(id);
};

export const updateInfra = async (id, data) => {
  return Infra.findByIdAndUpdate(id, data, { new: true });
};

export const deleteInfra = async (id) => {
  return Infra.findByIdAndDelete(id);
};

export const updateHeartbeat = async (hostname) => {
  return Infra.findOneAndUpdate(
    { hostname },
    { lastHeartbeat: new Date(), status: 'online' },
    { new: true }
  );
};
