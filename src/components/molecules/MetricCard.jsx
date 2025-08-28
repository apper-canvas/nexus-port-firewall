import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"
import { cn } from "@/utils/cn"

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon, 
  loading = false,
  comingSoon = false,
  className 
}) => {
  if (loading) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </Card>
    )
  }

  const changeColors = {
    positive: "text-green-600",
    negative: "text-red-600", 
    neutral: "text-gray-600"
  }

  const changeIcons = {
    positive: "TrendingUp",
    negative: "TrendingDown",
    neutral: "Minus"
  }

  return (
    <Card className={cn("p-6 relative overflow-hidden", className)}>
      {comingSoon && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mb-2">
              <ApperIcon name="Clock" className="w-3 h-3 mr-1" />
              Coming Soon
            </div>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && (
          <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
            <ApperIcon name={icon} className="h-5 w-5 text-white" />
          </div>
        )}
      </div>
      
      <div className="flex items-baseline space-x-3">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {change && (
          <div className={cn("flex items-center text-sm", changeColors[changeType])}>
            <ApperIcon name={changeIcons[changeType]} className="h-4 w-4 mr-1" />
            {change}
          </div>
        )}
      </div>
    </Card>
  )
}

export default MetricCard