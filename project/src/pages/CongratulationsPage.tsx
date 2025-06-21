import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CongratulationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [hours, setHours] = useState<number>(23);
  const [minutes, setMinutes] = useState<number>(59);
  const [seconds, setSeconds] = useState<number>(59);
  const [balance, setBalance] = useState<number>(() => {
    const storedBalance = localStorage.getItem('userBalance');
    return storedBalance ? parseFloat(storedBalance) : 0;
  });

  useEffect(() => {
    // Add tracking scripts
    const pixelScript = document.createElement('script');
    pixelScript.innerHTML = `
      window.pixelId = "68476cd77aa248ea7e72e73c";
      var a = document.createElement("script");
      a.setAttribute("async", "");
      a.setAttribute("defer", "");
      a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
      document.head.appendChild(a);
    `;
    document.head.appendChild(pixelScript);

    const utmifyScript = document.createElement('script');
    utmifyScript.src = "https://cdn.utmify.com.br/scripts/utms/latest.js";
    utmifyScript.setAttribute("data-utmify-prevent-xcod-sck", "");
    utmifyScript.setAttribute("data-utmify-prevent-subids", "");
    utmifyScript.async = true;
    utmifyScript.defer = true;
    document.head.appendChild(utmifyScript);

    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      document.head.removeChild(pixelScript);
      document.head.removeChild(utmifyScript);
    };
  }, [hours, minutes, seconds]);

  const handleWithdraw = () => {
    navigate('/withdrawal');
  };

  return (
    <div className="container mx-auto px-4 py-10 text-center">
      <div className="max-w-md mx-auto bg-zinc-900 rounded-xl p-8 shadow-lg">
        <div className="w-20 h-20 bg-spotify-green rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Check size={40} className="text-white" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Congratulations!</h1>
        <p className="text-gray-300 mb-4">You have completed all evaluations.</p>
        
        <div className="text-2xl font-bold text-spotify-green my-6">
          US$ {balance.toFixed(2)}
        </div>
        
        <p className="text-gray-300 mb-2">Come back in:</p>
        <div className="text-3xl font-mono font-bold text-spotify-green my-4">
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        
        <button
          className="w-full bg-spotify-green hover:bg-spotify-green-light text-white font-semibold py-3 px-6 rounded-lg mt-6 transition-all transform hover:-translate-y-1"
          onClick={handleWithdraw}
        >
          MAKE A WITHDRAWAL
        </button>
      </div>
    </div>
  );
};

export default CongratulationsPage;