import { useEffect, useState } from "react";
import Iframe from "react-iframe";

interface Message {
  messageId: string;
  authorName: string;
  content: string;
}

const getChannelAvatar = (channelId: string) => {
  fetch(`https://kick.com/api/v2/channels/${channelId}/`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

getChannelAvatar("EnduroDBK");

export const Chat = ({ streamerNickname }: { streamerNickname: string }) => {
  const [channelId, setChannelId] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch(`https://kick.com/api/v2/channels/${streamerNickname}/`)
      .then((response) => response.json())
      .then((data) => {
        setChannelId(data.id);
      });
  }, [streamerNickname]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (channelId !== 0) {
  //       fetch(`https://kick.com/api/v2/channels/${channelId}/messages`)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           // data.data.messages.forEach((message: any) => {
  //           //   setMessages((prevMessages) => [...prevMessages, {
  //           //     messageId: message.id,
  //           //     authorName: message.sender.username,
  //           //     content: message.content
  //           //   }]);
  //           // });

  //           console.log(data);
  //         });
  //     }
  //   }, 2500);

  //   return () => clearInterval(interval);
  // }, [channelId]);

  return (
    <div className="Chat flex w-[100%] justify-center">
      {messages.length > 0 ? (
        <div className="w-[100%] h-[100%] flex flex-col gap-2">
          {messages.map((message) => (
            <div key={message.messageId} className="flex gap-2">
              <p>{message.authorName}</p>
              <p>{message.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}