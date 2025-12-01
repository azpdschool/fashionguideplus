import { StyleModel } from '../models/styleModel.js';

export const StyleController = {
  async getAll(req, res) {
    try {
      const styles = await StyleModel.getAll();
      res.json(styles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};