# AirdropTracker

A Node.js API for tracking and managing cryptocurrency airdrop opportunities. Track airdrops across different blockchains, monitor your participation progress, and discover new opportunities.

## Features

- **Airdrop Management**: Create, read, update, and delete airdrop information
- **User Tracking**: Track individual user participation in airdrops
- **Progress Monitoring**: Monitor completion status and progress percentage
- **Web Scraping**: Automated data collection from airdrop sources
- **Chain Support**: Multi-blockchain airdrop tracking
- **Admin Panel**: Administrative endpoints for system management

## API Endpoints

### Airdrops
- `GET /airdrops` - Get all airdrops
- `GET /airdrops/:id` - Get specific airdrop
- `POST /airdrops` - Create new airdrop
- `PUT /airdrops/:id` - Update airdrop
- `DELETE /airdrops/:id` - Delete airdrop

### User Tracking
- `GET /tracking` - Get all user trackings
- `POST /tracking` - Start tracking an airdrop
- `PUT /tracking/:id` - Update tracking information
- `PATCH /tracking/:id/progress` - Update progress
- `GET /tracking/users/:userId/stats` - Get user statistics

### Admin
- `POST /admin/scrape` - Trigger manual scraping
- `GET /admin/stats` - Get system statistics
- `GET /admin/health` - Health check

## Installation

```bash
npm install
```

## Usage

```bash
npm start
# or for development
npm run dev
```

Server runs on port 3000 by default.

## Data Structure

### Airdrop
```javascript
{
  "id": 1,
  "name": "LayerZero Token Drop",
  "project": "LayerZero",
  "description": "Complete cross-chain transactions to qualify",
  "requirements": ["Bridge tokens", "Use different chains"],
  "status": "active",
  "startDate": "2025-04-01",
  "endDate": "2025-06-01",
  "estimatedReward": "$500-2000",
  "difficulty": "medium",
  "chain": "Multi-chain",
  "tags": ["defi", "bridge"]
}
```

### User Tracking
```javascript
{
  "id": 1,
  "userId": "user123",
  "airdropId": 1,
  "status": "participating",
  "progress": 75,
  "completedRequirements": ["Bridge tokens"],
  "walletAddress": "0x...",
  "notes": "Completed first requirement"
}
```

## License

MIT