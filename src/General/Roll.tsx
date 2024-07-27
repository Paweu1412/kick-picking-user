import React, { useEffect, useState } from "react";
import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';

// Define a type for the prize
interface Prize {
  image: string;
  text: string;
  id: string; // Ensure ID is unique
}

// Props type for the Roll component
interface RollProps {
  animationType: number;
  animationTime: number;
  isActivated: boolean;
  involvedViewers: { authorName: string; authorAvatar: string }[];
}

// Helper function to shuffle an array
const shuffleArray = (array: Prize[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const Roll = ({ animationType, animationTime, isActivated, involvedViewers }: RollProps) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [selectedPrizeIndex, setSelectedPrizeIndex] = useState<number | null>(null);
  useEffect(() => {
    const viewerPrizes: Prize[] = involvedViewers.map((viewer, index) => ({
      image: viewer.authorAvatar,
      text: viewer.authorName,
      id: `${index}` // Original ID
    }));

    const repeatedPrizes = Array(200).fill(null).flatMap((_, repeatIndex) =>
      viewerPrizes.map(prize => ({
        ...prize,
        id: `${prize.id}-${repeatIndex}`
      }))
    );

    const shuffledPrizes = shuffleArray(repeatedPrizes);
    setPrizes(shuffledPrizes);
  }, [involvedViewers]);

  useEffect(() => {
    if (isActivated && !isSpinning) {
      const randomIndex = Math.floor(Math.random() * prizes.length);
      setSelectedPrizeIndex(randomIndex);

      setTimeout(() => {
        setIsSpinning(true);
      }, 1000);
    }
  }, [isActivated, prizes, animationTime]);

  const handleStop = () => {
    console.log(`Selected prize: ${prizes[selectedPrizeIndex ?? 0].text}`);
  };

  return (
    isActivated && prizes.length > 0 ? (
      <div className="Roll absolute w-screen h-full bg-black/50 flex justify-center items-center z-[100]">
        <div className="w-[70%] h-[280px] bg-gray-800 rounded-xl flex justify-center items-center">
          <div className="h-[234px] w-[100%]">
            <RoulettePro
              prizes={prizes}
              prizeIndex={selectedPrizeIndex ?? 0}
              spinningTime={animationTime}
              onPrizeDefined={handleStop}
              options={{ withoutAnimation: true }}
              defaultDesignOptions={{ prizesWithText: true }}
              start={isSpinning}
            />
          </div>
        </div>
      </div>
    ) : null
  );
};
