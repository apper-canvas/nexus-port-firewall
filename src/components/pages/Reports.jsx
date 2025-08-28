import Header from "@/components/organisms/Header"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const Reports = () => {
  const reportTypes = [
    {
      name: "Sales Performance",
      description: "Track revenue, deals closed, and conversion rates",
      icon: "TrendingUp",
      color: "green"
    },
    {
      name: "Contact Analytics",
      description: "Analyze contact engagement and activity patterns",
      icon: "Users",
      color: "blue"
    },
    {
      name: "Pipeline Analysis",
      description: "Monitor deal progression and bottlenecks",
      icon: "BarChart3",
      color: "purple"
    },
    {
      name: "Team Performance",
      description: "Compare individual and team metrics",
      icon: "Target",
      color: "orange"
    }
  ]

  return (
    <div className="flex flex-col h-full">
      <Header title="Reports" />
      
      <div className="flex-1 p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Analytics & Reports</h2>
              <p className="text-gray-600">Comprehensive insights into your sales performance</p>
            </div>
            <Badge variant="secondary" size="lg">
              <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
              Coming Soon
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {reportTypes.map((report, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-${report.color}-100 rounded-lg flex items-center justify-center`}>
                  <ApperIcon name={report.icon} className={`h-6 w-6 text-${report.color}-600`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick Metrics</h3>
              <ApperIcon name="Zap" className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">This Month's Revenue</span>
                <Badge variant="secondary">$0</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Deals Closed</span>
                <Badge variant="secondary">0</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Conversion Rate</span>
                <Badge variant="secondary">0%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Average Deal Size</span>
                <Badge variant="secondary">$0</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Export Options</h3>
              <ApperIcon name="Download" className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="FileText" className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">PDF Report</span>
                </div>
                <Badge variant="secondary">Soon</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="FileSpreadsheet" className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Excel Export</span>
                </div>
                <Badge variant="secondary">Soon</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Mail" className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Email Reports</span>
                </div>
                <Badge variant="secondary">Soon</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Reports