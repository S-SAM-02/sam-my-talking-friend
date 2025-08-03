import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react';
import ChatBubble from './ChatBubble';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language: string;
}

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  messages: Message[];
  isAISpeaking: boolean;
  language: string;
}

const ChatInterface = ({ onSendMessage, messages, isAISpeaking, language }: ChatInterfaceProps) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceRecording = async () => {
    if (!isListening) {
      try {
        // Request microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop()); // Stop immediately, just checking permissions
        
        setIsListening(true);
        toast({
          title: "Listening...",
          description: "Speak now, I'm listening!",
        });
        
        // Here you would integrate with speech recognition API
        // For now, simulate listening for 3 seconds
        setTimeout(() => {
          setIsListening(false);
          toast({
            title: "Voice input received",
            description: "Processing your message...",
          });
        }, 3000);
        
      } catch (error) {
        toast({
          title: "Microphone access denied",
          description: "Please allow microphone access to use voice input.",
          variant: "destructive",
        });
      }
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <p className="text-lg mb-2">👋 Hi! I'm SAM AI</p>
              <p>Your friendly AI companion. How can I help you today?</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Button
            variant={isListening ? "default" : "outline"}
            size="icon"
            onClick={toggleVoiceRecording}
            className={`${isListening ? 'animate-pulse bg-red-500 hover:bg-red-600' : ''}`}
          >
            {isListening ? <MicOff /> : <Mic />}
          </Button>

          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Type your message in ${language}...`}
            className="flex-1 bg-background/50 backdrop-blur-sm border-border/50"
            disabled={isListening}
          />

          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isListening}
            size="icon"
          >
            <Send />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            title={isVoiceEnabled ? "Disable voice responses" : "Enable voice responses"}
          >
            {isVoiceEnabled ? <Volume2 /> : <VolumeX />}
          </Button>
        </div>
        
        {isListening && (
          <div className="mt-2 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Listening... Speak now
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;