import React, { useState } from 'react';
import { ADJECTIVES } from '../constants';
import { Wand2, Check, RefreshCw } from 'lucide-react';

interface ScreenAdjectiveProps {
  onAdjectiveSelected: (adj: string) => void;
}

export const ScreenAdjective: React.FC<ScreenAdjectiveProps> = ({ onAdjectiveSelected }) => {
  const [currentAdjective, setCurrentAdjective] = useState<string | null>(null);
  const [drawsLeft, setDrawsLeft] = useState(3);
  const [seenIndices, setSeenIndices] = useState<number[]>([]);

  const handleDraw = () => {
    if (drawsLeft <= 0) return;

    // Filter out indices we've already seen to avoid duplicates in the same session
    const availableIndices = ADJECTIVES.map((_, i) => i).filter(i => !seenIndices.includes(i));
    
    if (availableIndices.length === 0) return; // Should not happen given config

    const randomIdx = Math.floor(Math.random() * availableIndices.length);
    const actualIdx = availableIndices[randomIdx];

    setCurrentAdjective(ADJECTIVES[actualIdx]);
    setSeenIndices(prev => [...prev, actualIdx]);
    setDrawsLeft(prev => prev - 1);
  };

  const isOutOfDraws = drawsLeft === 0;

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold text-christmas-dark mb-2">Step 2: The Vibe</h2>
      <p className="text-gray-600 mb-6">
        What kind of gift is it? You have <span className="font-bold text-christmas-red">{drawsLeft}</span> draw{drawsLeft !== 1 ? 's' : ''} left.
      </p>

      <div className="w-full bg-christmas-cream border-2 border-dashed border-christmas-gold rounded-xl p-8 mb-6 min-h-[160px] flex items-center justify-center relative">
        {currentAdjective ? (
          <div className="animate-pop-in">
            <span className="block text-sm text-gray-400 uppercase tracking-widest mb-1">Adjective</span>
            <span className="text-4xl font-festive text-christmas-dark capitalize">{currentAdjective}</span>
          </div>
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
            <Wand2 className="mb-2" />
            <span>Ready to draw?</span>
          </div>
        )}
      </div>

      {!currentAdjective ? (
         <button
         onClick={handleDraw}
         className="w-full bg-christmas-red text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition-colors"
       >
         Draw Adjective
       </button>
      ) : (
        <div className="flex flex-col gap-3 w-full">
           <button
            onClick={() => onAdjectiveSelected(currentAdjective)}
            className="w-full flex items-center justify-center gap-2 bg-christmas-green text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-800 transition-colors"
          >
            <Check size={20} /> Accept "{currentAdjective}"
          </button>

          {!isOutOfDraws && (
            <button
              onClick={handleDraw}
              className="w-full flex items-center justify-center gap-2 bg-white text-gray-600 font-semibold py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={18} /> Draw Again ({drawsLeft} left)
            </button>
          )}
          
          {isOutOfDraws && (
            <p className="text-sm text-christmas-red font-medium mt-2">
              No more redraws allowed! You must accept this one.
            </p>
          )}
        </div>
      )}
    </div>
  );
};