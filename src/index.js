const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const airdropRoutes = require('./routes/airdrops');
const trackingRoutes = require('./routes/tracking');
const adminRoutes = require('./routes/admin');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'AirdropTracker API',
    version: '0.1.0',
    endpoints: [
      'GET /airdrops - Get all airdrops',
      'GET /airdrops/:id - Get airdrop by ID',
      'POST /airdrops - Create new airdrop',
      'PUT /airdrops/:id - Update airdrop',
      'DELETE /airdrops/:id - Delete airdrop',
      'GET /tracking - Get user trackings',
      'POST /tracking - Start tracking airdrop',
      'PUT /tracking/:id - Update tracking',
      'PATCH /tracking/:id/progress - Update progress',
      'GET /tracking/users/:userId/stats - Get user stats'
    ]
  });
});

app.use('/airdrops', airdropRoutes);
app.use('/tracking', trackingRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});