import { Input } from "@nextui-org/input";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Chat } from "./Chat/Chat";
import { useEffect, useState } from "react";

const General = () => {
  const [inputValue, setInputValue] = useState("");
  const [streamerNickname, setStreamerNickname] = useState("");
  const [channelId, setChannelId] = useState<number | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (streamerNickname === "") return;
    setChannelId(null);

    fetch(`https://kick.com/api/v2/channels/${streamerNickname}/`)
      .then((response) => response.json())
      .then((data) => setChannelId(data.id))
      .catch((error) => onOpen());
  }, [streamerNickname, setStreamerNickname]);

  return (
    <div className="General w-screen h-screen bg-gray-900 dark">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="flex flex-col bg-gray-900 text-white">
          {onClose => (
            <>
              <ModalHeader>Whooops!</ModalHeader>
              <ModalBody>
                <p>The channel you are looking for does not exist.<br></br>Please try again!</p>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="w-full h-[60px] flex justify-center items-center bg-gray-800 gap-2">
        <Input
          variant="bordered"
          placeholder="Enter the streamer's nickname here"
          className="w-[500px] text-white"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <Button
          className="text-white"
          onClick={() => setStreamerNickname(inputValue)}
        >
          Search
        </Button>
      </div>

      <div className="w-full h-max flex text-white/90">
        <div className="flex w-[33.3%]">

        </div>

        <div className="flex w-[33.3%]">

        </div>

        <div className="flex w-[33.3%] h-[calc(100vh-60px)] items-center justify-center">
          {(streamerNickname !== "" && channelId !== null) && (
            <Chat channelId={channelId!} streamerNickname={streamerNickname} />
          )}
        </div>
      </div>
    </div>
  )
}

export default General;