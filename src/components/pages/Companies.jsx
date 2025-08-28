import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CompanyCard from "@/components/molecules/CompanyCard";
import CompanyModal from "@/components/molecules/CompanyModal";
import { companyService } from "@/services/api/companyService";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Header from "@/components/organisms/Header";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";

function Companies() {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingCompany, setEditingCompany] = useState(null)

  useEffect(() => {
    loadCompanies()
  }, [])

  const loadCompanies = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await companyService.getAll()
      setCompanies(data)
    } catch (err) {
      setError(err.message || "Failed to load companies")
    } finally {
      setLoading(false)
    }
  }

  const handleAddCompany = () => {
    setEditingCompany(null)
    setShowModal(true)
  }

  const handleEditCompany = (company) => {
    setEditingCompany(company)
    setShowModal(true)
  }

  const handleSaveCompany = async (companyData) => {
    try {
      if (editingCompany) {
        const updatedCompany = await companyService.update(editingCompany.Id, companyData)
        if (updatedCompany) {
          setCompanies(prev => prev.map(c => c.Id === editingCompany.Id ? updatedCompany : c))
          toast.success("Company updated successfully!")
        }
      } else {
        const newCompany = await companyService.create(companyData)
        if (newCompany) {
          setCompanies(prev => [newCompany, ...prev])
          toast.success("Company created successfully!")
        }
      }
      setShowModal(false)
      setEditingCompany(null)
    } catch (err) {
      toast.error(err.message || "Failed to save company")
    }
  }

  const handleDeleteCompany = async (company) => {
    if (window.confirm(`Are you sure you want to delete ${company.Name}?`)) {
      try {
        const success = await companyService.delete(company.Id)
        if (success) {
          setCompanies(prev => prev.filter(c => c.Id !== company.Id))
          toast.success("Company deleted successfully!")
        }
      } catch (err) {
        toast.error(err.message || "Failed to delete company")
      }
    }
  }

  const handleViewCompany = (company) => {
    navigate(`/companies/${company.Id}`)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const filteredCompanies = companies.filter(company => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      (company.Name?.toLowerCase() || '').includes(searchLower) ||
      (company.Tags?.toLowerCase() || '').includes(searchLower)
    )
  })

  if (error) {
    return (
      <div className="flex-1">
        <Header title="Companies" />
        <div className="flex-1 p-6">
          <Empty
            title="Error Loading Companies"
            description={error}
            action="Retry"
            onAction={loadCompanies}
            icon="AlertCircle"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <Header title="Companies" />
      
      <div className="flex-1 p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Company Management</h2>
              <p className="text-gray-600">Manage your business relationships and accounts</p>
            </div>
            <Button onClick={handleAddCompany}>
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Add Company
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search companies..."
              className="max-w-md"
            />
            <div className="text-sm text-gray-500">
              {filteredCompanies.length} {filteredCompanies.length === 1 ? 'company' : 'companies'}
            </div>
          </div>
        </div>

        {loading ? (
          <Loading type="cards" count={6} />
        ) : filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company.Id}
                company={company}
                onView={handleViewCompany}
                onEdit={handleEditCompany}
                onDelete={handleDeleteCompany}
                contactCount={0} // Will be calculated from contacts
              />
            ))}
          </div>
        ) : (
          <Empty
            title={searchTerm ? "No companies found" : "No companies yet"}
            description={
              searchTerm 
                ? `No companies match "${searchTerm}"`
                : "Start by adding your first company to track business relationships"
            }
            action="Add Company"
            onAction={handleAddCompany}
            icon="Building2"
          />
        )}
      </div>

      <CompanyModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingCompany(null)
        }}
        onSave={handleSaveCompany}
        company={editingCompany}
        title={editingCompany ? "Edit Company" : "Add Company"}
      />
    </div>
)
}

export default Companies