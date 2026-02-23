import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import type { Message, MessagesContextValue } from '../types';
import { FALLBACK_MESSAGES } from '../data/messages';

const MessagesContext = createContext<MessagesContextValue>({
  messages:    [],
  loading:     true,
  error:       null,
  selectedId:  null,
  selectMessage: () => {},
  deleteMessage: () => {},
  deletingId:  null,
});

export const useMessages = () => useContext(MessagesContext);

export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages,   setMessages]   = useState<Message[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const hasFetched = useRef(false);

  // ── Fetch on mount ────────────────────────────────────
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch('http://localhost:9000/api/messages');
        if (!res.ok) {
            setMessages(FALLBACK_MESSAGES);
            setError(null); // fallback used — no visible error
            throw new Error(`Server responded with ${res.status}`);

        }
        const data: Message[] = await res.json();
        setMessages(data.length> 0 ? data : FALLBACK_MESSAGES);
      } catch (err: unknown) {
        if ((err as Error).name === 'AbortError') return;
        // Network failure → use fallback silently
        setMessages(FALLBACK_MESSAGES);
        setError(null); // fallback used — no visible error
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  // ── Select + mark read ────────────────────────────────
  const selectMessage = useCallback((id: string) => {
    setSelectedId(id);

    // Optimistically mark as read in state
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, isRead: true } : m))
    );

    // Fire and forget — post to API
    fetch(`http://localhost:9000/api/messages/read/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).catch(() => {/* silently ignore */});
  }, []);

  //Delete 
  const deleteMessage = useCallback(async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`http://localhost:9000/api/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch {
      // ignore network errors — still remove from UI
    } finally {
      setMessages(prev => {
        const remaining = prev.filter(m => m.id !== id);
        // If deleted message was selected, auto-select next
        if (selectedId === id) {
          setSelectedId(remaining[0]?.id ?? null);
        }
        return remaining;
      });
      setDeletingId(null);
    }
  }, [selectedId]);

  return (
    <MessagesContext.Provider
      value={{ messages, loading, error, selectedId, selectMessage, deleteMessage, deletingId }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
