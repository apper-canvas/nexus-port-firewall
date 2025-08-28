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

  // Stage Duration Analytics
  const getStageAnalytics = (stageId) => {
    const stageDeals = deals.filter(deal => deal.status === stageId)
    if (stageDeals.length === 0) return { avgDays: 0, performance: 'normal', dealCount: 0 }

    const stageTimes = stageDeals.map(deal => {
      const statusDate = new Date(deal.statusUpdatedAt || deal.updatedAt)
      const createdDate = new Date(deal.createdAt)
      const diffTime = statusDate - createdDate
      return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
    })

    const avgDays = Math.round(stageTimes.reduce((sum, days) => sum + days, 0) / stageTimes.length)
    
    // Performance thresholds (can be customized)
    let performance = 'normal'
    if (stageId === 'Lead' && avgDays <= 3) performance = 'fast'
    else if (stageId === 'Lead' && avgDays >= 14) performance = 'slow'
    else if (stageId === 'Qualified' && avgDays <= 7) performance = 'fast'  
    else if (stageId === 'Qualified' && avgDays >= 21) performance = 'slow'
    else if (stageId === 'Proposal' && avgDays <= 14) performance = 'fast'
    else if (stageId === 'Proposal' && avgDays >= 30) performance = 'slow'
    else if (stageId === 'Negotiation' && avgDays <= 10) performance = 'fast'
    else if (stageId === 'Negotiation' && avgDays >= 28) performance = 'slow'
    else if (stageId === 'Closed Won' && avgDays <= 30) performance = 'fast'
    else if (stageId === 'Closed Won' && avgDays >= 60) performance = 'slow'

    return { avgDays, performance, dealCount: stageDeals.length }
  }

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'fast': return 'text-green-600 bg-green-100'
      case 'slow': return 'text-red-600 bg-red-100'  
      default: return 'text-blue-600 bg-blue-100'
    }
  }

  const getPerformanceIcon = (performance) => {
    switch (performance) {
      case 'fast': return 'TrendingUp'
      case 'slow': return 'AlertTriangle'
      default: return 'Clock'
    }
  }

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
        const analytics = getStageAnalytics(column.id)

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

              {/* Stage Duration Analytics */}
              {analytics.dealCount > 0 && (
                <div className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-gray-700">Stage Analytics</div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(analytics.performance)}`}>
                      <ApperIcon name={getPerformanceIcon(analytics.performance)} className="h-3 w-3 mr-1" />
                      {analytics.performance === 'fast' ? 'Fast' : analytics.performance === 'slow' ? 'Bottleneck' : 'Normal'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-600">Avg. Duration</div>
                    <div className="text-sm font-bold text-gray-900">
                      {analytics.avgDays} {analytics.avgDays === 1 ? 'day' : 'days'}
                    </div>
                  </div>
                </div>
              )}

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
                    {column.id === 'Lead' && (
                      <p className="text-xs text-center mt-1">
                        New deals will appear here
                      </p>
                    )}
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