import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RewardPopup from '../components/RewardPopup';
import ArtistCard from '../components/ArtistCard';
import RatingQuestion from '../components/RatingQuestion';
import OptionQuestion from '../components/OptionQuestion';

export interface Artist {
  id: number;
  name: string;
  imageUrl: string;
  songUrl: string;
  reward: number;
}

export const artists: Artist[] = [
  {
    id: 1,
    name: 'Taylor Swift',
    imageUrl:
      'https://123pagebuilder.s3.us-east-1.amazonaws.com/123tapronto1748451284226-Life_Taylor-Swift-Bilionaria.jpeg',
    songUrl:
      'https://s3.typebot.io/public/workspaces/cm5nobcf3000010rv8he8qfrd/typebots/cmb8lhgw2000bbi8wy4vgqxbk/blocks/zx92d1spwqxxi6h7pmrkxw80?v=1748636869602',
    reward: 19.75,
  },
  {
    id: 2,
    name: 'Ed Sheeran',
    imageUrl:
      'https://123pagebuilder.s3.us-east-1.amazonaws.com/123tapronto1748451416806-2967.jpeg',
    songUrl:
      'https://s3.typebot.io/public/workspaces/cm5nobcf3000010rv8he8qfrd/typebots/cmb8lhgw2000bbi8wy4vgqxbk/blocks/oroc99qxv2247sknq2nq8f7w?v=1748637359003',
    reward: 23.45,
  },
  {
    id: 3,
    name: 'Drake',
    imageUrl:
      'https://123pagebuilder.s3.us-east-1.amazonaws.com/123tapronto1748451562888-drake.jpg',
    songUrl:
      'https://s3.typebot.io/public/workspaces/cm5nobcf3000010rv8he8qfrd/typebots/cmb8lhgw2000bbi8wy4vgqxbk/blocks/gav6z4pxvpq8b3bste9ph3q4?v=1748641630300',
    reward: 16.90,
  },
  {
    id: 4,
    name: 'Adele',
    imageUrl:
      'https://123pagebuilder.s3.us-east-1.amazonaws.com/123tapronto1748451633433-9-1.jpg',
    songUrl:
      'https://s3.typebot.io/public/workspaces/cm5nobcf3000010rv8he8qfrd/typebots/cmb8lhgw2000bbi8wy4vgqxbk/blocks/hjp1ph0ujyo50f6oib2yciiw?v=1748643265369',
    reward: 25.80,
  },
  {
    id: 5,
    name: 'The Weeknd',
    imageUrl:
      'https://123pagebuilder.s3.us-east-1.amazonaws.com/123tapronto1748451713359-images+%284%29.jpeg',
    songUrl:
      'https://s3.typebot.io/public/workspaces/cm5nobcf3000010rv8he8qfrd/typebots/cmb8lhgw2000bbi8wy4vgqxbk/blocks/rba634xd5cpn1zhhy5hno4uc?v=1748643831111',
    reward: 21.35,
  },
  {
    id: 6,
    name: 'Bad Bunny',
    imageUrl:
      'https://123pagebuilder.s3.us-east-1.amazonaws.com/123tapronto1748451821245-bad-bunny-press-2023-billboard-1548+%281%29.jpeg',
    songUrl:
      'https://s3.typebot.io/public/workspaces/cm5nobcf3000010rv8he8qfrd/typebots/cmb8lhgw2000bbi8wy4vgqxbk/blocks/cw8pf31ldsa81xvrwwgga8x3?v=1748644287784',
    reward: 18.95,
  },
  {
    id: 7,
    name: 'BTS',
    imageUrl:
      'https://123pagebuilder.s3.us-east-1.amazonaws.com/123tapronto1748451870112-181201_BTS_at_the_MelOn_Music_Awards.jpg',
    songUrl:
      'https://s3.typebot.io/public/workspaces/cm5nobcf3000010rv8he8qfrd/typebots/cmb8lhgw2000bbi8wy4vgqxbk/blocks/rr6xumorckhtoit7iwf4btnf?v=1748646088744',
    reward: 26.15,
  },
];

const EvaluationPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentArtistIndex, setCurrentArtistIndex] = useState<number>(() => {
    const storedIndex = localStorage.getItem('currentArtistIndex');
    // Always start from 0 (Taylor Swift) if no valid index is stored
    return storedIndex ? parseInt(storedIndex) : 0;
  });
  const [rating, setRating] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState<boolean | null>(null);
  const [ageGroup, setAgeGroup] = useState<string | null>(null);
  const [showReward, setShowReward] = useState<boolean>(false);

  const currentArtist = artists[currentArtistIndex];

  useEffect(() => {
    // Initialize localStorage values if they don't exist
    if (!localStorage.getItem('currentArtistIndex')) {
      localStorage.setItem('currentArtistIndex', '0');
      setCurrentArtistIndex(0);
    }
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

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleRecommendation = (value: boolean) => {
    setRecommendation(value);
  };

  const handleAgeGroup = (value: string) => {
    setAgeGroup(value);
  };

  const calculateTotalBalance = () => {
    const initialBalance = 50;
    const completedEvaluations = currentArtistIndex;
    const earnedRewards = artists
      .slice(0, completedEvaluations)
      .reduce((sum, artist) => sum + artist.reward, 0);
    return initialBalance + earnedRewards + currentArtist.reward;
  };

  const handleSubmit = () => {
    if (rating === null || recommendation === null || ageGroup === null) {
      alert('Please answer all questions');
      return;
    }

    const newBalance = calculateTotalBalance();
    localStorage.setItem('userBalance', newBalance.toString());

    window.dispatchEvent(new Event('evaluationComplete'));

    setShowReward(true);

    const audio = new Audio(
      'https://assets.mixkit.co/active_storage/sfx/2058/2058-preview.mp3'
    );
    audio.play();

    setTimeout(() => {
      setShowReward(false);
      setRating(null);
      setRecommendation(null);
      setAgeGroup(null);

      if (currentArtistIndex < artists.length - 1) {
        const nextIndex = currentArtistIndex + 1;
        setCurrentArtistIndex(nextIndex);
        localStorage.setItem('currentArtistIndex', nextIndex.toString());
      } else {
        // All evaluations completed, go to congratulations
        navigate('/congratulations');
      }
    }, 2000);
  };

  const isFormComplete =
    rating !== null && recommendation !== null && ageGroup !== null;

  // Safety check to ensure we have a valid artist
  if (!currentArtist) {
    navigate('/congratulations');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <ArtistCard artist={currentArtist} />

      <div className="bg-zinc-900 rounded-lg p-4 mt-6">
        <RatingQuestion
          question={`From 1 to 5, what rating would you give to ${currentArtist.name}'s songs?`}
          selectedRating={rating}
          onRatingChange={handleRating}
        />

        <OptionQuestion
          question={`Would you recommend the artist ${currentArtist.name} to your friends and family?`}
          options={[
            { value: 'true', label: 'Yes' },
            { value: 'false', label: 'No' },
          ]}
          selectedValue={
            recommendation !== null ? recommendation.toString() : null
          }
          onOptionChange={(value) => handleRecommendation(value === 'true')}
        />

        <OptionQuestion
          question={`What age group do you think listens to the artist ${currentArtist.name} the most?`}
          options={[
            { value: 'under18', label: 'Under 18' },
            { value: 'over18', label: 'Over 18' },
          ]}
          selectedValue={ageGroup}
          onOptionChange={handleAgeGroup}
        />

        <button
          className={`w-full py-3 mt-6 rounded-lg font-semibold transition-all ${
            isFormComplete
              ? 'bg-spotify-green hover:bg-spotify-green-light transform hover:-translate-y-1'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
          onClick={handleSubmit}
          disabled={!isFormComplete}
        >
          Submit Answers
        </button>
      </div>

      {showReward && <RewardPopup amount={currentArtist.reward} />}
    </div>
  );
};

export default EvaluationPage;