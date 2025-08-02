import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Users, 
  Ticket,
  CheckCircle,
  AlertCircle,
  Star
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";

// Mock data for charts
const ticketVolumeData = [
  { month: "Jan", tickets: 120, resolved: 110 },
  { month: "Feb", tickets: 150, resolved: 140 },
  { month: "Mar", tickets: 180, resolved: 165 },
  { month: "Apr", tickets: 160, resolved: 155 },
  { month: "May", tickets: 200, resolved: 190 },
  { month: "Jun", tickets: 220, resolved: 205 },
  { month: "Jul", tickets: 250, resolved: 235 }
];

const categoryData = [
  { name: "Technical Issues", value: 35, count: 87 },
  { name: "Account & Billing", value: 25, count: 62 },
  { name: "Feature Requests", value: 20, count: 50 },
  { name: "Bug Reports", value: 15, count: 37 },
  { name: "General Inquiry", value: 5, count: 12 }
];

const responseTimeData = [
  { day: "Mon", avgTime: 2.4, target: 4 },
  { day: "Tue", avgTime: 1.8, target: 4 },
  { day: "Wed", avgTime: 3.2, target: 4 },
  { day: "Thu", avgTime: 2.1, target: 4 },
  { day: "Fri", avgTime: 2.8, target: 4 },
  { day: "Sat", avgTime: 1.5, target: 4 },
  { day: "Sun", avgTime: 1.2, target: 4 }
];

const agentPerformanceData = [
  { name: "Sarah Wilson", tickets: 45, satisfaction: 4.8, avgTime: 2.1 },
  { name: "Mike Johnson", tickets: 38, satisfaction: 4.6, avgTime: 2.5 },
  { name: "Alex Chen", tickets: 42, satisfaction: 4.9, avgTime: 1.8 },
  { name: "Emma Davis", tickets: 35, satisfaction: 4.7, avgTime: 2.3 }
];

const COLORS = ['#1ABC9C', '#3498DB', '#9B59B6', '#E67E22', '#95A5A6'];

const stats = [
  {
    title: "Total Tickets",
    value: "1,247",
    change: "+12.5%",
    changeType: "positive",
    icon: Ticket,
    description: "vs last month"
  },
  {
    title: "Resolution Rate",
    value: "94.2%",
    change: "+2.1%",
    changeType: "positive", 
    icon: CheckCircle,
    description: "vs last month"
  },
  {
    title: "Avg Response Time",
    value: "2.3h",
    change: "-15.6%",
    changeType: "positive",
    icon: Clock,
    description: "vs last month"
  },
  {
    title: "Customer Satisfaction",
    value: "4.7/5",
    change: "+0.2",
    changeType: "positive",
    icon: Star,
    description: "vs last month"
  },
  {
    title: "Active Users",
    value: "1,429",
    change: "+8.3%",
    changeType: "positive",
    icon: Users,
    description: "vs last month"
  },
  {
    title: "Open Tickets",
    value: "73",
    change: "-5.2%",
    changeType: "positive",
    icon: AlertCircle,
    description: "vs last month"
  }
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-display">Analytics & Reports</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive insights into your support operations and performance metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center mt-1">
                <span className={`text-xs font-medium ${
                  stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  {stat.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ticket Volume Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Ticket Volume Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={ticketVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="tickets" 
                      stackId="1"
                      stroke="#1ABC9C" 
                      fill="#1ABC9C" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="resolved" 
                      stackId="2"
                      stroke="#3498DB" 
                      fill="#3498DB" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Tickets by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Tickets by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ticket Volume */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Ticket Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ticketVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tickets" fill="#1ABC9C" />
                    <Bar dataKey="resolved" fill="#3498DB" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryData.map((category, index) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index] }}
                        />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{category.count} tickets</Badge>
                        <span className="text-sm text-muted-foreground">{category.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Response Time Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="avgTime" 
                    stroke="#1ABC9C" 
                    strokeWidth={2}
                    name="Avg Response Time (hours)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#E74C3C" 
                    strokeDasharray="5 5"
                    name="Target (hours)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentPerformanceData.map((agent) => (
                  <div key={agent.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {agent.tickets} tickets resolved
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Satisfaction</p>
                        <p className="font-medium flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          {agent.satisfaction}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Avg Time</p>
                        <p className="font-medium">{agent.avgTime}h</p>
                      </div>
                      
                      <Badge 
                        className={
                          agent.satisfaction >= 4.8 
                            ? "bg-green-100 text-green-800" 
                            : agent.satisfaction >= 4.5 
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {agent.satisfaction >= 4.8 ? "Excellent" : 
                         agent.satisfaction >= 4.5 ? "Good" : "Needs Improvement"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}