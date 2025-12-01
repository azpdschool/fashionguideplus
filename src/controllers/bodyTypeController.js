import { BodyTypeModel } from '../models/bodyTypeModel.js';

export const BodyTypeController = {
  async getAll(req, res) {
    try {
      const bodyTypes = await BodyTypeModel.getAll();
      res.json(bodyTypes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};