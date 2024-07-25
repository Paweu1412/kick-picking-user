import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Chat } from "./Chat/Chat";

const General = () => {
  return (
    <div className="General w-screen h-screen bg-gray-900">
      <div className="w-full h-[60px] flex justify-center items-center bg-gray-800 gap-2">
        <Input placeholder="Enter the streamer's nickname here" className="w-[500px] opacity-85" />

        <Button className="opacity-85 bg-black text-white">Search</Button>
      </div>

      <div className="w-full h-max flex text-white/90">
        <div className="flex w-[33.3%]">

        </div>

        <div className="flex w-[33.3%]">

        </div>

        <div className="flex w-[33.3%] h-[calc(100vh-60px)] items-center">
          <Chat streamerNickname="odynlive" />
        </div>
      </div>
    </div>
  )
}

export default General;