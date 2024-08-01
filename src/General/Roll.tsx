import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';

interface Prize {
  image: string;
  text: string;
  id: string;
}

interface RollProps {
  animationType: number;
  animationTime: number;
  isActivated: boolean;
  involvedViewers: { authorName: string; authorAvatar: string }[];
  messages: { authorName: string; content: string; messageId: string; }[];
  closeIsActivated: () => void;
}

const shuffleArray = (array: Prize[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const Roll = ({ animationType, animationTime, isActivated, involvedViewers, messages, closeIsActivated }: RollProps) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [selectedPrizeIndex, setSelectedPrizeIndex] = useState<number | null>(null);
  const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(false);
  const [winnerMessages, setWinnerMessages] = useState<{ authorName: string; content: string; messageId: string; }[]>([]);

  useEffect(() => {
    const viewerPrizes: Prize[] = involvedViewers.map((viewer, index) => ({
      image: viewer.authorAvatar,
      text: viewer.authorName,
      id: `${index}`
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
    if (isActivated && prizes.length > 0 && !isSpinning && !isAnimationFinished) {
      const randomIndex = Math.floor(Math.random() * prizes.length);
      setSelectedPrizeIndex(randomIndex);

      setTimeout(() => {
        setIsSpinning(true);
      }, 1000);
    }
  }, [isActivated, prizes, animationTime, isSpinning, isAnimationFinished]);

  const handleStop = () => {
    if (selectedPrizeIndex !== null) {
      const winner = prizes[selectedPrizeIndex];
      const filteredMessages = messages.filter(message => message.authorName === winner.text);
      setWinnerMessages(filteredMessages);

      setTimeout(() => {
        setIsAnimationFinished(true);
        setIsSpinning(false);
      }, 2000);
    }
  };

  useEffect(() => {
    console.log(winnerMessages);
  }, [winnerMessages]);

  return (
    isActivated && prizes.length > 0 ? (
      <div className="Roll fixed inset-0 w-full h-full bg-black/50 flex justify-center items-center z-[100]">
        {isAnimationFinished && selectedPrizeIndex !== null && prizes[selectedPrizeIndex] ? (
          <div className="lg:w-[550px] w-[90%] rounded-xl flex flex-col gap-2">
            <div className="bg-gray-800 h-max rounded-xl flex flex-col items-center p-2 gap-4">
              <h1 className="font-bold text-2xl text-white gap-4">
                🏆 {prizes[selectedPrizeIndex].text} 🏆
              </h1>

              <img src={prizes[selectedPrizeIndex].image} className="w-[200px] h-[200px] rounded-xl" />

              <div className="overflow-auto w-[100%] max-h-[150px] flex flex-col gap-2 scrollbar-hide">
                {winnerMessages.map((message) => (
                  <div key={message.messageId} className="text-white bg-gray-700 p-2 rounded-xl">
                    {message.authorName}: {message.content}
                  </div>
                ))}
              </div>
            </div>

            <Button
              color="danger"
              className="text-lg bg-red-700"
              onClick={() => {
                setIsAnimationFinished(false);
                setSelectedPrizeIndex(null);
                closeIsActivated();
              }}
            >
              Close
            </Button>
          </div>
        ) : (
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
        )}
      </div>
    ) : null
  );
};
