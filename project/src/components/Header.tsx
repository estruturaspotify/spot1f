import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { artists } from '../pages/EvaluationPage';

const Header: React.FC = () => {
  const location = useLocation();
  const isCongratulationsPage = location.pathname === '/congratulations';
  const currentArtistIndex = parseInt(localStorage.getItem('currentArtistIndex') || '0');
  const [balance, setBalance] = useState(() => {
    const initialBalance = 50;
    const completedEvaluations = parseInt(localStorage.getItem('currentArtistIndex') || '0');
    const earnedRewards = artists
      .slice(0, completedEvaluations)
      .reduce((sum, artist) => sum + artist.reward, 0);
    const totalBalance = initialBalance + earnedRewards;
    localStorage.setItem('userBalance', totalBalance.toString());
    return totalBalance;
  });

  useEffect(() => {
    const handleEvaluationComplete = () => {
      const currentArtist = artists[currentArtistIndex];
      if (currentArtist) {
        const newBalance = balance + currentArtist.reward;
        setBalance(newBalance);
        localStorage.setItem('userBalance', newBalance.toString());
      }
    };

    window.addEventListener('evaluationComplete', handleEvaluationComplete);
    return () => {
      window.removeEventListener('evaluationComplete', handleEvaluationComplete);
    };
  }, [balance, currentArtistIndex]);

  return (
    <header className="sticky top-0 z-10 bg-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" 
            alt="Spotify" 
            className="h-8 sm:h-10"
          />
          {!isCongratulationsPage && (
            <span className="text-sm sm:text-base font-medium text-gray-300">
            </span>
          )}
        </div>
        <div className="flex items-center text-spotify-green font-bold">
          <span className="text-xs mr-1">US$</span>
          <span className="text-sm sm:text-base">{balance.toFixed(2)}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;