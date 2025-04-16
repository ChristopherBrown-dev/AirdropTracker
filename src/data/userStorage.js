const UserTracking = require('../models/UserTracking');

class UserTrackingStorage {
  constructor() {
    this.userTrackings = new Map();
    this.nextId = 1;
  }

  create(trackingData) {
    const tracking = new UserTracking({
      ...trackingData,
      id: this.nextId++
    });
    this.userTrackings.set(tracking.id, tracking);
    return tracking;
  }

  getAll() {
    return Array.from(this.userTrackings.values());
  }

  getById(id) {
    return this.userTrackings.get(parseInt(id));
  }

  getByUserId(userId) {
    return this.getAll().filter(tracking => tracking.userId === userId);
  }

  getByAirdropId(airdropId) {
    return this.getAll().filter(tracking => tracking.airdropId === parseInt(airdropId));
  }

  getUserAirdropTracking(userId, airdropId) {
    return this.getAll().find(tracking => 
      tracking.userId === userId && tracking.airdropId === parseInt(airdropId)
    );
  }

  update(id, updates) {
    const tracking = this.userTrackings.get(parseInt(id));
    if (!tracking) return null;
    
    Object.assign(tracking, updates);
    tracking.lastUpdated = new Date();
    return tracking;
  }

  delete(id) {
    return this.userTrackings.delete(parseInt(id));
  }

  getByStatus(status) {
    return this.getAll().filter(tracking => tracking.status === status);
  }

  getUserStats(userId) {
    const userTrackings = this.getByUserId(userId);
    return {
      total: userTrackings.length,
      interested: userTrackings.filter(t => t.status === 'interested').length,
      participating: userTrackings.filter(t => t.status === 'participating').length,
      completed: userTrackings.filter(t => t.status === 'completed').length,
      failed: userTrackings.filter(t => t.status === 'failed').length,
      averageProgress: userTrackings.length > 0 
        ? userTrackings.reduce((sum, t) => sum + t.progress, 0) / userTrackings.length 
        : 0
    };
  }
}

module.exports = new UserTrackingStorage();