class Airdrop {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.project = data.project;
    this.description = data.description;
    this.requirements = data.requirements || [];
    this.status = data.status || 'upcoming'; // upcoming, active, ended
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.estimatedReward = data.estimatedReward;
    this.difficulty = data.difficulty || 'easy'; // easy, medium, hard
    this.chain = data.chain;
    this.tags = data.tags || [];
    this.createdAt = data.createdAt || new Date();
  }

  isActive() {
    const now = new Date();
    return this.status === 'active' && 
           (!this.startDate || now >= new Date(this.startDate)) &&
           (!this.endDate || now <= new Date(this.endDate));
  }

  getDaysRemaining() {
    if (!this.endDate) return null;
    const now = new Date();
    const end = new Date(this.endDate);
    const diff = end - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}

module.exports = Airdrop;