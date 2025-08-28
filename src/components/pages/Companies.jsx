import Header from "@/components/organisms/Header"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const Companies = () => {
  return (
    <div className="flex flex-col h-full">
      <Header title="Companies" />
      
      <div className="flex-1 p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Company Management</h2>
              <p className="text-gray-600">Manage your business relationships and accounts</p>
            </div>
            <Badge variant="secondary" size="lg">
              <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
              Coming Soon
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Building2" className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Company Profiles</h3>
            <p className="text-gray-600 text-sm mb-4">Detailed company information and contact management</p>
            <Badge variant="info">Planned</Badge>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Network" className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Relationship Mapping</h3>
            <p className="text-gray-600 text-sm mb-4">Visual representation of business relationships</p>
            <Badge variant="success">Planned</Badge>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="TrendingUp" className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Analytics</h3>
            <p className="text-gray-600 text-sm mb-4">Track engagement and opportunity value</p>
            <Badge variant="secondary">Planned</Badge>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top Companies</h3>
              <ApperIcon name="Building2" className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Building2" className="h-6 w-6 text-gray-500" />
              </div>
              <p className="text-gray-500 text-sm">No companies tracked yet</p>
              <p className="text-gray-400 text-xs mt-1">Company insights will appear here</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Industry Distribution</h3>
              <ApperIcon name="PieChart" className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="PieChart" className="h-6 w-6 text-gray-500" />
              </div>
              <p className="text-gray-500 text-sm">Industry analysis coming soon</p>
              <p className="text-gray-400 text-xs mt-1">Track your market segments</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Companies