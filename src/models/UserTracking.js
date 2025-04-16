class UserTracking {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.airdropId = data.airdropId;
    this.status = data.status || 'interested'; // interested, participating, completed, failed
    this.progress = data.progress || 0; // percentage 0-100
    this.notes = data.notes || '';
    this.completedRequirements = data.completedRequirements || [];
    this.walletAddress = data.walletAddress;
    this.dateJoined = data.dateJoined || new Date();
    this.lastUpdated = data.lastUpdated || new Date();
    this.estimatedCompletion = data.estimatedCompletion;
  }

  updateProgress(newProgress, completedRequirements = []) {
    this.progress = Math.min(100, Math.max(0, newProgress));
    this.completedRequirements = [...new Set([...this.completedRequirements, ...completedRequirements])];
    this.lastUpdated = new Date();
    
    if (this.progress === 100) {
      this.status = 'completed';
    } else if (this.progress > 0) {
      this.status = 'participating';
    }
  }

  addNote(note) {
    this.notes += (this.notes ? '\n' : '') + `${new Date().toISOString()}: ${note}`;
    this.lastUpdated = new Date();
  }

  setStatus(status) {
    const validStatuses = ['interested', 'participating', 'completed', 'failed'];
    if (validStatuses.includes(status)) {
      this.status = status;
      this.lastUpdated = new Date();
    }
  }
}

module.exports = UserTracking;