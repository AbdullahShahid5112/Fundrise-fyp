import React from 'react';
import { MapPin } from 'lucide-react';

const Investor1 = () => {
  const investors = [
    {
      id: 1,
      name: "Joel S.",
      location: "Feusisberg, Switzerland",
      investmentRange: "Rs 3,100,000 - Rs 311,000,000",
      description: "Founder, Chairman and CEO of a Swiss-based company that improves people's lives through effortless and effective oral care products.",
      areasOfExpertise: "After numerous years supporting and financing start-ups, I've gained a deep understanding of the unique challenges young companies face.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    {
      id: 2,
      name: "Nivethithan T.",
      location: "London, United Kingdom",
      investmentRange: "Rs 400 - Rs 1,753,000,000",
      description: "Project Manager",
      areasOfExpertise: "Professional experience - Civil Engineering, Project Management, Systems Engineering, Construction",
      expandingAreas: "Expanding areas - Software / AI",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    {
      id: 3,
      name: "Jeffrey H.",
      location: "Chicago, United States",
      investmentRange: "Rs 300 - Rs 28,000,000",
      description: "I am a seasoned cybersecurity professional with a robust foundation in both offensive and defensive security strategies. Currently serving as a Manager at Mandiant (a...",
      areasOfExpertise: "My expertise encompasses a broad spectrum of security domains, including penetration testing, threat intelligence, and incident response.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    {
      id: 1,
      name: "Joel S.",
      location: "Feusisberg, Switzerland",
      investmentRange: "Rs 3,100,000 - Rs 311,000,000",
      description: "Founder, Chairman and CEO of a Swiss-based company that improves people's lives through effortless and effective oral care products.",
      areasOfExpertise: "After numerous years supporting and financing start-ups, I've gained a deep understanding of the unique challenges young companies face.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    {
      id: 2,
      name: "Nivethithan T.",
      location: "London, United Kingdom",
      investmentRange: "Rs 400 - Rs 1,753,000,000",
      description: "Project Manager",
      areasOfExpertise: "Professional experience - Civil Engineering, Project Management, Systems Engineering, Construction",
      expandingAreas: "Expanding areas - Software / AI",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    {
      id: 3,
      name: "Jeffrey H.",
      location: "Chicago, United States",
      investmentRange: "Rs 300 - Rs 28,000,000",
      description: "I am a seasoned cybersecurity professional with a robust foundation in both offensive and defensive security strategies. Currently serving as a Manager at Mandiant (a...",
      areasOfExpertise: "My expertise encompasses a broad spectrum of security domains, including penetration testing, threat intelligence, and incident response.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    
   
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header Section */}
      <div className="bg-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          

          {/* Title and Description */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Find Angel Investors in Pakistan & Worldwide
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              How do I connect with angel investors? To meet investors in{" "}
              <span className="text-blue-600">Pakistan</span> and{" "}
              <span className="text-blue-600">Internationally</span>, you just need to add a pitch using our easy-to-follow template. 
              It's really simple and investors all around the world are waiting to view your idea.
            </p>
          </div>
        </div>
      </div>

      {/* Investors Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investors.map((investor) => (
            <div key={investor.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              {/* Investor Header */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={investor.avatar}
                  alt={investor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{investor.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {investor.location}
                  </div>
                </div>
              </div>

              {/* Investment Range */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Investment Range</h4>
                <p className="text-lg font-semibold text-gray-800">{investor.investmentRange}</p>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className="text-gray-600 text-sm leading-relaxed">{investor.description}</p>
              </div>

              {/* Areas of Expertise */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Areas of Expertise</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{investor.areasOfExpertise}</p>
                {investor.expandingAreas && (
                  <p className="text-gray-600 text-sm leading-relaxed mt-2">{investor.expandingAreas}</p>
                )}
              </div>

              {/* More Details Button */}
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                More details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Investor1;