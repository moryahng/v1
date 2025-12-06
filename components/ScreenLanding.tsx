import React from 'react';
import { Participant } from '../types';
import { PARTICIPANTS } from '../constants';
import { Gift } from 'lucide-react';

interface ScreenLandingProps {
  onSelectUser: (name: Participant) => void;
}

export const ScreenLanding: React.FC<ScreenLandingProps> = ({ onSelectUser }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-christmas-red/10 p-4 rounded-full mb-6">
        <Gift className="text-christmas-red w-10 h-10" />
      </div>
      
      <h2 className="text-2xl font-bold text-christmas-dark mb-3 text-center">
        Who are you?
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Pick your name to reveal your secret recipient and define your gift type!
      </p>

      <div className="grid grid-cols-2 gap-3 w-full">
        {PARTICIPANTS.map((name) => (
          <button
            key={name}
            onClick={() => onSelectUser(name)}
            className="flex items-center justify-center p-4 rounded-xl border-2 border-christmas-green/30 text-christmas-green font-bold text-lg hover:bg-christmas-green hover:text-white hover:border-christmas-green transition-all duration-200 active:scale-95"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};