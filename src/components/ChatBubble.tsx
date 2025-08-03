import { ReactNode } from 'react';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
  children?: ReactNode;
}

const ChatBubble = ({ message, isUser, timestamp, children }: ChatBubbleProps) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div 
          className={`
            px-4 py-3 rounded-2xl backdrop-blur-sm border
            ${isUser 
              ? 'chat-bubble-user text-white border-blue-400/20' 
              : 'chat-bubble-ai text-white border-purple-400/20'
            }
          `}
        >
          <p className="text-sm leading-relaxed">{message}</p>
          {children}
        </div>
        
        {timestamp && (
          <p className="text-xs text-muted-foreground mt-1 px-2">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;