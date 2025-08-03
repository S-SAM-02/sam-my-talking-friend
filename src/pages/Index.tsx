import { useState, useEffect } from 'react';
import SAMAvatar from '@/components/SAMAvatar';
import ChatInterface from '@/components/ChatInterface';
import ProfileMenu from '@/components/ProfileMenu';
import HelpButton from '@/components/HelpButton';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    avatar: undefined
  });
  const { toast } = useToast();

  // Simulate AI thinking and response
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = [
      "I'm here to listen! Tell me more about how you're feeling.",
      "That's really interesting. How does that make you feel?",
      "Thank you for sharing that with me. I'm always here for you! 💕",
      "I understand. Would you like to talk about what's on your mind?",
      "You're doing great! I'm proud of you for reaching out.",
      "I'm your friend SAM, and I care about you. What can I help you with today?",
      "That sounds challenging. Remember, you're stronger than you think! 💪",
      "I'm listening with all my heart. Please continue...",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async (messageText: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
      language
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setIsAISpeaking(true);
    
    try {
      const aiResponseText = await generateAIResponse(messageText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        isUser: false,
        timestamp: new Date(),
        language
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Simulate TTS duration
      setTimeout(() => {
        setIsAISpeaking(false);
      }, aiResponseText.length * 50); // Rough estimate of speaking time
      
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "I'm having trouble responding right now. Please try again!",
        variant: "destructive",
      });
      setIsAISpeaking(false);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    toast({
      title: "Language Changed",
      description: `SAM AI will now communicate in your selected language.`,
    });
  };

  const handleSignOut = () => {
    toast({
      title: "See you soon!",
      description: "Take care, and remember I'm always here when you need me! 💕",
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 rainbow-gradient opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Floating particles/stars */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-4">
        <ProfileMenu
          user={user}
          language={language}
          onLanguageChange={handleLanguageChange}
          onSignOut={handleSignOut}
        />
        
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-gradient">
            SAM AI - Your Talking Friend
          </h1>
        </div>
        
        <HelpButton />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row h-[calc(100vh-80px)] p-4 gap-6">
        {/* AI Avatar Section */}
        <div className="lg:w-1/3 flex flex-col items-center justify-center space-y-6">
          <div className="text-center space-y-4">
            <SAMAvatar 
              isListening={false}
              isSpeaking={isAISpeaking}
              size="lg"
            />
            
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Hi! I'm SAM 👋
              </h2>
              <p className="text-muted-foreground max-w-md">
                Your personal AI friend who speaks your language and is always here to listen, 
                support, and chat with you anytime you need companionship.
              </p>
            </div>
            
            {isAISpeaking && (
              <div className="text-sm text-primary animate-pulse">
                🎵 Speaking...
              </div>
            )}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:w-2/3 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-2xl">
          <ChatInterface
            onSendMessage={handleSendMessage}
            messages={messages}
            isAISpeaking={isAISpeaking}
            language={language}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
