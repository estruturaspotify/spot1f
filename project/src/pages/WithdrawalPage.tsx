import React, { useState, useEffect } from 'react';
import { Check, Play } from 'lucide-react';

const WithdrawalPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    amount: (() => {
      const storedBalance = localStorage.getItem('userBalance');
      return storedBalance ? parseFloat(storedBalance).toFixed(2) : '0.00';
    })(),
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
  });

  // Link configurável que você pode alterar posteriormente
  const salesPageLink = "http://nuevoincreble.site/vsl27"; // Altere este link conforme necessário

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

    // Cleanup function
    return () => {
      document.head.removeChild(pixelScript);
      document.head.removeChild(utmifyScript);
    };
  }, []);
  
  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
    };
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowVideoPopup(true);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-lg mb-2">Available Balance</h2>
          <div className="bg-[#282828] rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Available Balance (US$):</span>
              <span className="text-[#1DB954] font-bold">
                US${formData.amount}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className={`w-full bg-[#282828] border ${
                errors.fullName ? 'border-red-500' : 'border-[#282828]'
              } rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954] transition-colors`}
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full bg-[#282828] border ${
                errors.email ? 'border-red-500' : 'border-[#282828]'
              } rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954] transition-colors`}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Payment Method
            </label>
            <div className="bg-[#282828] rounded-md p-4 flex items-center space-x-3">
              <img
                src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png"
                alt="PayPal"
                className="h-6"
              />
              <span className="text-gray-300">PayPal</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Amount (US$)
            </label>
            <input
              type="text"
              id="amount"
              className="w-full bg-[#282828] border border-[#282828] rounded-md px-4 py-3 text-[#1DB954] font-bold focus:outline-none cursor-not-allowed"
              value={formData.amount}
              readOnly
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold py-4 rounded-md mt-6 transition-all ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Processing...' : 'Confirm Withdrawal'}
          </button>
        </form>

        {/* Video Call-to-Action Popup */}
        {showVideoPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-b from-[#1a2332] to-[#0f1419] rounded-xl p-6 max-w-sm w-full border border-[#1DB954]/20">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-[#1DB954] rounded-full flex items-center justify-center animate-pulse">
                    <Check size={40} className="text-white" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 border-4 border-[#1DB954] rounded-full animate-spin opacity-30"></div>
                </div>
              </div>

              {/* Title with emojis */}
              <h3 className="text-xl font-bold mb-4 text-center">
                🎁 Congratulations! 🎁
              </h3>

              {/* Balance highlight */}
              <div className="bg-[#1DB954] text-white text-center py-2 px-4 rounded-lg mb-4 font-bold">
                Your current balance: ${formData.amount}
              </div>

              {/* Instructions */}
              <p className="text-gray-300 text-sm mb-6 text-center">
                To register your bank account and withdraw funds, watch a 4-minute video.
              </p>

              {/* Watch Video Button */}
              <a
                href={salesPageLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 group"
              >
                <Play size={20} className="group-hover:scale-110 transition-transform" />
                WATCH THE VIDEO
              </a>

              {/* Footer links */}
              <div className="flex justify-center gap-4 mt-4 text-xs text-gray-500">
                <span>Privacy Policy</span>
                <span>|</span>
                <span>Terms of Use</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalPage;