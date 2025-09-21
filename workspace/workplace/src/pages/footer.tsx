import { useState } from 'react';
import BookingModal from '@/components/booking/BookingModal'
import { RentalItem } from '@/types/rental';
import { BookingData } from '@/types/booking';
import { FaFacebookF, FaTwitter, FaTiktok, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
    const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);

const handleConfirmBooking = (bookingData: BookingData) => {
    console.log('Booking confirmed:', bookingData);
    setSelectedItem(null);
};

return (
    <div  className="bg-gray-900 text-gray-100 w-full">
      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Renting?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers who trust RentEasy
          </p>
          <footer className="bg-gray-0 border-t mt-16">
            <div className="container mx-auto px-6 py-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 text-sm text-gray-700">
                
                {/* More from RentEasy */}
                <div  className="text-left  text-gray-100">
                  <h3 className="font-semibold text-base mb-4">More from RentEasy</h3>
                  <ul className="space-y-2">
                    <li><Link to="/sell-fast">Sell Fast</Link></li>
                    <li><Link to="/Membership">Membership</Link></li>
                    <li><a href="/commercial-ads">Commercial Ads</a></li>
                    <li><a href="/boost-advertisement">Boost Ad</a></li>
                  </ul>
                </div>

                {/* Help & Support */}
                <div className="text-left text-gray-100">
                  <h3 className="font-semibold mb-4 text-base ">Help & Support</h3>
                  <ul className="space-y-2 ">
                    <li><a href="/Faq">FAQ</a></li>
                    <li><a href="/Stay">Stay Safe</a></li>
                    <li><a href="/Contact">Contact Us</a></li>
                  </ul>
                </div>

                {/* About */}
                <div className="text-left text-gray-100">
                  <h3 className="font-semibold mb-4 text-base">About RentEasy</h3>
                  <ul className="space-y-2">
                    <li><a href="/AboutUs">About Us</a></li>
                    <li><a href="/Conditions">Terms & Conditions</a></li>
                    <li><a href="/Privacy">Privacy Policy</a></li>
                    <li><a href="/Sitemap">Sitemap</a></li>
                  </ul>
                </div>

                {/* Blog & Guides */}
                <div className="text-left text-gray-100">
                  <h3 className="font-semibold mb-4 text-base">Blog & Guides</h3>
                  <ul className="space-y-2">
                    <li><a href="#">MotorGuide</a></li>
                    <li><a href="#">PropertyGuide</a></li>
                    <li><a href="/Blog">Official Blog</a></li>
                  </ul>
                  <div className="flex space-x-4 mt-4 text-lg">
                    <a href="#"><FaFacebookF /></a>
                    <a href="#"><FaTwitter /></a>
                    <a href="#"><FaTiktok /></a>
                    <a href="#"><FaYoutube /></a>
                  </div>
                </div>

                {/* App Download */}
                <div className="text-left text-gray-100">
                  <h3 className="font-semibold mb-4 text-base">Download our app</h3>
                  <div className="flex flex-col space-y-3">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Google Play"
                      className="h-10 cursor-pointer"
                    />
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="App Store"
                      className="h-10 cursor-pointer"
                    />
                  </div>
                  <h3 className="font-semibold mt-6 mb-2">Other countries</h3>
                  <a href="#" className="flex items-center gap-2">
                    <span className="h-3 w-3 bg-green-600 rounded-full"></span> India
                  </a>
                </div>
              </div>
            </div>

      {/* Bottom line */}
      <div className="border-t text-center py-4 text-xs text-gray-500">
        © 2025. All rights reserved. RentEasy Technologies
      </div>
    </footer>

        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
}