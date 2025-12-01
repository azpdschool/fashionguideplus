import { bodyTypes } from '../../src/data/bodyTypes.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method === 'GET') {
    res.status(200).json(bodyTypes);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}