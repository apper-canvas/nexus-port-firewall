import { toast } from "react-toastify";
import React from "react";
import { getApperClient } from './contactServiceHelper.js';

// Initialize ApperClient

const contactService = {
async getAll() {
    try {
      const apperClient = getApperClient();
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
      };
const response = await apperClient.fetchRecords('contact_c', params);

      if (!response.success) {
        console.error('Failed to fetch contacts:', response.message);
        toast.error(`Failed to load contacts: ${response.message}`);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error('Error in contactService.getAll:', error?.response?.data?.message || error);
      toast.error('Failed to load contacts. Please check your connection and try again.');
      return [];
    }
  },

  async getById(id) {
    try {
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
      };

const apperClient = getApperClient();

      const response = await apperClient.getRecordById('contact_c', id, params);

      if (!response.success) {
        console.error(`Failed to fetch contact ${id}:`, response.message);
        toast.error(`Failed to load contact: ${response.message}`);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error in contactService.getById(${id}):`, error?.response?.data?.message || error);
      toast.error('Failed to load contact details. Please check your connection and try again.');
      return null;
    }
  },

  async create(contactData) {
    try {
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
      };

const apperClient = getApperClient();

      const response = await apperClient.createRecord('contact_c', params);

      if (!response.success) {
        console.error('Failed to create contact:', response.message);
        toast.error(`Failed to create contact: ${response.message}`);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} contacts:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel || 'Field'}: ${error.message || error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success('Contact created successfully');
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error('Error in contactService.create:', error?.response?.data?.message || error);
      toast.error('Failed to create contact. Please check your connection and try again.');
      return null;
    }
  },

  async update(id, contactData) {
    try {
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
      };

const apperClient = getApperClient();

      const response = await apperClient.updateRecord('contact_c', params);

      if (!response.success) {
        console.error(`Failed to update contact ${id}:`, response.message);
        toast.error(`Failed to update contact: ${response.message}`);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} contacts:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel || 'Field'}: ${error.message || error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success('Contact updated successfully');
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error(`Error in contactService.update(${id}):`, error?.response?.data?.message || error);
      toast.error('Failed to update contact. Please check your connection and try again.');
      return null;
    }
  },

  async delete(recordIds) {
    try {
      const ids = Array.isArray(recordIds) ? recordIds : [recordIds];
      const params = { 
        RecordIds: ids.map(id => parseInt(id))
      };

const apperClient = getApperClient();

      const response = await apperClient.deleteRecord('contact_c', params);

      if (!response.success) {
        console.error(`Failed to delete contact(s) ${ids.join(', ')}:`, response.message);
        toast.error(`Failed to delete contact(s): ${response.message}`);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} contacts:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          const message = successful.length === 1 ? 'Contact deleted successfully' : `${successful.length} contacts deleted successfully`;
          toast.success(message);
          return successful.length === ids.length;
        }
      }

      return false;
    } catch (error) {
      const ids = Array.isArray(recordIds) ? recordIds : [recordIds];
      console.error(`Error in contactService.delete(${ids.join(', ')}):`, error?.response?.data?.message || error);
      toast.error('Failed to delete contact(s). Please check your connection and try again.');
      return false;
    }
}
};

export { contactService };
