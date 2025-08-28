import { useState } from "react"
import ContactCard from "@/components/molecules/ContactCard"
import SearchBar from "@/components/molecules/SearchBar"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import Empty from "@/components/ui/Empty"
import Loading from "@/components/ui/Loading"

const ContactsList = ({ 
  contacts, 
  loading, 
  onEdit, 
  onDelete, 
  onView, 
  onAdd,
  searchTerm,
  onSearch 
}) => {
  const [sortBy, setSortBy] = useState("name")
  const [filterBy, setFilterBy] = useState("all")

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = !searchTerm || 
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.tags && contact.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))

    const matchesFilter = filterBy === "all" || 
      (filterBy === "active" && new Date(contact.lastActivity) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
      (filterBy === "inactive" && new Date(contact.lastActivity) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))

    return matchesSearch && matchesFilter
  })

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
      case "company":
        return (a.company || "").localeCompare(b.company || "")
      case "recent":
        return new Date(b.lastActivity) - new Date(a.lastActivity)
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt)
      default:
        return 0
    }
  })

  if (loading) {
    return <Loading type="cards" count={6} />
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
          <SearchBar
            onSearch={onSearch}
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={onSearch}
            className="w-full sm:w-96"
          />
          
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="name">Sort by Name</option>
              <option value="company">Sort by Company</option>
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
            </select>
            
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Contacts</option>
              <option value="active">Active (30 days)</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <Button onClick={onAdd} variant="primary">
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {sortedContacts.length} of {contacts.length} contacts
      </div>

      {/* Contacts Grid */}
      {sortedContacts.length === 0 ? (
        <Empty
          title={searchTerm ? "No contacts found" : "No contacts yet"}
          description={searchTerm ? "Try adjusting your search or filters" : "Get started by adding your first contact"}
          action={!searchTerm ? "Add First Contact" : undefined}
          onAction={!searchTerm ? onAdd : undefined}
          icon="Users"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedContacts.map((contact) => (
            <ContactCard
              key={contact.Id}
              contact={contact}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ContactsList