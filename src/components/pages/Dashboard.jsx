import { useState, useEffect } from "react"
import Header from "@/components/organisms/Header"
import MetricCard from "@/components/molecules/MetricCard"
import Card from "@/components/atoms/Card"
import Loading from "@/components/ui/Loading"
import ApperIcon from "@/components/ApperIcon"
import Badge from "@/components/atoms/Badge"
import { format } from "date-fns"
import { contactService } from "@/services/api/contactService"
import { companyService } from "@/services/api/companyService"
const Dashboard = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")
      const contactsData = await contactService.getAll()
      setContacts(contactsData)
    } catch (err) {
      setError(err.message || "Failed to load data")
    } finally {
      setLoading(false)
    }
  }

const getRecentActivity = () => {
    const recentContacts = [...contacts]
      .sort((a, b) => new Date(b.last_activity_c || b.ModifiedOn) - new Date(a.last_activity_c || a.ModifiedOn))
      .slice(0, 5)
    
    return recentContacts.map(contact => ({
      id: contact.Id,
      type: "Contact Updated",
      description: `${contact.first_name_c} ${contact.last_name_c} information was updated`,
      timestamp: contact.last_activity_c || contact.ModifiedOn,
      contact: contact
    }))
  }

const getActiveContacts = () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    return contacts.filter(contact => new Date(contact.last_activity_c || contact.ModifiedOn) >= thirtyDaysAgo).length
  }

const getTotalCompanies = async () => {
    const companies = await companyService.getAll();
    return companies.length;
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
        <Loading type="metrics" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <Header 
        title="Dashboard" 
        actions={
          <div className="text-sm text-gray-500">
            Last updated: {format(new Date(), "MMM dd, yyyy 'at' h:mm a")}
          </div>
        }
      />
      
      <div className="flex-1 p-6 space-y-8">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Contacts"
            value={contacts.length}
            change="+12% from last month"
            changeType="positive"
            icon="Users"
          />
          <MetricCard
            title="Active Deals"
            value="0"
            comingSoon={true}
            icon="TrendingUp"
          />
          <MetricCard
            title="Monthly Revenue"
            value="$0"
            comingSoon={true}
            icon="DollarSign"
          />
          <MetricCard
            title="Conversion Rate"
            value="0%"
            comingSoon={true}
            icon="Target"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <ApperIcon name="Activity" className="h-5 w-5 text-gray-400" />
            </div>
            
            {getRecentActivity().length === 0 ? (
              <div className="text-center py-8">
                <ApperIcon name="Clock" className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No recent activity</p>
              </div>
            ) : (
              <div className="space-y-4">
                {getRecentActivity().map((activity, index) => (
                  <div key={activity.id || index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <ApperIcon name="User" className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(activity.timestamp), "MMM dd, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                    <Badge variant="primary" size="sm">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
              <ApperIcon name="BarChart3" className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <ApperIcon name="CheckCircle" className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Active Contacts</p>
                    <p className="text-xs text-gray-500">Last 30 days</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-gray-900">{getActiveContacts()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <ApperIcon name="Building2" className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Companies</p>
                    <p className="text-xs text-gray-500">Total unique</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-gray-900">{getTotalCompanies()}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <ApperIcon name="TrendingUp" className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Pipeline Value</p>
                    <p className="text-xs text-gray-500">Coming soon</p>
                  </div>
                </div>
                <Badge variant="secondary" size="sm">Soon</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <ApperIcon name="Calendar" className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Upcoming Tasks</p>
                    <p className="text-xs text-gray-500">Coming soon</p>
                  </div>
                </div>
                <Badge variant="warning" size="sm">Soon</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard