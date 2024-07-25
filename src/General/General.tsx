import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Chat } from "./Chat/Chat";

const General = () => {
  return (
    <div className="General w-screen h-screen bg-gray-900">
      <div className="w-full h-[60px] flex justify-center items-center bg-gray-800 gap-2">
        <Input placeholder="Type the streamer nickname here..." className="w-[500px]" />

        <Button color="primary">Search</Button>
      </div>

      <div className="w-full h-max flex text-white">
        <div className="flex w-[33.3%]">
          <p>test</p>
        </div>

        <div className="flex w-[33.3%]">

        </div>

        <div className="flex w-[33.3%]">
          <Chat streamerNickname="OdynLive" />
        </div>
      </div>
    </div>
  )
}

export default General;