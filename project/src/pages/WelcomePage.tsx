import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ChevronRight, Gift, Award, DollarSign } from 'lucide-react';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const balance = parseFloat(localStorage.getItem('userBalance') || '50').toFixed(2);

  useEffect(() => {
    if (!localStorage.getItem('userBalance')) {
      localStorage.setItem('userBalance', '50');
    }

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

    // Cleanup function
    return () => {
      document.head.removeChild(pixelScript);
      document.head.removeChild(utmifyScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/50 backdrop-blur-lg p-3 border-b border-zinc-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" 
              alt="Spotify" 
              className="h-6"
            />
          </div>
          <div className="flex items-center bg-zinc-800/50 px-3 py-1.5 rounded-full">
            <DollarSign size={14} className="text-spotify-green mr-1" />
            <span className="text-spotify-green font-bold text-sm">{balance}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto flex items-center justify-center p-4 min-h-[calc(100vh-64px)]">
        <div className="max-w-sm w-full bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-zinc-800">
          {/* Animated Stars */}
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={24}
                className="text-yellow-400 animate-star"
                style={{
                  animationDelay: `${i * 0.2}s`
                }}
                fill="currentColor"
              />
            ))}
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-2 bg-spotify-green/10 rounded-full mb-3">
                <Gift size={24} className="text-spotify-green" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Congratulations!
              </h1>
              <p className="text-gray-400">
                You have been selected for Spotify's new rewards program!
              </p>
            </div>

            <div className="bg-gradient-to-r from-spotify-green/20 to-spotify-green/10 rounded-lg p-4 border border-spotify-green/20">
              <div className="flex items-center gap-2 mb-1">
                <Award className="text-spotify-green" size={20} />
                <span className="text-spotify-green font-semibold text-sm">CONGRATULATIONS!</span>
              </div>
              <h2 className="text-xl font-bold text-white">
                You have earned $50 USD!
              </h2>
              <p className="text-gray-400 text-sm">
                Your initial reward has been credited to your account
              </p>
            </div>

            <div className="bg-zinc-800/50 rounded-lg p-4">
              <p className="text-gray-300 text-sm mb-2">
                Complete 7 additional evaluations to unlock your withdrawal!
              </p>
              <div className="flex items-center justify-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-spotify-green rounded-full" />
                <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
              </div>
            </div>

            <button
              onClick={() => navigate('/evaluation')}
              className="w-full bg-spotify-green hover:bg-spotify-green-light text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2 group text-sm"
            >
              Start Evaluation
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;