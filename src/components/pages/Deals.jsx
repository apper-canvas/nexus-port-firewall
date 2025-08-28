import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import Header from "@/components/organisms/Header"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import KanbanBoard from "@/components/organisms/KanbanBoard"
import DealModal from "@/components/molecules/DealModal"
import Loading from "@/components/ui/Loading"
import { dealService } from "@/services/api/dealService"
import { contactService } from "@/services/api/contactService"
const Deals = () => {
  const [deals, setDeals] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingDeal, setEditingDeal] = useState(null)

  useEffect(() => {
    loadDeals()
    loadContacts()
  }, [])

  const loadDeals = async () => {
    try {
      setLoading(true)
      const dealsData = await dealService.getAll()
      setDeals(dealsData)
    } catch (error) {
      console.error("Failed to load deals:", error)
      toast.error("Failed to load deals")
    } finally {
      setLoading(false)
    }
  }

  const loadContacts = async () => {
    try {
      const contactsData = await contactService.getAll()
      setContacts(contactsData)
    } catch (error) {
      console.error("Failed to load contacts:", error)
    }
  }

  const handleAddDeal = () => {
    setEditingDeal(null)
    setShowModal(true)
  }

  const handleEditDeal = (deal) => {
    setEditingDeal(deal)
    setShowModal(true)
  }

const handleDeleteDeal = async (deal) => {
    if (confirm(`Are you sure you want to delete "${deal.title_c}"?`)) {
      try {
        const success = await dealService.delete(deal.Id)
        if (success) {
          setDeals(prev => prev.filter(d => d.Id !== deal.Id))
          toast.success("Deal deleted successfully")
        }
      } catch (error) {
        console.error("Failed to delete deal:", error)
        toast.error("Failed to delete deal")
      }
    }
  }

const handleSaveDeal = async (dealData) => {
    try {
      if (editingDeal) {
        const updatedDeal = await dealService.update(editingDeal.Id, dealData)
        if (updatedDeal) {
          setDeals(prev => prev.map(d => d.Id === editingDeal.Id ? updatedDeal : d))
          toast.success("Deal updated successfully")
        }
      } else {
        const newDeal = await dealService.create(dealData)
        if (newDeal) {
          setDeals(prev => [newDeal, ...prev])
          toast.success("Deal created successfully")
        }
      }
      setShowModal(false)
      setEditingDeal(null)
    } catch (error) {
      console.error("Failed to save deal:", error)
      toast.error("Failed to save deal")
    }
  }

const handleMoveCard = async (dealId, newStatus) => {
    try {
      const updatedDeal = await dealService.update(dealId, { status_c: newStatus })
      if (updatedDeal) {
        setDeals(prev => prev.map(d => d.Id === dealId ? updatedDeal : d))
        toast.success(`Deal moved to ${newStatus}`)
      }
    } catch (error) {
      console.error("Failed to move deal:", error)
      toast.error("Failed to move deal")
    }
  }

const getTotalValue = () => {
    return deals.reduce((sum, deal) => sum + (deal.value_c || 0), 0)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <Header title="Deals" />
        <div className="flex-1 p-6">
          <Loading type="spinner" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <Header 
        title="Deals"
        actions={
          <Button onClick={handleAddDeal} variant="primary">
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Add Deal
          </Button>
        }
      />
      
      <div className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Sales Pipeline</h2>
              <p className="text-gray-600">Track your deals through the sales process</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Total Pipeline Value</div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(getTotalValue())}
              </div>
            </div>
          </div>
        </div>

        <KanbanBoard
          deals={deals}
          onMoveCard={handleMoveCard}
          onEditDeal={handleEditDeal}
          onDeleteDeal={handleDeleteDeal}
        />
      </div>

      <DealModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingDeal(null)
        }}
        onSave={handleSaveDeal}
        deal={editingDeal}
        contacts={contacts}
        title={editingDeal ? "Edit Deal" : "Add Deal"}
      />
    </div>
  )
}

export default Deals