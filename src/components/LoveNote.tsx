import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabase';

const LoveNote = () => {
  const [note, setNote] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!note.trim()) return;
    
    setIsSending(true);
    try {
      const { error } = await supabase
        .from('love_notes')
        .insert([
          {
            content: note.trim(),
            response_type: 'yes'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Love Note Sent! ❤️",
        description: "Your message has been delivered with love",
      });
      setNote('');
    } catch (error) {
      console.error('Error sending note:', error);
      toast({
        title: "Oops!",
        description: "Couldn't send your love note. Please try again!",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-md mx-auto mt-8 p-6 bg-white/80 rounded-lg shadow-lg">
      <h3 className="script-font text-2xl mb-4 text-pink-600">Write me a love note...</h3>
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Express your love here..."
        className="min-h-[100px] mb-4"
      />
      <Button
        onClick={handleSubmit}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white"
        disabled={isSending}
      >
        {isSending ? 'Sending...' : 'Send With Love'}
      </Button>
    </div>
  );
};

export default LoveNote;