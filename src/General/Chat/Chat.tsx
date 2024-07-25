import { Spinner } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";

interface Message {
  messageId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
}

const defaultAvatar = "https://dbxmjjzl5pc1g.cloudfront.net/9aba4794-aec9-4cff-9bf0-ae1a064ed665/images/user-profile-pic.png";

const getChannelAvatar = async (streamerName: string, senderName: string, avatarCache: Record<string, string>) => {
  if (avatarCache[senderName]) {
    return avatarCache[senderName];
  }

  try {
    const response = await fetch(`https://kick.com/api/v2/channels/${streamerName}/users/${senderName}`);
    const data = await response.json();
    const avatar = data.profile_pic || defaultAvatar;
    avatarCache[senderName] = avatar;
    return avatar;
  } catch (error) {
    console.error("Error fetching user avatar:", error);
    return defaultAvatar;
  }
};

export const Chat = ({ streamerNickname }: { streamerNickname: string }) => {
  const [channelId, setChannelId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const avatarCache = useRef<Record<string, string>>({}).current;

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

        const messagesWithAvatars = await Promise.all(
          data.data.messages.map(async (message: any) => {
            const avatar = await getChannelAvatar(streamerNickname, message.sender.username, avatarCache);

            return {
              messageId: message.id,
              authorName: message.sender.username,
              authorAvatar: avatar,
              content: message.content.replace(/\[emote:\d+:\w+\]/g, " [emoji] "), // Replace emote with '(emoji)'
            };
          })
        );

        setMessages(messagesWithAvatars.reverse());
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);

    return () => clearInterval(interval);
  }, [channelId, streamerNickname, avatarCache]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer && isAtBottom) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, isAtBottom]);

  const handleScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const atBottom = chatContainer.scrollHeight - chatContainer.scrollTop === chatContainer.clientHeight;
      setIsAtBottom(atBottom);
    }
  };

  return (
    <div className="Chat max-h-[90%] w-[80%] overflow-auto" ref={chatContainerRef} onScroll={handleScroll}>
      {messages.length > 0 ? (
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div key={message.messageId} className="User flex gap-2 bg-gray-800 p-2 rounded-xl">
              <img src={message.authorAvatar} alt={`${message.authorName}'s avatar`} className="w-8 h-8 rounded-full" />
              <p>
                <b>{message.authorName === streamerNickname ? <span className="text-yellow-500">{message.authorName}</span> : message.authorName}</b>: {message.content}
              </p>
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
