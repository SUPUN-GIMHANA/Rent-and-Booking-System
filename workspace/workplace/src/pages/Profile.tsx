import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock, ShoppingBag, Heart } from "lucide-react";
import RentalCard from "@/components/rental/RentalCard";
import  Header from "@/components/layout/Header";
import { mockRentalItems } from "@/data/mockData"; 

export default function ProfilePage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@email.com");
  const [mobile, setMobile] = useState("+1 234 567 890");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentLocation, setCurrentLocation] = useState("Colombo, Sri Lanka");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, mobile });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ currentPassword, newPassword, confirmPassword });
  };
  const handleLocationSelectClick = () => {
    console.log("Location selector clicked");
  };
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };
  
  return (   
    <div> 
    <Header
      onLocationSelectClick={handleLocationSelectClick}
      onSearch={handleSearch}
      currentLocation={currentLocation}
    />
    <div className="min-h-screen bg-muted/30 py-10">
      <div className="container mx-auto px-4 grid gap-8 md:grid-cols-3">
        {/* Left Column - Profile Info */}
        <Card className="md:col-span-1 shadow-lg">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-3">
              <AvatarImage src="" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">{name}</CardTitle>
            <p className="text-muted-foreground text-sm">{email}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
              />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <Input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number"
              />
              <Button type="submit" className="w-full mt-2">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right Column - Tabs */}
        <Card className="md:col-span-2 shadow-lg">
          <CardContent>
            <Tabs defaultValue="orders">
              <TabsList className="mb-6">
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" /> My Orders
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Wishlist
                </TabsTrigger>
                <TabsTrigger value="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Change Password
                </TabsTrigger>
              </TabsList>

              {/* Orders */}
              <TabsContent value="orders" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockRentalItems.slice(0, 2).map((item) => (
                  <RentalCard
                    key={item.id}
                    item={item}
                    onBookNow={() => console.log("Book", item.id)}
                    onToggleFavorite={() => console.log("Fav", item.id)}
                    onContact={() => console.log("Contact", item.owner)}
                    isFavorite={false}
                  />
                ))}
              </TabsContent>

              {/* Wishlist */}
              <TabsContent value="wishlist" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockRentalItems.slice(2, 4).map((item) => (
                  <RentalCard
                    key={item.id}
                    item={item}
                    onBookNow={() => console.log("Book", item.id)}
                    onToggleFavorite={() => console.log("Fav", item.id)}
                    onContact={() => console.log("Contact", item.owner)}
                    isFavorite={true}
                  />
                ))}
              </TabsContent>

              {/* Change Password */}
              <TabsContent value="password">
                <form onSubmit={handleChangePassword} className="space-y-3 max-w-md">
                  <Input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button type="submit" className="w-full">
                    Update Password
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}
