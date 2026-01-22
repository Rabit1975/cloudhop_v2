import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useChatActions = (onChatUpdated?: () => void) => {
  const [loading, setLoading] = useState(false);

  const updateChat = async (id: string, updates: unknown) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('chats')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      if (onChatUpdated) onChatUpdated();
    } catch (err) {
        console.error('Error updating chat:', err);
        throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteChat = async (id: string) => {
    setLoading(true);
    try {
      // Cascade delete is handled by database usually, but for safety/clarity:
      // 1. Delete messages (optional if cascade set)
      // 2. Delete participants (optional if cascade set)
      // 3. Delete chat
      const { error } = await supabase
        .from('chats')
        .delete()
        .eq('id', id);

      if (error) throw error;
      if (onChatUpdated) onChatUpdated();
    } catch (err) {
        console.error('Error deleting chat:', err);
        throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateChat, deleteChat, loading };
};
