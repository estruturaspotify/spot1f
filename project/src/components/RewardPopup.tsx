import React, { useEffect } from 'react';

interface RewardPopupProps {
  amount: number;
}

const RewardPopup: React.FC<RewardPopupProps> = ({ amount }) => {
  useEffect(() => {
    // Add animation class when component mounts
    const popup = document.getElementById('reward-popup');
    if (popup) {
      popup.classList.add('animate-popup');
    }
    
    // Remove animation class when component unmounts
    return () => {
      if (popup) {
        popup.classList.remove('animate-popup');
      }
    };
  }, []);

  return (
    <div 
      id="reward-popup"
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-spotify-green text-white rounded-xl p-6 shadow-lg transform transition-all duration-500 scale-0 opacity-0 animate-popup">
        <h3 className="text-lg font-semibold mb-2">You received:</h3>
        <p className="text-3xl font-bold">US${amount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default RewardPopup;