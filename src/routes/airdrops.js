const express = require('express');
const router = express.Router();
const storage = require('../data/storage');

// Get all airdrops
router.get('/', (req, res) => {
  const { status, chain } = req.query;
  
  let airdrops = storage.getAll();
  
  if (status) {
    airdrops = storage.getByStatus(status);
  }
  
  if (chain) {
    airdrops = storage.getByChain(chain);
  }
  
  res.json(airdrops);
});

// Get airdrop by ID
router.get('/:id', (req, res) => {
  const airdrop = storage.getById(req.params.id);
  
  if (!airdrop) {
    return res.status(404).json({ error: 'Airdrop not found' });
  }
  
  res.json(airdrop);
});

// Create new airdrop
router.post('/', (req, res) => {
  try {
    const airdrop = storage.create(req.body);
    res.status(201).json(airdrop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update airdrop
router.put('/:id', (req, res) => {
  const airdrop = storage.update(req.params.id, req.body);
  
  if (!airdrop) {
    return res.status(404).json({ error: 'Airdrop not found' });
  }
  
  res.json(airdrop);
});

// Delete airdrop
router.delete('/:id', (req, res) => {
  const deleted = storage.delete(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({ error: 'Airdrop not found' });
  }
  
  res.status(204).send();
});

module.exports = router;