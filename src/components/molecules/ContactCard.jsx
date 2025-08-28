import { format } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"

const ContactCard = ({ contact, onEdit, onDelete, onView }) => {
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase()
  }

  const getStatusVariant = (lastActivity) => {
    const daysSinceActivity = Math.floor((Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24))
    if (daysSinceActivity <= 7) return "success"
    if (daysSinceActivity <= 30) return "warning" 
    return "danger"
  }

  const getStatusText = (lastActivity) => {
    const daysSinceActivity = Math.floor((Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24))
    if (daysSinceActivity === 0) return "Active today"
    if (daysSinceActivity <= 7) return "Active this week"
    if (daysSinceActivity <= 30) return "Active this month"
    return "Inactive"
  }

  return (
    <Card className="p-6 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {getInitials(contact.firstName, contact.lastName)}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {contact.firstName} {contact.lastName}
            </h3>
            {contact.jobTitle && contact.company && (
              <p className="text-gray-600 text-sm">
                {contact.jobTitle} at {contact.company}
              </p>
            )}
            <div className="flex items-center space-x-4 mt-2">
              {contact.email && (
                <div className="flex items-center text-gray-500 text-sm">
                  <ApperIcon name="Mail" className="h-4 w-4 mr-1" />
                  {contact.email}
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center text-gray-500 text-sm">
                  <ApperIcon name="Phone" className="h-4 w-4 mr-1" />
                  {contact.phone}
                </div>
              )}
            </div>
          </div>
        </div>
        <Badge 
          variant={getStatusVariant(contact.lastActivity)}
          size="sm"
        >
          {getStatusText(contact.lastActivity)}
        </Badge>
      </div>

      {contact.tags && contact.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {contact.tags.map((tag, index) => (
            <Badge key={index} variant="primary" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Added {format(new Date(contact.createdAt), "MMM dd, yyyy")}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView && onView(contact)}
          >
            <ApperIcon name="Eye" className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button
            variant="ghost" 
            size="sm"
            onClick={() => onEdit && onEdit(contact)}
          >
            <ApperIcon name="Edit" className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete && onDelete(contact)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ApperIcon name="Trash2" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ContactCard