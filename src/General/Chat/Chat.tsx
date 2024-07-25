import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

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

        const messagesWithAvatars = await Promise.all(data.data.messages.map(async (message: any) => {
          // const avatar = await getChannelAvatar(streamerNickname, message.sender.username);
          const avatar = "https://dbxmjjzl5pc1g.cloudfront.net/9aba4794-aec9-4cff-9bf0-ae1a064ed665/images/user-profile-pic.png";

          return {
            messageId: message.id,
            authorName: message.sender.username,
            authorAvatar: avatar,
            content: message.content,
          };
        }));

        setMessages(messagesWithAvatars);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);

    return () => clearInterval(interval);
  }, [channelId]);

  return (
    <div className="Chat max-h-[90%] w-[80%] overflow-auto">
      {messages.length > 0 ? (
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div key={message.messageId} className="flex gap-2 bg-gray-800 p-2 rounded-xl">
              <img src={message.authorAvatar} alt={`${message.authorName}'s avatar`} className="w-8 h-8 rounded-full" />
              <p><b>{message.authorName}</b>: {message.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="!overflow-hidden flex justify-center">
          <Spinner label="Loading..." size="lg" color="default" />
        </div>
      )}
    </div>
  );
};
