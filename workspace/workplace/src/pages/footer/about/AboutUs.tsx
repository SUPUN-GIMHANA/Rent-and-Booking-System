import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import Footer from "@/pages/footer";
import { FaUsers, FaBullseye, FaCheckCircle, FaHandshake } from "react-icons/fa";
import aboutus from "/images/aboutus.jpeg";
import { AuthDialog } from "@/pages/login-form";

export default function About() {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState("");
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [authOpen, setAuthOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLocationSelectClick = () => {
    setMapOpen(true);
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setSelectedPosition({ lat, lng });
    }
  };

  const confirmLocation = () => {
    if (selectedPosition) {
      setCurrentLocation(`${selectedPosition.lat.toFixed(5)}, ${selectedPosition.lng.toFixed(5)}`);
    }
    setMapOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header with location selector */}
      <Header
        onLocationSelectClick={handleLocationSelectClick}
        onSearch={(q) => console.log("Search:", q)}
        currentLocation={currentLocation}
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 text-center">
        <h1 className="text-4xl font-extrabold mb-4">About FindEasy</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-100">
          Connecting people with trusted services, anytime, anywhere.
        </p>
      </section>

      {/* About Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src={aboutus}
            className="rounded-2xl shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Who We Are</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We’re a passionate team of innovators, developers, and problem-solvers 
            committed to making everyday life easier. With backgrounds in technology 
            and community engagement, our mission is to empower both customers and 
            service providers through a transparent, user-friendly marketplace.
          </p>
        </div>
      </div>

      {/* Mission & Why Choose Us */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-semibold mb-4">
              <FaBullseye className="text-indigo-600" /> Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To connect people with the right services at the right time while ensuring 
              fair opportunities for providers. We aim to build trust, promote reliability, 
              and make service discovery effortless for everyone.
            </p>
          </div>
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-semibold mb-4">
              <FaCheckCircle className="text-green-600" /> Why Choose Us?
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li>✔ Verified and trustworthy service providers</li>
              <li>✔ Easy-to-use search and booking system</li>
              <li>✔ Transparent reviews and ratings</li>
              <li>✔ 24/7 customer support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Join Us */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="flex justify-center items-center gap-3 text-3xl font-bold mb-6 text-gray-800">
          <FaHandshake className="text-purple-600" /> Join Us
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Whether you’re looking for help or offering your expertise, 
          <span className="font-semibold"> FindEasy </span> is here to make 
          the connection. Together, let’s create a community where trust, 
          quality, and convenience go hand in hand.
        </p>
        <Button size="lg" onClick={() => setLoginModalOpen(true)}> Get Started</Button>
        <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
                <DialogContent className="max-w-md p-0 sm:p-8 rounded-lg shadow-xl">
                  <div className="py-2">
                    <AuthDialog open={authOpen} setOpen={setAuthOpen}/>
                  </div>
                </DialogContent>
              </Dialog>
      </div>
      
      {/* Location Dialog */}
      <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Select a Location</DialogTitle>
          </DialogHeader>
          <div className="h-[400px] w-full">
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={selectedPosition || { lat: 6.9271, lng: 79.8612 }}
                zoom={10}
                onClick={handleMapClick}
              >
                {selectedPosition && <Marker position={selectedPosition} />}
              </GoogleMap>
            </LoadScript>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setMapOpen(false)}>Cancel</Button>
            <Button onClick={confirmLocation} disabled={!selectedPosition}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Footer />
    </div>
  );
}
