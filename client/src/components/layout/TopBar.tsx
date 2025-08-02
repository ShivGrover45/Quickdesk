import { Bell, Search, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "react-router-dom";
import quickdeskLogo from "@/assets/quickdesk-logo.png";

const pageNames: Record<string, string> = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/tickets": "My Tickets",
  "/tickets/new": "New Ticket",
  "/agent/queue": "Agent Queue",
  "/admin/users": "User Management",
  "/admin/categories": "Category Management", 
  "/admin/reports": "Analytics",
  "/settings": "Settings",
  "/profile": "Profile"
};

export function TopBar() {
  const location = useLocation();
  const currentPageName = pageNames[location.pathname] || "QuickDesk";
  
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
      {/* Left side - Logo and Page Title */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <img 
            src={quickdeskLogo} 
            alt="QuickDesk" 
            className="w-8 h-8"
          />
          <div className="hidden sm:block">
            <h1 className="text-xl font-semibold text-foreground">
              {currentPageName}
            </h1>
          </div>
        </div>
      </div>

      {/* Center - Search (on larger screens) */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets, users..."
            className="pl-10 bg-muted/50 border-0 focus:bg-background"
          />
        </div>
      </div>

      {/* Right side - Notifications and User */}
      <div className="flex items-center space-x-4">
        {/* Mobile search */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-4 w-4" />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="space-y-2 p-2">
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="font-medium">New ticket assigned</div>
                <div className="text-muted-foreground">Ticket #1234 has been assigned to you</div>
                <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
              </div>
              <div className="p-3 rounded-lg text-sm">
                <div className="font-medium">Ticket updated</div>
                <div className="text-muted-foreground">Ticket #1233 status changed to In Progress</div>
                <div className="text-xs text-muted-foreground mt-1">5 minutes ago</div>
              </div>
              <div className="p-3 rounded-lg text-sm">
                <div className="font-medium">New user registered</div>
                <div className="text-muted-foreground">John Doe has joined the platform</div>
                <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/api/placeholder/32/32" alt="User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@quickdesk.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}