import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import Header from "@/components/organisms/Header"
import ContactsList from "@/components/organisms/ContactsList"
import ContactModal from "@/components/molecules/ContactModal"
import Error from "@/components/ui/Error"
import { contactService } from "@/services/api/contactService"

const Contacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingContact, setEditingContact] = useState(null)

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await contactService.getAll()
      setContacts(data)
    } catch (err) {
      setError(err.message || "Failed to load contacts")
    } finally {
      setLoading(false)
    }
  }

  const handleAddContact = () => {
    setEditingContact(null)
    setShowModal(true)
  }

  const handleEditContact = (contact) => {
    setEditingContact(contact)
    setShowModal(true)
  }

  const handleSaveContact = async (contactData) => {
    try {
      if (editingContact) {
        const updatedContact = await contactService.update(editingContact.Id, contactData)
        setContacts(prev => prev.map(c => c.Id === editingContact.Id ? updatedContact : c))
        toast.success("Contact updated successfully!")
      } else {
        const newContact = await contactService.create(contactData)
        setContacts(prev => [newContact, ...prev])
        toast.success("Contact created successfully!")
      }
      setShowModal(false)
      setEditingContact(null)
    } catch (err) {
      toast.error(err.message || "Failed to save contact")
    }
  }

  const handleDeleteContact = async (contact) => {
    if (window.confirm(`Are you sure you want to delete ${contact.firstName} ${contact.lastName}?`)) {
      try {
        await contactService.delete(contact.Id)
        setContacts(prev => prev.filter(c => c.Id !== contact.Id))
        toast.success("Contact deleted successfully!")
      } catch (err) {
        toast.error(err.message || "Failed to delete contact")
      }
    }
  }

  const handleViewContact = (contact) => {
    toast.info(`Viewing ${contact.firstName} ${contact.lastName}`)
    // In a real app, this would open a detailed view
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <Header title="Contacts" />
        <div className="flex-1 p-6">
          <Error message={error} onRetry={loadContacts} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <Header title="Contacts" />
      
      <div className="flex-1 p-6">
        <ContactsList
          contacts={contacts}
          loading={loading}
          searchTerm={searchTerm}
          onSearch={handleSearch}
          onAdd={handleAddContact}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
          onView={handleViewContact}
        />
      </div>

      <ContactModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingContact(null)
        }}
        onSave={handleSaveContact}
        contact={editingContact}
        title={editingContact ? "Edit Contact" : "Add Contact"}
      />
    </div>
  )
}

export default Contacts