import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Plus, 
  BarChart3, 
  Settings, 
  Users,
  Tag,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  collapsed: boolean;
  onToggle: (collapsed: boolean) => void;
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["user", "agent", "admin"]
  },
  {
    title: "New Ticket",
    href: "/tickets/new",
    icon: Plus,
    roles: ["user"]
  },
  {
    title: "My Tickets",
    href: "/tickets",
    icon: LayoutDashboard,
    roles: ["user"]
  },
  {
    title: "Agent Queue",
    href: "/agent/queue",
    icon: LayoutDashboard,
    roles: ["agent", "admin"]
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    roles: ["admin"]
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Tag,
    roles: ["admin"]
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
    roles: ["admin"]
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["user", "agent", "admin"]
  }
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Mock user role - in real app this would come from auth context
  const userRole = "admin"; // This would be dynamic
  
  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <aside 
      className={cn(
        "flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">Q</span>
            </div>
            <span className="font-semibold text-lg">QuickDesk</span>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggle(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredItems.map((item) => {
          const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-primary text-primary-foreground shadow-sm",
                collapsed && "justify-center"
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
              
              {/* Show badge for new tickets (example) */}
              {!collapsed && item.href === "/tickets" && (
                <Badge variant="secondary" className="ml-auto">
                  3
                </Badge>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className={cn(
          "text-xs text-muted-foreground",
          collapsed ? "text-center" : "text-left"
        )}>
          {collapsed ? "v1.0" : "QuickDesk v1.0"}
        </div>
      </div>
    </aside>
  );
}