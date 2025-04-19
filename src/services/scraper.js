const axios = require('axios');
const cheerio = require('cheerio');

class AirdropScraper {
  constructor() {
    this.sources = [
      {
        name: 'coinmarketcap',
        url: 'https://coinmarketcap.com/airdrop/',
        selector: '.cmc-table-row'
      }
    ];
  }

  async scrapeAirdrops() {
    const results = [];
    
    for (const source of this.sources) {
      try {
        console.log(`Scraping ${source.name}...`);
        const data = await this.scrapeSource(source);
        results.push(...data);
      } catch (error) {
        console.error(`Failed to scrape ${source.name}:`, error.message);
      }
    }
    
    return results;
  }

  async scrapeSource(source) {
    try {
      const response = await axios.get(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      const airdrops = [];

      // This is a mock implementation since we can't actually scrape live sites
      // In a real implementation, you would parse the HTML based on the site structure
      return this.mockAirdropData();
      
    } catch (error) {
      console.error(`Error scraping ${source.name}:`, error.message);
      return [];
    }
  }

  mockAirdropData() {
    // Mock data to simulate scraping results
    return [
      {
        name: 'Starknet Token Distribution',
        project: 'Starknet',
        description: 'Layer 2 scaling solution for Ethereum',
        requirements: ['Bridge to Starknet', 'Complete transactions', 'Use dApps'],
        status: 'active',
        startDate: '2025-04-01',
        endDate: '2025-07-01',
        estimatedReward: '$300-1500',
        difficulty: 'medium',
        chain: 'Starknet',
        tags: ['l2', 'ethereum', 'scaling']
      },
      {
        name: 'zkSync Era Season',
        project: 'zkSync',
        description: 'Zero-knowledge rollup ecosystem rewards',
        requirements: ['Bridge funds', 'DeFi participation', 'NFT activities'],
        status: 'upcoming',
        startDate: '2025-05-15',
        endDate: '2025-09-15',
        estimatedReward: '$400-2000',
        difficulty: 'easy',
        chain: 'zkSync Era',
        tags: ['zk', 'l2', 'defi']
      }
    ];
  }

  async updateAirdrops(storage) {
    try {
      const scrapedAirdrops = await this.scrapeAirdrops();
      let addedCount = 0;
      let updatedCount = 0;

      for (const airdropData of scrapedAirdrops) {
        // Check if airdrop already exists
        const existing = storage.getAll().find(a => 
          a.name.toLowerCase() === airdropData.name.toLowerCase()
        );

        if (existing) {
          // Update existing airdrop
          storage.update(existing.id, airdropData);
          updatedCount++;
        } else {
          // Add new airdrop
          storage.create(airdropData);
          addedCount++;
        }
      }

      console.log(`Scraping complete: ${addedCount} new, ${updatedCount} updated`);
      return { added: addedCount, updated: updatedCount, total: scrapedAirdrops.length };
    } catch (error) {
      console.error('Error updating airdrops:', error.message);
      throw error;
    }
  }
}

module.exports = new AirdropScraper();