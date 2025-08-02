import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TicketCard, Ticket } from "@/components/tickets/TicketCard";
import { StatusBadge } from "@/components/tickets/StatusBadge";
import { 
  Search, 
  Filter, 
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data
const mockTickets: Ticket[] = [
  {
    id: "1",
    subject: "Login issues with SSO integration",
    description: "Users are unable to login using single sign-on. Getting timeout errors when redirecting from identity provider.",
    status: "open",
    priority: "high",
    category: "Authentication",
    requester: { name: "John Doe", avatar: "/api/placeholder/32/32" },
    assignee: { name: "Sarah Wilson" },
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    commentsCount: 3,
  },
  {
    id: "2", 
    subject: "Email notifications not working",
    description: "Not receiving email notifications for ticket updates and new assignments.",
    status: "in-progress",
    priority: "medium",
    category: "Email",
    requester: { name: "Jane Smith", avatar: "/api/placeholder/32/32" },
    assignee: { name: "Mike Johnson" },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
    commentsCount: 7,
  },
  {
    id: "3",
    subject: "Dashboard loading slowly",
    description: "The main dashboard takes over 30 seconds to load all widgets and data.",
    status: "resolved",
    priority: "low",
    category: "Performance", 
    requester: { name: "Bob Wilson", avatar: "/api/placeholder/32/32" },
    assignee: { name: "Sarah Wilson" },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    commentsCount: 4,
  }
];

const stats = [
  {
    title: "Total Tickets",
    value: "1,234",
    change: "+12%",
    icon: TrendingUp,
    color: "text-blue-600"
  },
  {
    title: "Open Tickets", 
    value: "89",
    change: "+5%",
    icon: AlertCircle,
    color: "text-orange-600"
  },
  {
    title: "Avg Response Time",
    value: "2.4h",
    change: "-8%", 
    icon: Clock,
    color: "text-green-600"
  },
  {
    title: "Resolved Today",
    value: "23",
    change: "+15%",
    icon: CheckCircle,
    color: "text-green-600"
  }
];

export default function Dashboard() {
  const navigate = useNavigate(); // Add this hook
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleVote = (ticketId: string, vote: "up" | "down") => {
    console.log(`Voting ${vote} on ticket ${ticketId}`);
    // Implementation would update the ticket vote
  };

  // Add this function to handle new ticket creation
  const handleNewTicket = () => {
    navigate("/tickets/new"); // Navigate to the new ticket page
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your support tickets.
          </p>
        </div>
        {/* Update this button to use the handleNewTicket function */}
        <Button onClick={handleNewTicket}>
          <Plus className="h-4 w-4 mr-2" />
          New Ticket
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                {" "}from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Authentication">Authentication</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Performance">Performance</SelectItem>
                <SelectItem value="Bug">Bug</SelectItem>
                <SelectItem value="Feature Request">Feature Request</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tickets List */}
          <Tabs defaultValue="my-tickets" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
              <TabsTrigger value="all-tickets">All Tickets</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-tickets" className="space-y-4 mt-6">
              {filteredTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onClick={() => console.log(`Viewing ticket ${ticket.id}`)}
                  showAssignee={true}
                />
              ))}
              
              {filteredTickets.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">No tickets found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or create a new ticket.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="all-tickets" className="space-y-4 mt-6">
              {filteredTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onClick={() => console.log(`Viewing ticket ${ticket.id}`)}
                  showAssignee={true}
                />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}