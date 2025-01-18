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
            My MJ,
            It's been exactly 79 days since we started talking, 77 since we first met and shared our first kiss, but who's counting, right? Honestly, getting to know you has been one of the best parts of my days. And with Valentine's Day around the corner, I was wondering… would you make it even more special by being my valentine?

            No pressure, just me, hoping to spend this year's valentine's with someone pretty amazing. 😊
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