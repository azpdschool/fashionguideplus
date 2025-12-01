import { DictionaryModel } from '../models/dictionaryModel.js';

export const DictionaryController = {
  async getAll(req, res) {
    try {
      const dictionary = await DictionaryModel.getAll();
      res.json(dictionary);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};