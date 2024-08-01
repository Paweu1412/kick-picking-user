import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const Main = ({ onKeywordChange, onRollItButtonClick, onTimeSet }: { onKeywordChange: (newKeyword: string) => void, onRollItButtonClick: () => void, onTimeSet: (value: string) => void }) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    onTimeSet(time);
  }, [time]);

  return (
    <div className="Main h-[90%] max-h-[90%] w-[100%] flex flex-col items-center gap-2">
      <div className="bg-gray-800 lg:w-[70%] w-[100%] rounded-xl p-2">
        <h1 className="font-bold text-xl text-center"><span className="text-green-400">KICK.com</span> Random Winner Picker</h1>
      </div>

      <div className="bg-gray-800 lg:w-[70%] w-[100%] rounded-xl p-4 flex flex-col gap-4">
        <div className="Keyword flex flex-col gap-1">
          <h1 className="font-bold text-lg pl-1">Keyword:</h1>
          <Input
            placeholder="Enter the value"
            type="text"
            labelPlacement="inside"
            className="text-black"
            onChange={(e) => onKeywordChange(e.target.value)}
          />
        </div>

        <div className="Style flex flex-col gap-1">
          <h1 className="font-bold text-lg pl-1">Animation:</h1>
          <Select
            placeholder="Select an option"
            labelPlacement="outside"
            aria-label="Select animation style"
            style={{ stroke: "black" }}
            defaultSelectedKeys='1'
            isDisabled
          >
            <SelectItem key='1'>
              CSGO's case
            </SelectItem>
          </Select>
        </div>

        <div className="Style flex flex-col gap-1">
          <h1 className="font-bold text-lg pl-1">Animation time:</h1>
          <Input
            placeholder="Enter the value (seconds; 20-100)"
            type="number"
            labelPlacement="inside"
            className="text-black"
            max="100"
            min="15"
            onChange={(e) => setTime(e.target.value)}
            value={time}
            onFocusChange={(e: boolean) => {
              if (e === false) {
                let value = parseInt(time);

                if (isNaN(value) || value < 15) {
                  value = 15;
                }

                if (value > 100) {
                  value = 100;
                }

                setTime(value.toString());
              }
            }}
          />
        </div>
      </div>

      <div className="bg-gray-800 lg:w-[70%] w-[100%] h-max rounded-xl p-4 flex flex-col gap-4">
        <Button
          color="success"
          className="text-lg"
          onClick={() => onRollItButtonClick()}
        >
          Roll it!
        </Button>
      </div>

      <div className="bg-gray-800 lg:w-[70%] w-[100%] rounded-xl p-4">
        <img
          src="https://www.parkgateshopping.co.uk/wp-content/uploads/2022/08/Asda1.png"
          className="w-[100%] h-[150px]"
          alt="Asda"
        />
      </div>

      <div className="bg-gray-800 lg:w-[70%] w-[100%] text-lg rounded-xl p-4 font-bold text-center">
        Made by <a href="https://github.com/Paweu1412" className="text-green-400 hover:text-green-500">Paweł Nosalski</a> © 2024
      </div>
    </div>
  );
};
