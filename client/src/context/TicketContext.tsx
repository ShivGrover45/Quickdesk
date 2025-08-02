// src/context/TicketContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchTickets, fetchTicketById, createTicket, updateTicketStatus, voteOnTicket, Ticket } from './../lib/api/tickets';

type TicketContextType = {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  getTicketById: (id: string) => Promise<Ticket | undefined>;
  createNewTicket: (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Ticket>;
  updateStatus: (id: string, status: Ticket['status']) => Promise<void>;
  handleVote: (id: string, vote: "up" | "down") => Promise<void>;
  refetchTickets: () => Promise<void>;
};

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const data = await fetchTickets();
      setTickets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const getTicketById = async (id: string) => {
    try {
      return await fetchTicketById(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch ticket');
      return undefined;
    }
  };

  const createNewTicket = async (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newTicket = await createTicket(ticketData);
      await loadTickets(); // Refresh the list
      return newTicket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create ticket');
      throw err;
    }
  };

  const updateStatus = async (id: string, status: Ticket['status']) => {
    try {
      await updateTicketStatus(id, status);
      await loadTickets(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update ticket status');
    }
  };

  const handleVote = async (id: string, vote: "up" | "down") => {
    try {
      await voteOnTicket(id, vote);
      await loadTickets(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process vote');
    }
  };

  return (
    <TicketContext.Provider value={{
      tickets,
      loading,
      error,
      getTicketById,
      createNewTicket,
      updateStatus,
      handleVote,
      refetchTickets: loadTickets
    }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};