import Header from "@/components/organisms/Header"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const Settings = () => {
  const settingsSections = [
    {
      title: "General Settings",
      description: "Basic application preferences and configuration",
      icon: "Settings",
      items: [
        { name: "Application Theme", status: "Dark/Light mode toggle" },
        { name: "Language Settings", status: "Multi-language support" },
        { name: "Time Zone", status: "UTC offset configuration" },
        { name: "Date Format", status: "Regional date preferences" }
      ]
    },
    {
      title: "Notification Settings", 
      description: "Configure alerts and email notifications",
      icon: "Bell",
      items: [
        { name: "Email Notifications", status: "Deal updates and reminders" },
        { name: "Push Notifications", status: "Real-time activity alerts" },
        { name: "SMS Alerts", status: "Critical event notifications" },
        { name: "Digest Frequency", status: "Weekly/Daily summaries" }
      ]
    },
    {
      title: "Data Management",
      description: "Import, export, and backup options",
      icon: "Database",
      items: [
        { name: "Import Contacts", status: "CSV/Excel import tools" },
        { name: "Export Data", status: "Backup and data portability" },
        { name: "Data Cleanup", status: "Duplicate detection and removal" },
        { name: "API Access", status: "Third-party integrations" }
      ]
    },
    {
      title: "Security Settings",
      description: "Privacy and security configuration",
      icon: "Shield",
      items: [
        { name: "Two-Factor Auth", status: "Enhanced security options" },
        { name: "Session Management", status: "Active session monitoring" },
        { name: "Data Encryption", status: "End-to-end protection" },
        { name: "Audit Logs", status: "Activity tracking and compliance" }
      ]
    }
  ]

  return (
    <div className="flex flex-col h-full">
      <Header title="Settings" />
      
      <div className="flex-1 p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Application Settings</h2>
              <p className="text-gray-600">Configure your CRM preferences and integrations</p>
            </div>
            <Badge variant="secondary" size="lg">
              <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
              Coming Soon
            </Badge>
          </div>
        </div>

        <div className="space-y-8">
          {settingsSections.map((section, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <ApperIcon name={section.icon} className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{section.title}</h3>
                  <p className="text-gray-600 text-sm">{section.description}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.status}</p>
                    </div>
                    <Badge variant="secondary">Planned</Badge>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-end mt-6 pt-4 border-t border-gray-200">
                <Button variant="outline" disabled>
                  Configure
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 mt-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Zap" className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Configuration</h3>
            <p className="text-gray-600 text-sm mb-4">
              Additional settings and integrations will be available in future updates
            </p>
            <Badge variant="accent">Coming Soon</Badge>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Settings