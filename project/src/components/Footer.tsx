import React from 'react';
import { DollarSign, Home, HelpCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900 py-3 px-2">
      <div className="container mx-auto">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center text-gray-400 hover:text-spotify-green transition-colors">
            <DollarSign size={20} />
            <span className="text-xs mt-1">Withdraw</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 hover:text-spotify-green transition-colors">
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 hover:text-spotify-green transition-colors">
            <HelpCircle size={20} />
            <span className="text-xs mt-1">FAQ</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;