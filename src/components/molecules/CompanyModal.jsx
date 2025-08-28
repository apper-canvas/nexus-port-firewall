import { useState, useEffect } from 'react'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const CompanyModal = ({ isOpen, onClose, onSave, company, title = "Add Company" }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Tags: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (company) {
      setFormData({
        Name: company.Name || '',
        Tags: company.Tags || ''
      })
    } else {
      setFormData({
        Name: '',
        Tags: ''
      })
    }
    setErrors({})
  }, [company, isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const newErrors = {}
    if (!formData.Name.trim()) {
      newErrors.Name = 'Company name is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setErrors({})

    try {
      await onSave(formData)
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to save company' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={loading}
          >
            <ApperIcon name="X" className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Input
              label="Company Name *"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Enter company name"
              error={errors.Name}
              disabled={loading}
            />
          </div>

          <div>
            <Input
              label="Tags"
              name="Tags"
              value={formData.Tags}
              onChange={handleChange}
              placeholder="Enter tags (comma separated)"
              error={errors.Tags}
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple tags with commas
            </p>
          </div>

          {errors.submit && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {errors.submit}
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading && <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />}
              {company ? 'Update Company' : 'Create Company'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CompanyModal