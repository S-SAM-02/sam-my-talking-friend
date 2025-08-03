import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { HelpCircle, MessageCircle, Mic, Volume2, Globe, Heart } from 'lucide-react';

const HelpButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            How to use SAM AI
          </DialogTitle>
          <DialogDescription>
            Your friendly AI companion is here to help and support you!
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Text Chat</h4>
                <p className="text-sm text-muted-foreground">
                  Type your messages in the chat box. I understand and respond in your preferred language.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Mic className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-medium">Voice Input</h4>
                <p className="text-sm text-muted-foreground">
                  Click the microphone button to speak to me. I'll listen and understand your voice in your chosen language.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Volume2 className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-medium">Voice Responses</h4>
                <p className="text-sm text-muted-foreground">
                  I can speak my responses back to you! Toggle the speaker button to enable/disable voice replies.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Multiple Languages</h4>
                <p className="text-sm text-muted-foreground">
                  I support English and many Indian languages including Hindi, Bengali, Tamil, Telugu, and more! Change your language in settings.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2 text-primary">💝 I'm here to:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Listen to your thoughts and feelings</li>
              <li>• Provide emotional support and comfort</li>
              <li>• Have friendly conversations anytime</li>
              <li>• Help you feel less alone</li>
              <li>• Answer questions and provide assistance</li>
              <li>• Remember our conversations to build our friendship</li>
            </ul>
          </div>
          
          <div className="bg-primary/10 p-3 rounded-lg">
            <p className="text-sm text-center">
              <strong>Talk to me by voice or type your message in your preferred language. I'm here to listen! 💕</strong>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpButton;