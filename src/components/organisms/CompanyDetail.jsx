import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '@/components/organisms/Header'
import ContactCard from '@/components/molecules/ContactCard'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { companyService } from '@/services/api/companyService'
import { format } from 'date-fns'

const CompanyDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [company, setCompany] = useState(null)
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [contactsLoading, setContactsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      loadCompany()
      loadContacts()
    }
  }, [id])

  const loadCompany = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await companyService.getById(parseInt(id))
      if (data) {
        setCompany(data)
      } else {
        setError('Company not found')
      }
    } catch (err) {
      setError(err.message || 'Failed to load company')
    } finally {
      setLoading(false)
    }
  }

  const loadContacts = async () => {
    try {
      setContactsLoading(true)
      const data = await companyService.getCompanyContacts(parseInt(id))
      setContacts(data)
    } catch (err) {
      console.error('Failed to load contacts:', err)
    } finally {
      setContactsLoading(false)
    }
  }

  const getTags = () => {
    if (!company?.Tags) return []
    return company.Tags.split(',').filter(tag => tag.trim()).map(tag => tag.trim())
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy 'at' h:mm a")
    } catch {
      return "Unknown"
    }
  }

  const handleAddContact = () => {
    toast.info('Contact association feature coming soon!')
    // In a real app, this would open a contact selection modal
    // or navigate to create contact with company pre-selected
  }

  const handleContactView = (contact) => {
    toast.info(`Viewing ${contact.first_name_c} ${contact.last_name_c}`)
    // In a real app, this would open contact detail view
  }

  const handleContactEdit = (contact) => {
    toast.info(`Editing ${contact.first_name_c} ${contact.last_name_c}`)
    // In a real app, this would open contact edit modal
  }

  const handleContactDelete = (contact) => {
    toast.info(`Contact deletion would be handled here`)
    // In a real app, this would handle contact deletion
  }

  if (loading) {
    return (
      <div className="flex-1">
        <Header 
          title="Company Details"
          actions={
            <Button variant="secondary" onClick={() => navigate('/companies')}>
              <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
              Back to Companies
            </Button>
          }
        />
        <div className="p-6">
          <Loading type="cards" count={1} />
        </div>
      </div>
    )
  }

  if (error || !company) {
    return (
      <div className="flex-1">
        <Header 
          title="Company Details"
          actions={
            <Button variant="secondary" onClick={() => navigate('/companies')}>
              <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
              Back to Companies
            </Button>
          }
        />
        <div className="p-6">
          <Empty 
            title="Company Not Found"
            description="The company you're looking for doesn't exist or has been deleted."
            action="Back to Companies"
            onAction={() => navigate('/companies')}
            icon="Building2"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <Header 
        title={company.Name}
        actions={
          <div className="flex items-center space-x-3">
            <Button variant="secondary" onClick={() => navigate('/companies')}>
              <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
              Back to Companies
            </Button>
            <Button>
              <ApperIcon name="Edit2" className="h-4 w-4 mr-2" />
              Edit Company
            </Button>
          </div>
        }
      />

      <div className="p-6 space-y-6">
        {/* Company Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <ApperIcon name="Building2" className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{company.Name}</h1>
              
              {/* Tags */}
              {company.Tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {getTags().map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
                  Created: {formatDate(company.CreatedOn)}
                </div>
                <div className="flex items-center">
                  <ApperIcon name="Users" className="h-4 w-4 mr-2" />
                  {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contacts Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Associated Contacts</h2>
            <Button onClick={handleAddContact}>
              <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>

          <div className="p-6">
            {contactsLoading ? (
              <Loading type="cards" count={3} />
            ) : contacts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map((contact) => (
                  <ContactCard
                    key={contact.Id}
                    contact={contact}
                    onView={handleContactView}
                    onEdit={handleContactEdit}
                    onDelete={handleContactDelete}
                  />
                ))}
              </div>
            ) : (
              <Empty
                title="No Associated Contacts"
                description="This company doesn't have any associated contacts yet."
                action="Add Contact"
                onAction={handleAddContact}
                icon="Users"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDetail