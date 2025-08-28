import { toast } from 'react-toastify'
// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  })
}

export const dealService = {
  async getAll() {
    try {
      const apperClient = getApperClient()
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "contact_name_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "expected_close_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "probability_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "updated_at_c"}},
          {"field": {"Name": "status_updated_at_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      }
      
      const response = await apperClient.fetchRecords('deal_c', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      console.error("Error fetching deals:", error?.response?.data?.message || error)
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
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "contact_name_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "expected_close_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "probability_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "updated_at_c"}},
          {"field": {"Name": "status_updated_at_c"}}
        ]
      }
      
      const response = await apperClient.getRecordById('deal_c', id, params)
      
      if (!response?.data) {
        return null
      }
      return response.data
    } catch (error) {
      console.error(`Error fetching deal ${id}:`, error?.response?.data?.message || error)
      return null
    }
  },

  async create(dealData) {
    try {
      const apperClient = getApperClient()
      
      // Only include Updateable fields
      const params = {
        records: [{
          Name: dealData.Name || dealData.title_c || '',
          Tags: dealData.Tags || '',
          title_c: dealData.title_c || '',
          company_c: dealData.company_c || '',
          contact_id_c: parseInt(dealData.contact_id_c) || 0,
          contact_name_c: dealData.contact_name_c || '',
          value_c: parseFloat(dealData.value_c) || 0,
          expected_close_date_c: dealData.expected_close_date_c || '',
          status_c: dealData.status_c || 'Lead',
          probability_c: parseInt(dealData.probability_c) || 25,
          description_c: dealData.description_c || '',
          created_at_c: new Date().toISOString(),
          updated_at_c: new Date().toISOString(),
          status_updated_at_c: new Date().toISOString()
        }]
      }
      
      const response = await apperClient.createRecord('deal_c', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} deals:`, JSON.stringify(failed))
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`))
            if (record.message) toast.error(record.message)
          })
        }
        return successful.length > 0 ? successful[0].data : null
      }
      return null
    } catch (error) {
      console.error("Error creating deal:", error?.response?.data?.message || error)
      return null
    }
  },

  async update(id, dealData) {
    try {
      const apperClient = getApperClient()
      
      // Only include Updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          Name: dealData.Name || dealData.title_c || '',
          Tags: dealData.Tags || '',
          title_c: dealData.title_c || '',
          company_c: dealData.company_c || '',
          contact_id_c: dealData.contact_id_c ? parseInt(dealData.contact_id_c) : undefined,
          contact_name_c: dealData.contact_name_c || '',
          value_c: dealData.value_c ? parseFloat(dealData.value_c) : undefined,
          expected_close_date_c: dealData.expected_close_date_c || '',
          status_c: dealData.status_c || '',
          probability_c: dealData.probability_c ? parseInt(dealData.probability_c) : undefined,
          description_c: dealData.description_c || '',
          updated_at_c: new Date().toISOString(),
          status_updated_at_c: dealData.status_c ? new Date().toISOString() : undefined
        }]
      }
      
      // Remove undefined fields
      Object.keys(params.records[0]).forEach(key => {
        if (params.records[0][key] === undefined) {
          delete params.records[0][key]
        }
      })
      
      const response = await apperClient.updateRecord('deal_c', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} deals:`, JSON.stringify(failed))
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`))
            if (record.message) toast.error(record.message)
          })
        }
        return successful.length > 0 ? successful[0].data : null
      }
      return null
    } catch (error) {
      console.error("Error updating deal:", error?.response?.data?.message || error)
      return null
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient()
      const params = { 
        RecordIds: [parseInt(id)]
      }
      
      const response = await apperClient.deleteRecord('deal_c', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success)
        const failed = response.results.filter(r => !r.success)
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} deals:`, JSON.stringify(failed))
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        return successful.length > 0
      }
      return true
    } catch (error) {
      console.error("Error deleting deal:", error?.response?.data?.message || error)
      return false
    }
  }
}