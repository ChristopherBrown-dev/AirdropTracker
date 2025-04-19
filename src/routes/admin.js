const express = require('express');
const router = express.Router();
const scraper = require('../services/scraper');
const airdropStorage = require('../data/storage');
const userStorage = require('../data/userStorage');

// Manual scrape trigger
router.post('/scrape', async (req, res) => {
  try {
    const result = await scraper.updateAirdrops(airdropStorage);
    res.json({
      success: true,
      message: 'Scraping completed successfully',
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Scraping failed',
      error: error.message
    });
  }
});

// Get system statistics
router.get('/stats', (req, res) => {
  const airdrops = airdropStorage.getAll();
  const trackings = userStorage.getAll();
  
  const stats = {
    airdrops: {
      total: airdrops.length,
      active: airdrops.filter(a => a.status === 'active').length,
      upcoming: airdrops.filter(a => a.status === 'upcoming').length,
      ended: airdrops.filter(a => a.status === 'ended').length,
      byChain: {}
    },
    tracking: {
      total: trackings.length,
      interested: trackings.filter(t => t.status === 'interested').length,
      participating: trackings.filter(t => t.status === 'participating').length,
      completed: trackings.filter(t => t.status === 'completed').length,
      failed: trackings.filter(t => t.status === 'failed').length
    },
    users: {
      uniqueUsers: [...new Set(trackings.map(t => t.userId))].length
    }
  };

  // Calculate chain distribution
  airdrops.forEach(airdrop => {
    stats.airdrops.byChain[airdrop.chain] = (stats.airdrops.byChain[airdrop.chain] || 0) + 1;
  });

  res.json(stats);
});

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '0.1.0'
  });
});

module.exports = router;