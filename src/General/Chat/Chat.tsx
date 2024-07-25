import { useEffect, useState } from "react";
import Iframe from "react-iframe";

interface Message {
  messageId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
}

const getChannelAvatar = async (streamerName: string, senderName: string) => {
  try {
    const response = await fetch(`https://kick.com/api/v2/channels/${streamerName}/users/${senderName}`);
    const data = await response.json();
    return data.profile_pic || "https://dbxmjjzl5pc1g.cloudfront.net/9aba4794-aec9-4cff-9bf0-ae1a064ed665/images/user-profile-pic.png";
  } catch (error) {
    console.error("Error fetching user avatar:", error);
    return "https://dbxmjjzl5pc1g.cloudfront.net/9aba4794-aec9-4cff-9bf0-ae1a064ed665/images/user-profile-pic.png";
  }
};

export const Chat = ({ streamerNickname }: { streamerNickname: string }) => {
  const [channelId, setChannelId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchChannelId = async () => {
      try {
        const response = await fetch(`https://kick.com/api/v2/channels/${streamerNickname}/`);
        const data = await response.json();
        setChannelId(data.id);
      } catch (error) {
        console.error("Error fetching channel ID:", error);
      }
    };

    fetchChannelId();
  }, [streamerNickname]);

  useEffect(() => {
    if (channelId === null) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`https://kick.com/api/v2/channels/${channelId}/messages`);
        const data = await response.json();
        setMessages(data.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const interval = setInterval(fetchMessages, 2000);

    return () => clearInterval(interval);
  }, [channelId]);

  return (
    <div className="Chat max-h-[90%] w-[80%] overflow-auto">
      {messages.length > 0 && (
        <div className="flex flex-col gap-2">
          {messages.map((message: any) => (
            <div key={message.id} className="flex gap-2 bg-black/40 p-2">
              <p>{message.sender.username}</p>
              <p>{message.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
