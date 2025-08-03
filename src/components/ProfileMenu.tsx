import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Settings, LogOut, Globe, Heart } from 'lucide-react';

interface ProfileMenuProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  language: string;
  onLanguageChange: (language: string) => void;
  onSignOut: () => void;
}

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇧🇩' },
  { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
];

const ProfileMenu = ({ user, language, onLanguageChange, onSignOut }: ProfileMenuProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.name?.charAt(0) || <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.name || 'Guest User'}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email || 'guest@example.com'}
              </p>
            </div>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="cursor-pointer">
            <Globe className="mr-2 h-4 w-4" />
            <span>{currentLanguage.flag} {currentLanguage.name}</span>
          </DropdownMenuItem>
          
          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  SAM AI Settings
                </DialogTitle>
                <DialogDescription>
                  Customize your AI companion experience
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="language" className="text-right">
                    Language
                  </Label>
                  <div className="col-span-3">
                    <Select value={language} onValueChange={onLanguageChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUPPORTED_LANGUAGES.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            <span className="flex items-center gap-2">
                              {lang.flag} {lang.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={onSignOut} className="cursor-pointer text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileMenu;