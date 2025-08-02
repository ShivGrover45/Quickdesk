import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type TicketStatus = "open" | "in-progress" | "resolved" | "closed";

interface StatusBadgeProps {
  status: TicketStatus;
  className?: string;
}

const statusConfig = {
  open: {
    label: "Open",
    className: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
  },
  "in-progress": {
    label: "In Progress", 
    className: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
  },
  resolved: {
    label: "Resolved",
    className: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
  },
  closed: {
    label: "Closed",
    className: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant="outline" 
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}