import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
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

const shuffleArray = (array: Prize[]): Prize[] => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const Roll = ({ animationType, animationTime, isActivated, involvedViewers, messages, closeIsActivated }: RollProps) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [selectedPrizeIndex, setSelectedPrizeIndex] = useState<number | null>(null);
  const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(false);
  const [winnerMessages, setWinnerMessages] = useState<{ authorName: string; content: string; messageId: string; }[]>([]);
  const [isExploding, setIsExploding] = useState<boolean>(false);

  useEffect(() => {
    if (!isActivated) {
      setIsSpinning(false);
      setIsAnimationFinished(false);
      setSelectedPrizeIndex(null);
      setPrizes([]);
      setWinnerMessages([]);
      setIsExploding(false);
      return;
    }

    const viewerPrizes: Prize[] = involvedViewers.map((viewer, index) => ({
      image: viewer.authorAvatar,
      text: viewer.authorName,
      id: `${index}`
    }));

    if (viewerPrizes.length > 0) {
      const repeatCount = Math.ceil(50);
      const repeatedPrizes = Array.from({ length: repeatCount }, (_, repeatIndex) =>
        viewerPrizes.map(prize => ({
          ...prize,
          id: `${prize.id}-${repeatIndex}`
        }))
      ).flat();
      setPrizes(shuffleArray(repeatedPrizes));
    }
  }, [involvedViewers, isActivated]);

  useEffect(() => {
    if (isActivated && prizes.length > 0 && !isSpinning && !isAnimationFinished) {
      const randomIndex = Math.floor(Math.random() * prizes.length);
      setSelectedPrizeIndex(randomIndex);

      setTimeout(() => {
        setIsSpinning(true);
      }, 2000);
    }
  }, [isActivated, prizes, isSpinning, isAnimationFinished]);

  const handleStop = () => {
    if (selectedPrizeIndex !== null) {
      const winner = prizes[selectedPrizeIndex];
      setWinnerMessages(messages.filter(message => message.authorName === winner.text));

      setTimeout(() => {
        setIsAnimationFinished(true);
        setIsSpinning(false);
        setIsExploding(true);
      }, 2000);
    }
  };

  const handleCancel = () => {
    setIsAnimationFinished(true);
    setIsSpinning(false);
    closeIsActivated();
    setSelectedPrizeIndex(null);
    setWinnerMessages([]);
    setPrizes([]);
    setIsExploding(false);
  }

  return (
    isActivated && prizes.length > 0 ? (
      <div className="Roll fixed inset-0 w-full h-full bg-black/50 flex justify-center items-center z-[100]">
        {isExploding && (
          <div className="!absolute w-screen h-screen flex justify-center">
            <ConfettiExplosion force={0.8} duration={3000} particleCount={200} width={2000} />
          </div>
        )}

        {isAnimationFinished && selectedPrizeIndex !== null && prizes[selectedPrizeIndex] ? (
          <div className="lg:w-[550px] w-[90%] rounded-xl flex flex-col gap-2">
            <div className="bg-gray-800 h-max rounded-xl flex flex-col items-center p-2 gap-4">
              <h1 className="font-bold text-2xl text-white gap-4">
                🏆 {prizes[selectedPrizeIndex].text} 🏆
              </h1>

              <img src={prizes[selectedPrizeIndex].image} className="w-[200px] h-[200px] rounded-xl" alt="Winner Avatar" />

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
              onClick={handleCancel}
            >
              Close
            </Button>
          </div>
        ) : (
          <div className="w-[70%] h-[260px] bg-gray-800 rounded-xl flex justify-center items-center gap-6">
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

            {/* <Button
              color="danger"
              className="text-lg bg-red-700"
              onClick={handleCancel}
            >
              Stop the prize
            </Button> */}
          </div>
        )}
      </div>
    ) : null
  );
};
