import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"

const DealModal = ({ isOpen, onClose, onSave, deal = null, contacts = [], title = "Add Deal" }) => {
const [formData, setFormData] = useState({
    title_c: "",
    company_c: "",
    contact_id_c: "",
    value_c: "",
    expected_close_date_c: "",
    description_c: ""
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
if (deal) {
      setFormData({
        title_c: deal.title_c || "",
        company_c: deal.company_c || "",
        contact_id_c: deal.contact_id_c || "",
        value_c: deal.value_c || "",
        expected_close_date_c: deal.expected_close_date_c || "",
        description_c: deal.description_c || ""
      })
    } else {
      setFormData({
        title: "",
        company: "",
        contactId: "",
        value: "",
        expectedCloseDate: "",
        description: ""
      })
    }
    setErrors({})
  }, [deal, isOpen])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "Deal title is required"
    }
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required"
    }
    if (!formData.contactId) {
      newErrors.contactId = "Contact selection is required"
    }
    if (!formData.value || formData.value <= 0) {
      newErrors.value = "Deal value must be greater than 0"
    }
    if (!formData.expectedCloseDate) {
      newErrors.expectedCloseDate = "Expected close date is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
const selectedContact = contacts.find(c => c.Id === parseInt(formData.contact_id_c))
      const dealData = {
        ...formData,
        contact_id_c: parseInt(formData.contact_id_c),
        contact_name_c: selectedContact ? `${selectedContact.first_name_c} ${selectedContact.last_name_c}` : "",
        value_c: parseFloat(formData.value_c),
        probability_c: deal ? deal.probability_c : 25
      }
      onSave(dealData)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const handleContactChange = (contactId) => {
const selectedContact = contacts.find(c => c.Id === parseInt(contactId))
    if (selectedContact) {
      setFormData(prev => ({
        ...prev,
        contact_id_c: contactId,
        company_c: prev.company_c || selectedContact.company_c || ""
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        contactId: contactId
      }))
    }
    if (errors.contactId) {
      setErrors(prev => ({
        ...prev,
        contactId: ""
      }))
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Deal Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  error={errors.title}
                  placeholder="Enter deal title"
                />
                <Input
                  label="Company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  error={errors.company}
                  placeholder="Enter company name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact
                  </label>
                  <select
                    value={formData.contactId}
                    onChange={(e) => handleContactChange(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                      errors.contactId ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a contact</option>
                    {contacts.map((contact) => (
<option key={contact.Id} value={contact.Id}>
                        {contact.first_name_c} {contact.last_name_c} - {contact.company_c}
                      </option>
                    ))}
                  </select>
                  {errors.contactId && (
                    <p className="text-red-500 text-xs mt-1">{errors.contactId}</p>
                  )}
                </div>
                <Input
                  label="Deal Value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => handleInputChange("value", e.target.value)}
                  error={errors.value}
                  placeholder="Enter deal value"
                  min="0"
                  step="1000"
                />
              </div>

              <Input
                label="Expected Close Date"
                type="date"
                value={formData.expectedCloseDate}
                onChange={(e) => handleInputChange("expectedCloseDate", e.target.value)}
                error={errors.expectedCloseDate}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Add deal description..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                >
                  {deal ? "Update Deal" : "Create Deal"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default DealModal