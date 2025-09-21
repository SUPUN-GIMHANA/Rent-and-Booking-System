import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RentalListing from './pages/RentalListing';
import NotFound from './pages/NotFound';
import Index1 from './pages/Index1';
import ManageItems from './pages/ManageItems';
import AddAdvertisement from './pages/AddAdvertisement';
import BoostAdvertisement from './pages/BoostAdvertisement';
import CommercialAds from './pages/CommercialAds';
import Analytics from './pages/Analytics';
import Comments from './pages/Comments';
import Index from './pages/Index1';
import { AuthDialog } from './pages/login-form';
import Profile from './pages/Profile';
import SellFastPage from './pages/footer/more/SellFastPage';
import Membership from './pages/footer/more/Membership';
import Footer from './pages/footer';
import Faq from './pages/footer/help/Faq';
import Stay from './pages/footer/help/Stay';
import Contact from './pages/footer/help/Contact';
import AboutUs from './pages/footer/about/AboutUs';
import Conditions from './pages/footer/about/Conditions';
import Privacy from './pages/footer/about/Privacy';
import Sitemap from './pages/footer/about/Sitemap';
import Blog from './pages/footer/blog/Blog';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<RentalListing />} />
          <Route path="/Index" element={<Index />} />
          <Route path="/Index1" element={<Index1 />} /> {/* ✅ new route */}
          <Route path="/manage-items" element={<ManageItems />} />
          <Route path="/add-advertisement" element={<AddAdvertisement />} />
          <Route path="/boost-advertisement" element={<BoostAdvertisement />} />
          <Route path="/commercial-ads" element={<CommercialAds />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/RentalListing" element={<RentalListing />} />
          <Route path="/login-form" element={<AuthDialog open={true} setOpen={() => {}} />}/>
          <Route path="/Profile" element={<Profile />} />
          {/* <Route path="/Signup-form" element={<SignupForm />} /> */}
          <Route path="/sell-fast" element={<SellFastPage />} />
          <Route path="/Membership" element={<Membership />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/Stay" element={<Stay />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Conditions" element={<Conditions />} />
          <Route path="/Privacy" element={<Privacy />} />
          <Route path="/Sitemap" element={<Sitemap />} />
          <Route path="/Blog" element={<Blog />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
