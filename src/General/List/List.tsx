import { Button, Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const List = ({ listOfViewers, onClear }: { listOfViewers: any, onClear: () => void }) => {
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    listOfViewers.forEach((viewer: any) => {
      setCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        [viewer.authorName]: prevCheckboxes[viewer.authorName] ?? true,
      }));
    });
  }, [listOfViewers]);

  const handleCheckboxChange = (viewerName: string, isChecked: boolean) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [viewerName]: isChecked,
    }));
  };

  return (
    <div className="List max-h-[800px] w-[100%] flex flex-col items-center gap-2">
      <div className="bg-gray-800 lg:w-[90%] w-[100%] h-max rounded-xl flex justify-between p-2">
        <h1 className="font-bold text-xl text-center">
          List of viewers <span className="text-green-400">({listOfViewers.length})</span>
        </h1>

        <Button
          color="success"
          size="sm"
          className="h-[100%] font-bold"
          onClick={onClear}
        >
          Clear
        </Button>
      </div>

      <div className="lg:w-[90%] w-[100%] !max-h-[800px] overflow-auto flex rounded-xl flex-col gap-2">
        {listOfViewers.map((viewer: any) => (
          <div key={viewer.authorName} className="w-[100%] h-max bg-gray-800 flex rounded-xl p-1 gap-2">
            <img
              src={viewer.authorAvatar || "https://img.freepik.com/premium-wektory/kick-logo-wektor-do-pobrania-kick-streaming-icon-wektor-logo-eps_691560-10814.jpg"}
              alt="Kick logo"
              className={"ml-1 w-[22px] h-[22px] rounded-full " + (!checkboxes[viewer.authorName] && "saturate-0")}
            />

            <div className="w-[100%] flex justify-between">
              <span>{viewer.authorName}</span>

              <Checkbox
                isSelected={checkboxes[viewer.authorName] ?? false}
                onChange={(e) => handleCheckboxChange(viewer.authorName, e.target.checked)}
                radius="full"
                color="success"
                className="p-0 -m-1"
                isDisabled={true}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
