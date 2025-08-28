import dealsData from "@/services/mockData/deals.json"

const STORAGE_KEY = "nexus_crm_deals"

// Initialize localStorage with default data if empty
const initializeDeals = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dealsData))
    return dealsData
  }
  return JSON.parse(stored)
}

// Add delay to simulate network request
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const dealService = {
  async getAll() {
    await delay(300)
    return initializeDeals()
  },

  async getById(id) {
    await delay(200)
    const deals = initializeDeals()
    const deal = deals.find(d => d.Id === parseInt(id))
    if (!deal) {
      throw new Error("Deal not found")
    }
    return { ...deal }
  },

  async create(dealData) {
    await delay(400)
    const deals = initializeDeals()
    
    const newDeal = {
      ...dealData,
      Id: Math.max(...deals.map(d => d.Id), 0) + 1,
      status: "Lead",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    const updatedDeals = [newDeal, ...deals]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDeals))
    
    return { ...newDeal }
  },

  async update(id, dealData) {
    await delay(350)
    const deals = initializeDeals()
    const index = deals.findIndex(d => d.Id === parseInt(id))
    
    if (index === -1) {
      throw new Error("Deal not found")
    }
    
    const updatedDeal = {
      ...deals[index],
      ...dealData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    }
    
    const updatedDeals = [...deals]
    updatedDeals[index] = updatedDeal
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDeals))
    
    return { ...updatedDeal }
  },

  async delete(id) {
    await delay(250)
    const deals = initializeDeals()
    const filteredDeals = deals.filter(d => d.Id !== parseInt(id))
    
    if (filteredDeals.length === deals.length) {
      throw new Error("Deal not found")
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredDeals))
    return true
  }
}