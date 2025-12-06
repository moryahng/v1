import React, { useState, useEffect, useRef } from 'react';
import { COLOURS } from '../constants';
import { Palette, ArrowRight } from 'lucide-react';

interface ScreenColorProps {
  onColorSelected: (color: string) => void;
}

export const ScreenColor: React.FC<ScreenColorProps> = ({ onColorSelected }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayColor, setDisplayColor] = useState<string>('?');
  const [hasSelected, setHasSelected] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const handleDraw = () => {
    setIsAnimating(true);
    let counter = 0;
    const totalCycles = 20; // How many ticks before stopping
    
    // Clear any existing interval just in case
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      // Pick random color for visual effect
      const randomIdx = Math.floor(Math.random() * COLOURS.length);
      setDisplayColor(COLOURS[randomIdx]);
      counter++;

      if (counter > totalCycles) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        
        // Final selection logic
        const finalIdx = Math.floor(Math.random() * COLOURS.length);
        const finalColor = COLOURS[finalIdx];
        
        setDisplayColor(finalColor);
        setIsAnimating(false);
        setHasSelected(true);
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold text-christmas-dark mb-2">Step 1: The Colour</h2>
      <p className="text-gray-600 mb-8">
        Click below to determine the mandatory colour of the gift you will buy.
      </p>

      <div 
        className="w-48 h-48 rounded-full flex items-center justify-center mb-8 shadow-inner border-4 border-gray-100 transition-colors duration-200"
        style={{ 
          backgroundColor: hasSelected || isAnimating 
            ? (displayColor === 'white' ? '#f0f0f0' : displayColor) 
            : '#f3f4f6',
          color: (hasSelected || isAnimating) && ['black', 'blue', 'green', 'purple', 'red'].includes(displayColor) ? 'white' : 'black'
        }}
      >
        {isAnimating || hasSelected ? (
          <span className="text-3xl font-bold capitalize drop-shadow-md">
            {displayColor}
          </span>
        ) : (
          <Palette className="w-16 h-16 text-gray-300" />
        )}
      </div>

      {!hasSelected ? (
        <button
          onClick={handleDraw}
          disabled={isAnimating}
          className="w-full bg-christmas-red text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnimating ? 'Drawing...' : 'Draw Colour'}
        </button>
      ) : (
        <div className="w-full animate-fade-in-up">
           <p className="mb-4 text-lg font-medium text-christmas-green">
            You must buy a <span className="font-bold capitalize">{displayColor}</span> gift!
           </p>
          <button
            onClick={() => onColorSelected(displayColor)}
            className="w-full flex items-center justify-center gap-2 bg-christmas-green text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-800 transition-colors"
          >
            Next Step <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};