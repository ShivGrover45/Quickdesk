import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge, TicketStatus } from "./StatusBadge";
import { ChevronUp, ChevronDown, MessageCircle, Clock, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
  requester: {
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  commentsCount: number;
  upvotes: number;
  downvotes: number;
  userVote?: "up" | "down";
}

interface TicketCardProps {
  ticket: Ticket;
  onVote?: (ticketId: string, vote: "up" | "down") => void;
  onClick?: () => void;
  showAssignee?: boolean;
}

const priorityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800", 
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800"
};

export function TicketCard({ ticket, onVote, onClick, showAssignee = false }: TicketCardProps) {
  const handleVote = (vote: "up" | "down") => {
    onVote?.(ticket.id, vote);
  };

  return (
    <Card className="card-hover cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {ticket.subject}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {ticket.description}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <StatusBadge status={ticket.status} />
            <Badge className={priorityColors[ticket.priority]}>
              {ticket.priority}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          {/* Left side - User info and metadata */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={ticket.requester.avatar} />
                <AvatarFallback className="text-xs">
                  {ticket.requester.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>{ticket.requester.name}</span>
            </div>
            
            {showAssignee && ticket.assignee && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{ticket.assignee.name}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDistanceToNow(ticket.updatedAt, { addSuffix: true })}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{ticket.commentsCount}</span>
            </div>
            
            <Badge variant="outline" className="text-xs">
              {ticket.category}
            </Badge>
          </div>

          {/* Right side - Voting */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleVote("up");
              }}
              className={ticket.userVote === "up" ? "text-green-600 bg-green-50" : ""}
            >
              <ChevronUp className="h-4 w-4" />
              <span className="text-xs">{ticket.upvotes}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleVote("down");
              }}
              className={ticket.userVote === "down" ? "text-red-600 bg-red-50" : ""}
            >
              <ChevronDown className="h-4 w-4" />
              <span className="text-xs">{ticket.downvotes}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}