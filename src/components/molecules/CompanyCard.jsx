import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

const CompanyCard = ({ company, onEdit, onDelete, onView, contactCount = 0 }) => {
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch {
      return "Unknown"
    }
  }

  const getTags = () => {
    if (!company.Tags) return []
    return company.Tags.split(',').filter(tag => tag.trim()).map(tag => tag.trim())
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
            <ApperIcon name="Building2" className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {company.Name || 'Unnamed Company'}
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <ApperIcon name="Users" className="h-4 w-4 mr-1" />
              {contactCount} {contactCount === 1 ? 'contact' : 'contacts'}
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      {company.Tags && (
        <div className="flex flex-wrap gap-1 mb-4">
          {getTags().map((tag, index) => (
            <Badge key={index} variant="secondary" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <ApperIcon name="Calendar" className="h-3 w-3 mr-1" />
          Added {formatDate(company.CreatedOn)}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView && onView(company)}
          >
            <ApperIcon name="Eye" className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit && onEdit(company)}
          >
            <ApperIcon name="Edit2" className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete && onDelete(company)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ApperIcon name="Trash2" className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default CompanyCard