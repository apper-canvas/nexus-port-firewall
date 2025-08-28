import { format } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"

const DealCard = ({ deal, onEdit, onDelete, isDragging = false }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getProbabilityVariant = (probability) => {
    if (probability >= 75) return "success"
    if (probability >= 50) return "warning"
    if (probability >= 25) return "secondary"
    return "outline"
  }

  const getDaysToClose = (closeDate) => {
    const today = new Date()
    const close = new Date(closeDate)
    const diffTime = close - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    return `${diffDays} days`
  }

  const getDaysVariant = (closeDate) => {
    const today = new Date()
    const close = new Date(closeDate)
    const diffTime = close - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return "danger"
    if (diffDays <= 7) return "warning"
    return "secondary"
  }

  return (
    <Card 
      className={`p-4 cursor-grab active:cursor-grabbing transition-all duration-200 ${
        isDragging ? 'opacity-50 transform rotate-2' : 'hover:shadow-md'
      }`}
      variant="compact"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
            {deal.title}
          </h4>
          <p className="text-xs text-gray-600 mb-2">{deal.company}</p>
          <div className="flex items-center text-xs text-gray-500">
            <ApperIcon name="User" className="h-3 w-3 mr-1" />
            {deal.contactName}
          </div>
        </div>
        <ApperIcon name="GripVertical" className="h-4 w-4 text-gray-400 flex-shrink-0" />
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(deal.value)}
          </span>
          <Badge variant={getProbabilityVariant(deal.probability)} size="sm">
            {deal.probability}%
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Expected close:</span>
          <Badge variant={getDaysVariant(deal.expectedCloseDate)} size="sm">
            {getDaysToClose(deal.expectedCloseDate)}
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
        <span className="text-xs text-gray-500">
          {format(new Date(deal.expectedCloseDate), "MMM dd")}
        </span>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onEdit && onEdit(deal)
            }}
            className="p-1 h-6 w-6"
          >
            <ApperIcon name="Edit" className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onDelete && onDelete(deal)
            }}
            className="p-1 h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ApperIcon name="Trash2" className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default DealCard