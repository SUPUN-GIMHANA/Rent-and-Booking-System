import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/pages/footer';

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  date: string;
  author: string;
  image?: string;
  url: string; 
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Top 10 Tips for Renting Vehicles Safely",
    summary: "Learn how to rent cars, bikes, and vans securely and get the best experience using FindEasy.",
    date: "2025-09-21",
    author: "FindEasy Team",
    image: "images/blogimg1.jpg",
    url: "https://www.rentalcars.com/en/blog/top-tips/",
  },
  {
    id: 2,
    title: "How to Post Ads that Attract More Buyers",
    summary: "A complete guide for rental owners to make their listings stand out and attract more bookings.",
    date: "2025-09-15",
    author: "FindEasy Team",
    image: "images/blogimg2.jpeg",
    url: "https://blog.hubspot.com/marketing/write-effective-ads",
  },
  {
    id: 3,
    title: "Why Location Matters When Renting",
    summary: "Understand the importance of location-based search and how it helps you find the best rentals near you.",
    date: "2025-09-10",
    author: "FindEasy Team",
    image: "images/blogimg3.jpeg",
    url: "https://www.nar.realtor/blogs/how-location-affects-property-value",
  },
  {
    id: 4,
    title: "Essential Safety Checks Before Renting Any Vehicle",
    summary: "A checklist for renters to ensure safety and avoid unexpected issues while renting vehicles.",
    date: "2025-09-18",
    author: "FindEasy Team",
    image: "images/blogimg4.jpeg",
    url: "https://www.automobilemag.com/news/car-rental-safety-tips/",
  },
  {
    id: 5,
    title: "Maximizing Your Rental Income: Tips for Owners",
    summary: "How rental owners can optimize listings, pricing, and promotions to increase bookings.",
    date: "2025-09-12",
    author: "FindEasy Team",
    image: "images/blogimg5.jpeg",
    url: "https://www.entrepreneur.com/article/327632",
  },
  {
    id: 6,
    title: "The Future of Location-Based Rental Services",
    summary: "Exploring how technology is improving rental experiences through location awareness and AI.",
    date: "2025-09-08",
    author: "FindEasy Team",
    image: "images/blogimg6.jpeg",
    url: "https://www.forbes.com/sites/forbestechcouncil/2022/04/06/location-based-services-the-future-of-business/",
  },
];

export default function Blog() {
  const [currentLocation, setCurrentLocation] = useState('');

  const handleLocationSelectClick = () => {
    console.log('Location selection clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onLocationSelectClick={handleLocationSelectClick}
        onSearch={(q) => console.log('Search:', q)}
        currentLocation={currentLocation}
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">FindEasy Blog</h1>
          <p className="mt-4 text-gray-600 text-lg">
            Stay updated with the latest tips, guides, and news on rentals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              )}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.summary}</p>
                </div>
                <div className="flex justify-between items-center text-gray-500 text-sm mt-4">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => window.open(post.url, "_blank")}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
