import React, { useEffect, useState, useRef } from 'react';

interface ArtistProps {
  artist: {
    name: string;
    imageUrl: string;
    songUrl?: string;
  };
}

const ArtistCard: React.FC<ArtistProps> = ({ artist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const initializeAudio = async () => {
      if (artist.songUrl) {
        // Create new audio instance
        audioRef.current = new Audio(artist.songUrl);
        audioRef.current.volume = 0.5;
        audioRef.current.loop = true;

        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Auto-play failed:', error);
          setIsPlaying(false);
        }
      }
    };

    initializeAudio();

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
        setIsPlaying(false);
      }
    };
  }, [artist.songUrl]); // This effect will run whenever the songUrl changes

  return (
    <div className="relative">
      <div className={`w-full h-60 sm:h-80 overflow-hidden rounded-lg ${isPlaying ? 'animate-pulse-slow' : ''}`}>
        <img 
          src={artist.imageUrl} 
          alt={artist.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        
        {isPlaying && (
          <div className="absolute top-0 left-0 right-0 flex justify-center gap-1 p-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-spotify-green animate-sound-bar"
                style={{
                  height: '20px',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 p-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">{artist.name}</h2>
      </div>
    </div>
  );
};

export default ArtistCard;