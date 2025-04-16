const express = require('express');
const router = express.Router();
const userStorage = require('../data/userStorage');
const airdropStorage = require('../data/storage');

// Get all trackings (admin)
router.get('/', (req, res) => {
  const { userId, airdropId, status } = req.query;
  
  let trackings = userStorage.getAll();
  
  if (userId) {
    trackings = userStorage.getByUserId(userId);
  }
  
  if (airdropId) {
    trackings = userStorage.getByAirdropId(airdropId);
  }
  
  if (status) {
    trackings = userStorage.getByStatus(status);
  }
  
  res.json(trackings);
});

// Get user's tracking by ID
router.get('/:id', (req, res) => {
  const tracking = userStorage.getById(req.params.id);
  
  if (!tracking) {
    return res.status(404).json({ error: 'Tracking not found' });
  }
  
  res.json(tracking);
});

// Create new tracking
router.post('/', (req, res) => {
  try {
    const { userId, airdropId } = req.body;
    
    // Check if airdrop exists
    const airdrop = airdropStorage.getById(airdropId);
    if (!airdrop) {
      return res.status(400).json({ error: 'Airdrop not found' });
    }
    
    // Check if user is already tracking this airdrop
    const existing = userStorage.getUserAirdropTracking(userId, airdropId);
    if (existing) {
      return res.status(400).json({ error: 'User is already tracking this airdrop' });
    }
    
    const tracking = userStorage.create(req.body);
    res.status(201).json(tracking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update tracking
router.put('/:id', (req, res) => {
  const tracking = userStorage.update(req.params.id, req.body);
  
  if (!tracking) {
    return res.status(404).json({ error: 'Tracking not found' });
  }
  
  res.json(tracking);
});

// Update progress
router.patch('/:id/progress', (req, res) => {
  const tracking = userStorage.getById(req.params.id);
  
  if (!tracking) {
    return res.status(404).json({ error: 'Tracking not found' });
  }
  
  const { progress, completedRequirements } = req.body;
  tracking.updateProgress(progress, completedRequirements);
  
  res.json(tracking);
});

// Add note
router.patch('/:id/note', (req, res) => {
  const tracking = userStorage.getById(req.params.id);
  
  if (!tracking) {
    return res.status(404).json({ error: 'Tracking not found' });
  }
  
  const { note } = req.body;
  tracking.addNote(note);
  
  res.json(tracking);
});

// Delete tracking
router.delete('/:id', (req, res) => {
  const deleted = userStorage.delete(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({ error: 'Tracking not found' });
  }
  
  res.status(204).send();
});

// Get user statistics
router.get('/users/:userId/stats', (req, res) => {
  const stats = userStorage.getUserStats(req.params.userId);
  res.json(stats);
});

module.exports = router;