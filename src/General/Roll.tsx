import { useEffect, useState } from "react";
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

export const Roll = ({ animationType, animationTime, isActivated, involvedViewers }: RollProps) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winPrizeIndex, setWinPrizeIndex] = useState<number>(0);
  const [prizeList, setPrizeList] = useState<Prize[]>([]);
  const [prizeIndex, setPrizeIndex] = useState<number>(0);

  useEffect(() => {
    if (involvedViewers.length === 0) { return };

    const prizes: any = involvedViewers.map((viewer) => ({
      image: viewer.authorAvatar,
      text: viewer.authorName,
      id: viewer.authorName,
    }));

    const reproductionArray = (array = [], length = 0) => [
      ...Array(length)
        .fill('_')
        .map(() => array[Math.floor(Math.random() * array.length)]),
    ];

    const reproducedPrizeList = [
      ...prizes,
      ...reproductionArray(prizes, prizes.length * 3),
      ...prizes,
      ...reproductionArray(prizes, prizes.length),
    ];

    const generateId = () =>
      `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;

    setPrizeList(reproducedPrizeList.map((prize) => ({
      ...prize,
      id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : generateId(),
    })));

    setPrizeIndex(prizes.length * 4);
  }, [involvedViewers]);

  useEffect(() => {
    if (isActivated) {
      const timer = setTimeout(() => {
        setIsSpinning(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isActivated]);

  if (isActivated) {
    return (
      <div className="Roll absolute w-screen h-screen bg-black/50 flex justify-center items-center z-[100]">
        <div className="w-[70%] h-[260px] bg-gray-800 rounded-xl flex justify-center items-center">
          <div className="h-[234px] w-[100%]">
            <RoulettePro
              prizes={prizeList}
              start={isSpinning}
              prizeIndex={prizeIndex}
              spinningTime={77}
              defaultDesignOptions={{ prizesWithText: true }}
              onPrizeDefined={() => setIsSpinning(false)}
            />
          </div>
        </div>
      </div>
    );
  }
}
