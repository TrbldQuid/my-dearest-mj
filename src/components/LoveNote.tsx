import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const LoveNote = () => {
  const [note, setNote] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (note.trim()) {
      toast({
        title: "Love Note Sent! ❤️",
        description: "Your message has been delivered with love",
      });
      setNote('');
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
      >
        Send With Love
      </Button>
    </div>
  );
};

export default LoveNote;