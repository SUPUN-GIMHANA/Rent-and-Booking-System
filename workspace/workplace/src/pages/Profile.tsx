import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock, ShoppingBag, Heart, Upload, Trash2 } from "lucide-react";
import RentalCard from "@/components/rental/RentalCard";
import Header from "@/components/layout/Header";
import { mockRentalItems } from "@/data/mockData";

export default function ProfilePage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@email.com");
  const [mobile, setMobile] = useState("+1 234 567 890");
  const [currentLocation, setCurrentLocation] = useState("Colombo, Sri Lanka");
  const [birthday, setBirthday] = useState("1990-01-01");
  const [gender, setGender] = useState("Male");
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const mockUserImage = "/mock-user.png";

  const handleSaveProfile = () => {
    console.log({ name, email, mobile, birthday, gender, currentLocation });
    setIsEditing(false);
  };

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileRemove = () => setProfilePic(null);

  return (
    <div>
      <Header
        onLocationSelectClick={() => console.log("Location selector clicked")}
        onSearch={(query) => console.log("Search query:", query)}
        currentLocation={currentLocation}
      />

      <div className="min-h-screen bg-muted/30 py-10">
        <div className="container mx-auto px-4 grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-1 shadow-lg">
            <CardHeader className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="h-24 w-24 mb-3">
                  <AvatarImage src={profilePic || mockUserImage} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 right-0 flex gap-2">
                  <label className="cursor-pointer p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                    <Upload className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleProfileRemove}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <CardTitle className="text-xl">{name}</CardTitle>
              <p className="text-muted-foreground text-sm">{email}</p>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded ${
                    !isEditing ? "bg-gray-100" : "bg-white"
                  }`}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded ${
                    !isEditing ? "bg-gray-100" : "bg-white"
                  }`}
                />
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Mobile Number"
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded ${
                    !isEditing ? "bg-gray-100" : "bg-white"
                  }`}
                />
                <input
                  type="text"
                  value={currentLocation}
                  placeholder="Location"
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded ${
                    !isEditing ? "bg-gray-100" : "bg-white"
                  }`}
                />

                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded ${!isEditing ? "bg-gray-100" : "bg-white"}`}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <div className="flex gap-2 mt-2">
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    disabled={isEditing}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSaveProfile}
                    disabled={!isEditing}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

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

                <TabsContent value="password">
                  <form className="space-y-3 max-w-md">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full p-2 border rounded"
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
