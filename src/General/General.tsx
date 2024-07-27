import { Input } from "@nextui-org/input";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Chat } from "./Chat/Chat";
import { useEffect, useState } from "react";
import { Main } from "./Main/Main";
import { List } from "./List/List";

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
    <div className="General w-full h-full">
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
          color="default"
          placeholder="Enter the streamer's nickname here"
          className="w-[500px]"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <Button
          color="success"
          onClick={() => setStreamerNickname(inputValue)}
        >
          Search
        </Button>
      </div>

      <div className="relative w-full h-max flex min-h-[750px] text-white/90 mt-[45px]">
        <div className="flex justify-center w-[33.3%]">
          <List />
        </div>

        <div className="flex justify-center w-[33.3%]">
          <Main />
        </div>

        <div className="flex justify-center w-[33.3%] dark">
          {(streamerNickname !== "" && channelId !== null) && (
            <Chat channelId={channelId!} streamerNickname={streamerNickname} />
          )}
        </div>
      </div>
    </div>
  )
}

export default General;