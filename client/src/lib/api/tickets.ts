// src/api/tickets.ts
export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
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

// Mock database
let mockTickets: Ticket[] = [
  {
    id: "1",
    subject: "Cannot login to my account",
    description: "I'm getting an error when trying to login with my credentials.",
    status: "open",
    priority: "high",
    category: "Account & Billing",
    requester: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    commentsCount: 3,
    upvotes: 5,
    downvotes: 1
  },
  // Add more mock tickets as needed
];

export const fetchTickets = async (): Promise<Ticket[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTickets;
};

export const fetchTicketById = async (id: string): Promise<Ticket | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTickets.find(ticket => ticket.id === id);
};

export const createTicket = async (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ticket> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newTicket: Ticket = {
    ...ticketData,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date(),
    updatedAt: new Date(),
    commentsCount: 0,
    upvotes: 0,
    downvotes: 0
  };
  mockTickets.unshift(newTicket);
  return newTicket;
};

export const updateTicketStatus = async (id: string, status: Ticket['status']): Promise<Ticket> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const ticketIndex = mockTickets.findIndex(ticket => ticket.id === id);
  if (ticketIndex === -1) throw new Error('Ticket not found');
  
  mockTickets[ticketIndex] = {
    ...mockTickets[ticketIndex],
    status,
    updatedAt: new Date()
  };
  
  return mockTickets[ticketIndex];
};

export const voteOnTicket = async (id: string, vote: "up" | "down"): Promise<Ticket> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const ticketIndex = mockTickets.findIndex(ticket => ticket.id === id);
  if (ticketIndex === -1) throw new Error('Ticket not found');
  
  const ticket = mockTickets[ticketIndex];
  
  // Simple voting logic - in a real app you'd track user votes
  if (vote === "up") {
    ticket.upvotes += 1;
  } else {
    ticket.downvotes += 1;
  }
  
  ticket.updatedAt = new Date();
  return ticket;
};