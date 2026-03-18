import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const subscriptionAPI = {
  // Get user's current tier and usage
  async getSubscription() {
    const response = await axios.get(`${API_BASE}/subscription`);
    return response.data;
  },

  // Get usage details
  async getUsage() {
    const response = await axios.get(`${API_BASE}/usage`);
    return response.data;
  },

  // Check if user can perform action
  async checkLimit(action: 'storage' | 'ai_action' | 'meeting', amount: number = 1) {
    const response = await axios.post(`${API_BASE}/check-limit`, {
      action,
      amount
    });
    return response.data;
  },

  // Log usage
  async logUsage(action: string, amount: number, metadata?: any) {
    const response = await axios.post(`${API_BASE}/log-usage`, {
      action,
      amount,
      metadata
    });
    return response.data;
  },

  // Get all plans
  async getPlans() {
    const response = await axios.get(`${API_BASE}/plans`);
    return response.data;
  },

  // Upgrade tier
  async upgradeTier(planId: string) {
    const response = await axios.post(`${API_BASE}/upgrade`, { planId });
    return response.data;
  },

  // Get Stripe checkout URL
  async getCheckoutURL(planId: string) {
    const response = await axios.post(`${API_BASE}/payments/create-checkout`, { planId });
    return response.data;
  },

  // Get usage history
  async getUsageHistory(limit: number = 50) {
    const response = await axios.get(`${API_BASE}/usage-history`, {
      params: { limit }
    });
    return response.data;
  }
};

export default subscriptionAPI;
