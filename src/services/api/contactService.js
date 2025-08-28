import contactsData from "@/services/mockData/contacts.json"

const STORAGE_KEY = "nexus_crm_contacts"

// Initialize localStorage with default data if empty
const initializeContacts = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contactsData))
    return contactsData
  }
  return JSON.parse(stored)
}

// Add delay to simulate network request
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const contactService = {
  async getAll() {
    await delay(300)
    return initializeContacts()
  },

  async getById(id) {
    await delay(200)
    const contacts = initializeContacts()
    const contact = contacts.find(c => c.Id === parseInt(id))
    if (!contact) {
      throw new Error("Contact not found")
    }
    return { ...contact }
  },

  async create(contactData) {
    await delay(400)
    const contacts = initializeContacts()
    
    const newContact = {
      ...contactData,
      Id: Math.max(...contacts.map(c => c.Id), 0) + 1,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    }
    
    const updatedContacts = [newContact, ...contacts]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedContacts))
    
    return { ...newContact }
  },

  async update(id, contactData) {
    await delay(350)
    const contacts = initializeContacts()
    const index = contacts.findIndex(c => c.Id === parseInt(id))
    
    if (index === -1) {
      throw new Error("Contact not found")
    }
    
    const updatedContact = {
      ...contacts[index],
      ...contactData,
      Id: parseInt(id),
      lastActivity: new Date().toISOString()
    }
    
    const updatedContacts = [...contacts]
    updatedContacts[index] = updatedContact
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedContacts))
    
    return { ...updatedContact }
  },

  async delete(id) {
    await delay(250)
    const contacts = initializeContacts()
    const filteredContacts = contacts.filter(c => c.Id !== parseInt(id))
    
    if (filteredContacts.length === contacts.length) {
      throw new Error("Contact not found")
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredContacts))
    return true
  }
}