import { toast } from "react-toastify";
import React from "react";

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  })
}
export const contactService = {
async getAll() {
    try {
      const apperClient = getApperClient()
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "job_title_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "last_activity_c"}},
          {"field": {"Name": "notes_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      }
      
      const response = await apperClient.fetchRecords('contact_c', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      console.error("Error fetching contacts:", error?.response?.data?.message || error)
      return []
    }
  },

async getById(id) {
    try {
      const apperClient = getApperClient()
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "job_title_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "last_activity_c"}},
          {"field": {"Name": "notes_c"}}
        ]
      }
      
      const response = await apperClient.getRecordById('contact_c', id, params)
      
      if (!response?.data) {
        return null
      }
      return response.data
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error?.response?.data?.message || error)
      return null
    }
  },

  async create(contactData) {
    try {
      const apperClient = getApperClient()
      
      // Only include Updateable fields
      const params = {
        records: [{
          Name: contactData.Name || `${contactData.first_name_c || ''} ${contactData.last_name_c || ''}`.trim(),
          Tags: contactData.Tags || '',
          first_name_c: contactData.first_name_c || '',
          last_name_c: contactData.last_name_c || '',
          email_c: contactData.email_c || '',
          phone_c: contactData.phone_c || '',
          company_c: contactData.company_c || '',
          job_title_c: contactData.job_title_c || '',
          created_at_c: new Date().toISOString(),
          last_activity_c: new Date().toISOString(),
          notes_c: contactData.notes_c || ''
        }]
      }
      
      const response = await apperClient.createRecord('contact_c', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} contacts:`, JSON.stringify(failed))
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`))
            if (record.message) toast.error(record.message)
          })
        }
        return successful.length > 0 ? successful[0].data : null
      }
      return null
    } catch (error) {
      console.error("Error creating contact:", error?.response?.data?.message || error)
      return null
    }
  },

  async update(id, contactData) {
    try {
      const apperClient = getApperClient()
      
      // Only include Updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          Name: contactData.Name || `${contactData.first_name_c || ''} ${contactData.last_name_c || ''}`.trim(),
          Tags: contactData.Tags || '',
          first_name_c: contactData.first_name_c || '',
          last_name_c: contactData.last_name_c || '',
          email_c: contactData.email_c || '',
          phone_c: contactData.phone_c || '',
          company_c: contactData.company_c || '',
          job_title_c: contactData.job_title_c || '',
          last_activity_c: new Date().toISOString(),
          notes_c: contactData.notes_c || ''
        }]
      }
      
      const response = await apperClient.updateRecord('contact_c', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} contacts:`, JSON.stringify(failed))
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`))
            if (record.message) toast.error(record.message)
          })
        }
        return successful.length > 0 ? successful[0].data : null
      }
      return null
    } catch (error) {
      console.error("Error updating contact:", error?.response?.data?.message || error)
      return null
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient()
      const params = { 
        RecordIds: [parseInt(id)]
      }
      
      const response = await apperClient.deleteRecord('contact_c', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} contacts:`, JSON.stringify(failed))
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        return successful.length > 0
      }
      return true
    } catch (error) {
      console.error("Error deleting contact:", error?.response?.data?.message || error)
      return false
    }
  }
}