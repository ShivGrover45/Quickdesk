// src/pages/tickets/TicketDetail.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TicketCard } from "@/components/tickets/TicketCard";
import { Ticket } from "@/components/tickets/TicketCard";
import { fetchTicketById, updateTicketStatus } from "@/services/ticketService";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, User, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { TicketStatus } from "@/components/tickets/StatusBadge";

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const loadTicket = async () => {
      try {
        setLoading(true);
        if (!id) return;
        
        const data = await fetchTicketById(id);
        if (data) {
          setTicket(data);
          setStatus(data.status);
        } else {
          navigate("/tickets", { replace: true });
        }
      } catch (error) {
        console.error("Failed to fetch ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [id, navigate]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      if (!ticket) return;
      
      const updatedTicket = await updateTicketStatus(ticket.id, newStatus as TicketStatus);
      setTicket(updatedTicket);
      setStatus(newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleAddComment = () => {
    // In a real app, this would call an API
    console.log("Adding comment:", comment);
    setComment("");
  };

  if (loading) {
    return <div className="p-4">Loading ticket details...</div>;
  }

  if (!ticket) {
    return <div className="p-4">Ticket not found</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Button variant="outline" onClick={() => navigate("/tickets")}>
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back to Tickets
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Ticket details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{ticket.subject}</h1>
            <div className="flex items-center gap-2">
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={ticket.requester.avatar} />
                <AvatarFallback>
                  {ticket.requester.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{ticket.requester.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(ticket.createdAt, "MMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {ticket.category}
                  </Badge>
                </div>
                <p className="mt-3 whitespace-pre-line">{ticket.description}</p>
              </div>
            </div>
          </div>

          {/* Comments section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Comments ({ticket.commentsCount})
            </h2>

            {/* Comment form */}
            <div className="space-y-3">
              <Textarea
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button onClick={handleAddComment} disabled={!comment.trim()}>
                  Add Comment
                </Button>
              </div>
            </div>

            {/* Comment list */}
            <div className="space-y-4">
              {/* Example comment - in a real app these would come from the API */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Support Agent</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3">
                      We're looking into this issue and will update you soon.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Ticket metadata */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <h3 className="font-medium mb-3">Ticket Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="capitalize">{ticket.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Priority</p>
                <p className="capitalize">{ticket.priority}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p>{format(ticket.createdAt, "MMM d, yyyy")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p>{format(ticket.updatedAt, "MMM d, yyyy 'at' h:mm a")}</p>
              </div>
            </div>
          </div>

          {ticket.assignee && (
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
              <h3 className="font-medium mb-3">Assigned To</h3>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={ticket.assignee.avatar} />
                  <AvatarFallback>
                    {ticket.assignee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p>{ticket.assignee.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}