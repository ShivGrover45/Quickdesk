// src/services/ticketService.ts
import { Ticket, TicketStatus } from "@/components/tickets/TicketCard";

// Mock data
const mockTickets: Ticket[] = [
  {
    id: "1",
    subject: "Cannot login to my account",
    description: "I'm getting an error when trying to login with my credentials.",
    status: "open",
    priority: "high",
    category: "Account & Billing",
    requester: {
      name: "John Doe",
      avatar: "",
    },
    createdAt: new Date("2023-05-15T10:00:00"),
    updatedAt: new Date("2023-05-15T10:00:00"),
    commentsCount: 2,
  },
  {
    id: "2",
    subject: "Feature request: Dark mode",
    description: "Please add dark mode support to the application.",
    status: "in-progress",
    priority: "medium",
    category: "Feature Request",
    requester: {
      name: "Jane Smith",
      avatar: "",
    },
    assignee: {
      name: "Support Agent",
      avatar: "",
    },
    createdAt: new Date("2023-05-10T14:30:00"),
    updatedAt: new Date("2023-05-14T09:15:00"),
    commentsCount: 5,
  },
  // Add more mock tickets as needed
];

const mockCategories = [
  "Technical Issue",
  "Account & Billing",
  "Feature Request",
  "Bug Report",
  "General Inquiry",
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTickets = async (): Promise<Ticket[]> => {
  await delay(500); // Simulate network delay
  return mockTickets;
};

export const fetchTicketById = async (id: string): Promise<Ticket | undefined> => {
  await delay(500);
  return mockTickets.find(ticket => ticket.id === id);
};

export const createTicket = async (ticketData: {
  subject: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
}): Promise<Ticket> => {
  await delay(500);
  const newTicket: Ticket = {
    id: Math.random().toString(36).substring(2, 9),
    ...ticketData,
    status: "open",
    requester: {
      name: "Current User", // Replace with actual user name
      avatar: "",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    commentsCount: 0,
  };
  mockTickets.unshift(newTicket);
  return newTicket;
};

export const updateTicketStatus = async (
  ticketId: string,
  status: TicketStatus
): Promise<Ticket> => {
  await delay(500);
  const ticketIndex = mockTickets.findIndex(t => t.id === ticketId);
  if (ticketIndex === -1) throw new Error("Ticket not found");
  
  const updatedTicket = {
    ...mockTickets[ticketIndex],
    status,
    updatedAt: new Date(),
  };
  mockTickets[ticketIndex] = updatedTicket;
  return updatedTicket;
};

export const fetchCategories = async (): Promise<string[]> => {
  await delay(300);
  return mockCategories;
};