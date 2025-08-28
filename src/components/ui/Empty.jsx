import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"

const Empty = ({ 
  title = "No data found",
  description = "Get started by adding your first item",
  action,
  onAction,
  icon = "Database",
  type = "card"
}) => {
  if (type === "inline") {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name={icon} className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          {action && onAction && (
            <Button onClick={onAction} variant="primary">
              {action}
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <Card className="p-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <ApperIcon name={icon} className="h-8 w-8 text-gray-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
      {action && onAction && (
        <Button onClick={onAction} variant="primary" size="lg">
          {action}
        </Button>
      )}
    </Card>
  )
}

export default Empty