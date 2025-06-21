import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface OptionQuestionProps {
  question: string;
  options: Option[];
  selectedValue: string | null;
  onOptionChange: (value: string) => void;
}

const OptionQuestion: React.FC<OptionQuestionProps> = ({ 
  question, 
  options, 
  selectedValue, 
  onOptionChange 
}) => {
  return (
    <div className="mb-6">
      <p className="text-sm sm:text-base mb-3">{question}</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            className={`py-3 px-4 rounded-lg font-medium transition-all ${
              selectedValue === option.value
                ? 'bg-spotify-green text-white'
                : 'bg-zinc-800 text-white hover:bg-zinc-700'
            }`}
            onClick={() => onOptionChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptionQuestion;