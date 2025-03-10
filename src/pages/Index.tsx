import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";
import LoveNote from "@/components/LoveNote";
import confetti from 'canvas-confetti';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { LoveNote as LoveNoteType } from '@/lib/supabase';

const Index = () => {
  const [showNote, setShowNote] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [responses, setResponses] = useState<LoveNoteType[]>([]);
  const { toast } = useToast();
  
  // Get the current URL's search params to check if this is the special person
  // const isSpecialPerson = new URLSearchParams(window.location.search).get('for') === 'her';
  const isSpecialPerson = window.location.href.includes('for=her');
  console.log({isSpecialPerson})

  useEffect(() => {
    // Subscribe to real-time updates
    const channel = supabase
      .channel('love_notes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'love_notes' },
        (payload) => {
          const newNote = payload.new as any;
          if (newNote.response_type === 'yes' || newNote.response_type === 'thinking') {
            setResponses(prev => [...prev, newNote as LoveNoteType]);
            if (!isSpecialPerson) {
              toast({
                title: "She responded! 💌",
                description: "Check her answer below!",
              });
            }
          }
        }
      )
      .subscribe();

    // Only fetch responses if not the special person
    const fetchResponses = async () => {
      if (!isSpecialPerson) {
        const { data } = await supabase
          .from('love_notes')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (data) {
          const validResponses = data.filter(note => 
            note.response_type === 'yes' || note.response_type === 'thinking'
          ) as LoveNoteType[];
          setResponses(validResponses);
        }
      }
    };

    fetchResponses();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast, isSpecialPerson]);

  const handleYes = async () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    try {
      const { error } = await supabase
        .from('love_notes')
        .insert([
          {
            content: 'Said Yes! 💖',
            response_type: 'yes' as const,
            is_special_person: true
          }
        ]);

      if (error) throw error;
      setShowNote(true);
    } catch (error) {
      console.error('Error recording response:', error);
    }
  };

  const handleThinking = async () => {
    setThinking(true);
    try {
      await supabase
        .from('love_notes')
        .insert([
          {
            content: 'Still thinking... 🤔',
            response_type: 'thinking' as const,
            is_special_person: true
          }
        ]);
    } catch (error) {
      console.error('Error recording response:', error);
    }
    setTimeout(() => setThinking(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-r from-[#ee9ca7] to-[#ffdde1]">
      <FloatingHearts />
      
      <div className="relative z-10 container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto bg-white/80 p-8 rounded-lg shadow-lg backdrop-blur-sm">
          <h1 className="script-font text-5xl md:text-6xl mb-6 text-pink-600 animate-fade-in">
            Will You Be My Valentine?
          </h1>
          
          <p className="sans-font text-lg md:text-xl mb-8 text-gray-700 animate-fade-in">
            My MJ,
            It's been exactly 82 days since we started talking, 80 since we first met and shared our first kiss, but who's counting, right? Honestly, getting to know you has been one of the best parts of my days. And with Valentine's Day around the corner, I was wondering… would you make it even more special by being my valentine?

            No pressure, just me, hoping to spend this year's valentine's with someone pretty amazing. 😊
          </p>

          {isSpecialPerson && (
            <div className="space-y-4 md:space-y-0 md:space-x-4 animate-fade-in">
              <Button
                onClick={handleYes}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 text-lg rounded-full transform transition hover:scale-105"
              >
                Yes! ❤️
              </Button>
              
              <Button
                onClick={handleThinking}
                variant="outline"
                className="px-8 py-4 text-lg rounded-full border-pink-300"
              >
                {thinking ? "Pretty please? 🥺" : "Let me think... 🤔"}
              </Button>
            </div>
          )}

          {!isSpecialPerson && responses.length > 0 && (
            <div className="space-y-4">
              {[responses[0]].map((response, index) => (
                <div key={response.id || index} className="mt-8 p-6 bg-pink-50 rounded-lg animate-fade-in">
                  <h3 className="script-font text-2xl text-pink-600 mb-2">Her Response:</h3>
                  <p className="text-lg text-gray-700">{response.content}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(response.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {showNote && <LoveNote />}
      </div>
    </div>
  );
};

export default Index;
