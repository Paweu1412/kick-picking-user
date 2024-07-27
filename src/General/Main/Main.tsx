import { Button, Input, Select, SelectItem } from "@nextui-org/react"

export const Main = () => {
  return (
    <div className="Main h-[90%] max-h-[90%] w-[100%] flex flex-col items-center gap-2">
      <div className="bg-gray-800 w-[70%] rounded-xl p-2">
        {/* <img
            src="https://img.freepik.com/premium-wektory/kick-logo-wektor-do-pobrania-kick-streaming-icon-wektor-logo-eps_691560-10814.jpg"
            alt="Kick logo"
            className="w-[32px]"
          /> */}

        <h1 className="font-bold text-xl text-center"><span className="text-green-400">KICK.com</span> Random Winner Picker</h1>
      </div>

      <div className="bg-gray-800 w-[70%] rounded-xl p-4 flex flex-col gap-4">
        <div className="Keyword flex flex-col gap-1">
          <h1 className="font-bold text-lg pl-1">Keyword:</h1>

          <Input
            placeholder="Enter the value"
            type="text"
            labelPlacement="inside"
            className="text-black"
          />
        </div>

        <div className="Style flex flex-col gap-1">
          <h1 className="font-bold text-lg pl-1">Animation:</h1>

          <Select
            placeholder="Select an option"
            labelPlacement="outside"
            style={{
              stroke: "black",
            }}
          >
            <SelectItem key={1}>
              CSGO's case
            </SelectItem>
          </Select>
        </div>

        <div className="Style flex flex-col gap-1">
          <h1 className="font-bold text-lg pl-1">Animation time:</h1>

          <Input
            placeholder="Enter the value (seconds)"
            type="number"
            labelPlacement="inside"
            className="text-black"
            min={1}
          />
        </div>
      </div>

      <div className="bg-gray-800 w-[70%] h-max rounded-xl p-4 flex flex-col gap-4">
        <Button
          color="success"
          className="text-lg"
        >
          Roll it!
        </Button>
      </div>

      <div className="bg-gray-800 w-[70%] rounded-xl p-4">
        <img
          src="https://www.parkgateshopping.co.uk/wp-content/uploads/2022/08/Asda1.png"
          className="w-[100%] h-[150px]"
        />
      </div>

      <div className="bg-gray-800 w-[70%] text-lg rounded-xl p-4 font-bold text-center">
        Made by <a href="https://github.com/Paweu1412" className="text-green-400 hover:text-green-500">Paweł Nosalski</a> © 2024
      </div>
    </div>
  )
}