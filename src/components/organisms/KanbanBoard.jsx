import { useState } from "react"
import DealCard from "@/components/molecules/DealCard"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"
import Badge from "@/components/atoms/Badge"

const KanbanBoard = ({ deals, onMoveCard, onEditDeal, onDeleteDeal }) => {
  const [draggedCard, setDraggedCard] = useState(null)
  const [draggedOver, setDraggedOver] = useState(null)

  const columns = [
    { 
      id: "Lead", 
      name: "Lead", 
      color: "gray",
      icon: "UserPlus"
    },
    { 
      id: "Qualified", 
      name: "Qualified", 
      color: "blue",
      icon: "CheckCircle"
    },
    { 
      id: "Proposal", 
      name: "Proposal", 
      color: "yellow",
      icon: "FileText"
    },
    { 
      id: "Negotiation", 
      name: "Negotiation", 
      color: "orange",
      icon: "MessageSquare"
    },
    { 
      id: "Closed Won", 
      name: "Closed Won", 
      color: "green",
      icon: "Trophy"
    }
  ]

  const getDealsForColumn = (status) => {
    return deals.filter(deal => deal.status === status)
  }

  const getTotalValue = (status) => {
    const columnDeals = getDealsForColumn(status)
    return columnDeals.reduce((sum, deal) => sum + deal.value, 0)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleDragStart = (e, deal) => {
    setDraggedCard(deal)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/html", e.target.outerHTML)
  }

  const handleDragEnd = () => {
    setDraggedCard(null)
    setDraggedOver(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDragEnter = (columnId) => {
    setDraggedOver(columnId)
  }

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDraggedOver(null)
    }
  }

  const handleDrop = (e, columnId) => {
    e.preventDefault()
    if (draggedCard && draggedCard.status !== columnId) {
      onMoveCard(draggedCard.Id, columnId)
    }
    setDraggedCard(null)
    setDraggedOver(null)
  }

  return (
    <div className="flex space-x-6 overflow-x-auto pb-4">
      {columns.map((column) => {
        const columnDeals = getDealsForColumn(column.id)
        const totalValue = getTotalValue(column.id)
        const isDraggedOver = draggedOver === column.id

        return (
          <div
            key={column.id}
            className="flex-shrink-0 w-80"
            onDragOver={handleDragOver}
            onDragEnter={() => handleDragEnter(column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <Card 
              className={`p-4 h-full transition-all duration-200 ${
                isDraggedOver ? 'ring-2 ring-primary-500 bg-primary-50' : ''
              }`}
              variant="none"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 bg-${column.color}-100 rounded-full flex items-center justify-center`}>
                    <ApperIcon name={column.icon} className={`h-3 w-3 text-${column.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">{column.name}</h3>
                  <Badge variant="secondary" size="sm">
                    {columnDeals.length}
                  </Badge>
                </div>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Total Value</div>
                <div className="text-lg font-bold text-gray-900">
                  {formatCurrency(totalValue)}
                </div>
              </div>

              <div className="space-y-3 min-h-[400px]">
                {columnDeals.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <ApperIcon name={column.icon} className="h-8 w-8 mb-2" />
                    <p className="text-sm text-center">
                      No deals in {column.name.toLowerCase()}
                    </p>
                  </div>
                ) : (
                  columnDeals.map((deal) => (
                    <div
                      key={deal.Id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, deal)}
                      onDragEnd={handleDragEnd}
                    >
                      <DealCard
                        deal={deal}
                        onEdit={onEditDeal}
                        onDelete={onDeleteDeal}
                        isDragging={draggedCard?.Id === deal.Id}
                      />
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

export default KanbanBoard