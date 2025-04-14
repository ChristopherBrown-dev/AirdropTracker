const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const airdropRoutes = require('./routes/airdrops');

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
      'DELETE /airdrops/:id - Delete airdrop'
    ]
  });
});

app.use('/airdrops', airdropRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});