import React from 'react';
import { Star } from 'lucide-react';

interface RatingQuestionProps {
  question: string;
  selectedRating: number | null;
  onRatingChange: (rating: number) => void;
}

const RatingQuestion: React.FC<RatingQuestionProps> = ({ 
  question, 
  selectedRating, 
  onRatingChange 
}) => {
  return (
    <div className="mb-6">
      <p className="text-sm sm:text-base mb-3">{question}</p>
      <div className="flex justify-between sm:justify-start sm:space-x-4">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            className={`flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all ${
              selectedRating === value
                ? 'bg-spotify-green text-white transform scale-110'
                : 'bg-zinc-800 text-white hover:bg-zinc-700'
            }`}
            onClick={() => onRatingChange(value)}
          >
            <span className="text-lg font-semibold">{value}</span>
            {value === 5 && selectedRating === 5 && (
              <Star className="absolute -top-1 -right-1 text-yellow-400 animate-spin" size={16} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingQuestion;