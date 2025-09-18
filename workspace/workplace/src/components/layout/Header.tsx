import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { AuthDialog } from '@/pages/login-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Heart, MessageCircle, Bell, User, Settings, LogOut, Menu, MapPin, AmpersandIcon, BookDashed, LayoutDashboard, AlignCenter, MagnetIcon, ShieldAlertIcon, LogIn } from 'lucide-react';
interface HeaderProps {
  onLocationSelectClick: () => void;
  onSearch: (query: string) => void;
  currentLocation: string;
}

export default function Header({ onLocationSelectClick, onSearch, currentLocation }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => navigate('/')} // ✅ navigate to homepage
        >
          <h1 className="text-2xl font-bold text-primary">RentEasy</h1>
        </div>

        {/* Location Selector */}
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <Button
            variant="ghost"
            onClick={onLocationSelectClick}
            className="text-sm"
          >
            {currentLocation || 'Select Location'}
          </Button>

        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search for rentals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <MessageCircle className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  2
                </Badge>
              </Button>
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        john@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/Profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span> 
                    </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/Index1')}>
                      <LayoutDashboard className="mr-2 h-4 w-4" /> 
                      <span>Admin Panel</span>
                    </DropdownMenuItem>
                  <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> <span>Settings</span></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setLoginModalOpen(true)}>
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Login</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
                <DialogContent className="max-w-md p-0 sm:p-8 rounded-lg shadow-xl">
                  <div className="py-2">
                    <AuthDialog />
                  </div>
                </DialogContent>
              </Dialog>
            </>

          ) : (
            <div className="flex items-center space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost">Sign In</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md p-0 sm:p-8 rounded-lg shadow-xl">
                  <DialogHeader>
                    <DialogTitle className="text-center w-full">Login to your account</DialogTitle>
                  </DialogHeader>
                  <DialogClose asChild>
                    <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 focus:outline-none" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </DialogClose>
                  <div className="py-2">
                    <AuthDialog />
                  </div>
                </DialogContent>
              </Dialog>
              <Button>Sign Up</Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}