const Airdrop = require('../models/Airdrop');

class AirdropStorage {
  constructor() {
    this.airdrops = new Map();
    this.nextId = 1;
    
    // Add some sample data
    this.addSampleData();
  }

  addSampleData() {
    const sampleAirdrops = [
      {
        name: 'LayerZero Token Drop',
        project: 'LayerZero',
        description: 'Complete cross-chain transactions to qualify',
        requirements: ['Bridge tokens', 'Use different chains', 'Hold for 30 days'],
        status: 'active',
        startDate: '2025-04-01',
        endDate: '2025-06-01',
        estimatedReward: '$500-2000',
        difficulty: 'medium',
        chain: 'Multi-chain',
        tags: ['defi', 'bridge', 'interoperability']
      },
      {
        name: 'Arbitrum Season 2',
        project: 'Arbitrum',
        description: 'Participate in ecosystem activities',
        requirements: ['Use dApps', 'Provide liquidity', 'Vote on governance'],
        status: 'upcoming',
        startDate: '2025-05-01',
        endDate: '2025-08-01',
        estimatedReward: '$200-1000',
        difficulty: 'easy',
        chain: 'Arbitrum',
        tags: ['l2', 'defi', 'governance']
      }
    ];

    sampleAirdrops.forEach(data => this.create(data));
  }

  create(airdropData) {
    const airdrop = new Airdrop({
      ...airdropData,
      id: this.nextId++
    });
    this.airdrops.set(airdrop.id, airdrop);
    return airdrop;
  }

  getAll() {
    return Array.from(this.airdrops.values());
  }

  getById(id) {
    return this.airdrops.get(parseInt(id));
  }

  update(id, updates) {
    const airdrop = this.airdrops.get(parseInt(id));
    if (!airdrop) return null;
    
    Object.assign(airdrop, updates);
    return airdrop;
  }

  delete(id) {
    return this.airdrops.delete(parseInt(id));
  }

  getByStatus(status) {
    return this.getAll().filter(airdrop => airdrop.status === status);
  }

  getByChain(chain) {
    return this.getAll().filter(airdrop => 
      airdrop.chain.toLowerCase().includes(chain.toLowerCase())
    );
  }
}

module.exports = new AirdropStorage();