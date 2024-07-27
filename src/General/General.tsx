import { Input } from "@nextui-org/input";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Chat } from "./Chat/Chat";
import { useEffect, useState } from "react";
import { Main } from "./Main/Main";
import { List } from "./List/List";
import { Roll } from "./Roll";

const shuffleArray = (array: any) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const General = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [streamerNickname, setStreamerNickname] = useState<string>("");
  const [channelId, setChannelId] = useState<number | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [keyword, setKeyword] = useState<string>("");
  const [messagesFiltered, setMessagesFiltered] = useState<any[]>([]);
  const [involvedViewers, setInvolvedViewers] = useState<any[]>([]);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [timeAnimation, setTimeAnimation] = useState<number>(15);
  const [animationType, setAnimationType] = useState<number>(0);

  const clearFilteredMessages = () => {
    setMessagesFiltered([]);
  };

  useEffect(() => {
    if (streamerNickname === "") return;
    setChannelId(null);

    fetch(`https://kick.com/api/v2/channels/${streamerNickname}/`)
      .then((response) => response.json())
      .then((data) => setChannelId(data.id))
      .catch((error) => onOpen());
  }, [streamerNickname, setStreamerNickname]);

  const handleMessagesFiltered = (newMessages: any) => {
    setMessagesFiltered((prevMessages) => {
      const filteredNewMessages = newMessages.filter((msg: any) => !prevMessages.some((prevMsg) => prevMsg.authorName === msg.authorName));

      return [...prevMessages, ...filteredNewMessages];
    });
  };

  useEffect(() => {
    if (isActivated) { return; }

    const viewersArray = messagesFiltered.map((message) => ({
      authorName: message.authorName,
      authorAvatar: message.authorAvatar,
    }));

    setInvolvedViewers(shuffleArray(viewersArray));
  }, [isActivated, messagesFiltered]);

  const handleRollItButtonClick = () => {
    if (messagesFiltered.length < 2) return;

    setIsActivated(true);
  }

  return (
    <div className="General w-full h-full">
      <Roll
        animationTime={30}
        animationType={animationType}
        isActivated={isActivated}
        involvedViewers={involvedViewers}
      />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="flex flex-col bg-gray-900 text-white">
          {onClose => (
            <>
              <ModalHeader>Whooops!</ModalHeader>
              <ModalBody>
                <p>The channel you are looking for does not exist.<br />Please try again!</p>
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
        <div className="flex justify-center w-[33.3%] dark">
          {(streamerNickname !== "" && channelId !== null) && (
            <List listOfViewers={messagesFiltered} onClear={clearFilteredMessages} />
          )}
        </div>

        <div className="flex justify-center w-[33.3%]">
          <Main onKeywordChange={(newKeyword) => setKeyword(newKeyword)} onRollItButonClick={() => handleRollItButtonClick()} />
        </div>

        <div className="flex justify-center w-[33.3%] dark">
          {(streamerNickname !== "" && channelId !== null) && (
            <Chat channelId={channelId} streamerNickname={streamerNickname} keyword={keyword} onMessagesFiltered={handleMessagesFiltered} />
          )}
        </div>
      </div>
    </div>
  );
};

export default General;
