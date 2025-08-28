import { NavLink } from "react-router-dom";
import React, { useContext } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import { AuthContext } from "@/App";

const Sidebar = ({ isOpen, onClose }) => {
  const navigation = [
    { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
    { name: "Contacts", href: "/contacts", icon: "Users" },
    { name: "Deals", href: "/deals", icon: "TrendingUp" },
    { name: "Companies", href: "/companies", icon: "Building2" },
    { name: "Reports", href: "/reports", icon: "BarChart3" },
    { name: "Settings", href: "/settings", icon: "Settings" }
  ]

  // Desktop sidebar - static positioning
  const DesktopSidebar = () => (
    <div className="hidden lg:block w-64 bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-30">
      <div className="flex flex-col h-full">
        <div className="flex items-center px-6 py-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" className="h-5 w-5 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold gradient-text">Nexus CRM</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                      : "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <ApperIcon
                      name={item.icon}
                      className={cn(
                        "mr-3 h-5 w-5 transition-colors",
                        isActive ? "text-white" : "text-gray-400 group-hover:text-primary-500"
                      )}
                    />
                    {item.name}
                    {isActive && (
                      <div className="ml-auto w-1 h-6 bg-white rounded-full opacity-80" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
        
<div className="p-4 border-t border-gray-200">
          <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-primary-50 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">U</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">User</p>
              <p className="text-xs text-gray-500">CRM User</p>
            </div>
          </div>
<button 
            onClick={() => {
              const { logout } = useContext(AuthContext);
              logout();
            }}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="LogOut" className="mr-3 h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  )

  // Mobile sidebar - overlay with transforms
  const MobileSidebar = () => (
    <div className={cn(
      "lg:hidden fixed inset-0 z-50 transition-opacity duration-300",
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={cn(
        "absolute left-0 top-0 h-full w-64 bg-white shadow-xl transition-transform duration-300 ease-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold gradient-text">Nexus CRM</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ApperIcon name="X" className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                        : "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <ApperIcon
                        name={item.icon}
                        className={cn(
                          "mr-3 h-5 w-5 transition-colors",
                          isActive ? "text-white" : "text-gray-400 group-hover:text-primary-500"
                        )}
                      />
                      {item.name}
                      {isActive && (
                        <div className="ml-auto w-1 h-6 bg-white rounded-full opacity-80" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>
          
<div className="p-4 border-t border-gray-200">
            <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-primary-50 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">U</span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">User</p>
                <p className="text-xs text-gray-500">CRM User</p>
              </div>
            </div>
<button 
              onClick={() => {
                const { logout } = useContext(AuthContext);
                logout();
              }}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ApperIcon name="LogOut" className="mr-3 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}

export default Sidebar