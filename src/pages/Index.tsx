import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";
import LoveNote from "@/components/LoveNote";
import confetti from 'canvas-confetti';

const Index = () => {
  const [showNote, setShowNote] = useState(false);
  const [thinking, setThinking] = useState(false);

  const handleYes = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setShowNote(true);
  };

  const handleThinking = () => {
    setThinking(true);
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
            Every moment with you feels like a page from a fairytale. Your smile brightens my days,
            and your love fills my heart with joy. Would you make this Valentine's Day extra special
            by being mine?
          </p>

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
        </div>

        {showNote && <LoveNote />}
      </div>
    </div>
  );
};

export default Index;