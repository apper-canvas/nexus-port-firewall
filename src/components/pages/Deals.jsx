import Header from "@/components/organisms/Header"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const Deals = () => {
  const pipelineStages = [
    { name: "Prospecting", count: 0, color: "gray" },
    { name: "Qualification", count: 0, color: "blue" },
    { name: "Proposal", count: 0, color: "yellow" },
    { name: "Negotiation", count: 0, color: "orange" },
    { name: "Closed Won", count: 0, color: "green" }
  ]

  return (
    <div className="flex flex-col h-full">
      <Header title="Deals" />
      
      <div className="flex-1 p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Sales Pipeline</h2>
              <p className="text-gray-600">Track your deals through the sales process</p>
            </div>
            <Badge variant="secondary" size="lg">
              <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
              Coming Soon
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {pipelineStages.map((stage, index) => (
              <Card key={stage.name} className="p-4 text-center">
                <div className="mb-3">
                  <div className={`w-8 h-8 bg-${stage.color}-100 rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <div className={`w-3 h-3 bg-${stage.color}-500 rounded-full`}></div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">{stage.name}</h3>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stage.count}</div>
                <div className="text-xs text-gray-500">$0 value</div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Deals</h3>
              <ApperIcon name="TrendingUp" className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Briefcase" className="h-6 w-6 text-gray-500" />
              </div>
              <p className="text-gray-500 text-sm">No deals yet</p>
              <p className="text-gray-400 text-xs mt-1">Start adding deals to track your pipeline</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
              <ApperIcon name="BarChart3" className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Win Rate</span>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Average Deal Size</span>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Sales Cycle Length</span>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Monthly Target</span>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Deals