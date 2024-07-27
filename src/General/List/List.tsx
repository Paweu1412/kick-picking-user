import { Input, Button } from "@nextui-org/react"

export const List = () => {
  return (
    <div className="List h-[800px] mb-10 w-[100%] flex flex-col items-center gap-2">
      <div className="bg-gray-800 w-[70%] h-max rounded-xl p-2">
        <h1 className="font-bold text-xl text-center">List of viewers <span className="text-green-400">(click one to unselect)</span></h1>
      </div>

      <div className="w-[70%] h-[800%] flex bg-gray-800 rounded-xl p-2 flex-col gap-1">
        <div className="w-[100%] h-max bg-gray-900 flex rounded-xl p-1 gap-2">
          <img
            src="https://img.freepik.com/premium-wektory/kick-logo-wektor-do-pobrania-kick-streaming-icon-wektor-logo-eps_691560-10814.jpg"
            alt="Kick logo"
            className="ml-1 w-[22px]"
          />

          <span>OdynLive</span>
        </div>

        <div className="w-[100%] h-max bg-gray-900 flex rounded-xl p-1 gap-2">
          <img
            src="https://img.freepik.com/premium-wektory/kick-logo-wektor-do-pobrania-kick-streaming-icon-wektor-logo-eps_691560-10814.jpg"
            alt="Kick logo"
            className="ml-1 w-[22px]"
          />

          <span>kl4udi4</span>
        </div>
      </div>
    </div>
  )
}