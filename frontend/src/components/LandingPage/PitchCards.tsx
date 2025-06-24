import axios from "axios";
import api from "../../api/axios";
import React, { useEffect, useState } from "react";

const PitchCards = () => {
    const cardData = [
  {
    tag: "Pro",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    logo: "/pitchcards/logo1.jpg",
    title: "Next-Gen Energy Now",
    location: "Balochistan, Pakistan",
    description:
      "Mekran Energy delivers affordable, modular solar solutions to underserved communities in Pakistan. With a local-first approach, strong margins, and scalable tech, we empower homes, farms, and businesses while building a future-proof energy brand.",
    points: [
      "Raising Rs. 50M to launch solar energy pilot systems",
      "For every 100 Rs earned, we give 1 Rs back in clean energy to the community",
      "Early-mover advantage in underserved Mekran region and Balochistan",
    ],
    total: "Rs 50,000,000",
    min: "Rs 1,000,000",
  },
  {
    tag: "Executive",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    logo: "/pitchcards/logo2.png",
    title: "Tangle",
    location: "West, United States",
    description:
      'Emoji domain as cache claim, the user can cache an image symbolized as, for example, "dog", then another user claims the "dog" to complete the process.',
    points: [
      "All emoji .st island flags, includes 150 countries",
      "All emoji .st colors for square and circle, red, orange, yellow, etc.",
      "Island theme with eyot.io and domain shortener, xn.at, with WHOIS and TXT",
    ],
    total: "Rs 139,000,000",
    min: "Rs 5,600,000",
  },
  {
    tag: "Executive",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    logo: "/pitchcards/logo3.jpg",
    title: "E.L.V. Denim",
    location: "London, United Kingdom",
    description:
      "We expertly upcycle virtually any material – from denim and cotton bedsheets to blazers, shirts, and leather furniture offcuts – creating beautiful, handcrafted luxury pieces at scale in East London.",
    points: [
      "30 Worldwide stockists including Bergdorf Goodman, Liberty, Tootsies",
      "Average annual revenue £420k over 3 years.",
      "First ever 100% upcycled brand at London Fashion Week Schedule (Feb 2025)",
    ],
    total: "Rs 351,000,000",
    min: "Rs 3,500,000",
  },
  {
    tag: "Pro",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    logo: "/pitchcards/logo1.jpg",
    title: "Next-Gen Energy Now",
    location: "Balochistan, Pakistan",
    description:
      "Mekran Energy delivers affordable, modular solar solutions to underserved communities in Pakistan. With a local-first approach, strong margins, and scalable tech, we empower homes, farms, and businesses while building a future-proof energy brand.",
    points: [
      "Raising Rs. 50M to launch solar energy pilot systems",
      "For every 100 Rs earned, we give 1 Rs back in clean energy to the community",
      "Early-mover advantage in underserved Mekran region and Balochistan",
    ],
    total: "Rs 50,000,000",
    min: "Rs 1,000,000",
  },
  {
    tag: "Executive",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    logo: "/pitchcards/logo2.png",
    title: "Tangle",
    location: "West, United States",
    description:
      'Emoji domain as cache claim, the user can cache an image symbolized as, for example, "dog", then another user claims the "dog" to complete the process.',
    points: [
      "All emoji .st island flags, includes 150 countries",
      "All emoji .st colors for square and circle, red, orange, yellow, etc.",
      "Island theme with eyot.io and domain shortener, xn.at, with WHOIS and TXT",
    ],
    total: "Rs 139,000,000",
    min: "Rs 5,600,000",
  },
  {
    tag: "Executive",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    logo: "/pitchcards/logo3.jpg",
    title: "E.L.V. Denim",
    location: "London, United Kingdom",
    description:
      "We expertly upcycle virtually any material – from denim and cotton bedsheets to blazers, shirts, and leather furniture offcuts – creating beautiful, handcrafted luxury pieces at scale in East London.",
    points: [
      "30 Worldwide stockists including Bergdorf Goodman, Liberty, Tootsies",
      "Average annual revenue £420k over 3 years.",
      "First ever 100% upcycled brand at London Fashion Week Schedule (Feb 2025)",
    ],
    total: "Rs 351,000,000",
    min: "Rs 3,500,000",
  },
];
 const [pitchData, setPitchData] = useState(null);
 console.log("🚀 ~ PitchCards ~ pitchData:", pitchData)

  useEffect(() => {
  const fetchPitch = async () => {
    try {
      const res = await api.get("/api/pitch/info"); // ✅ use your axios instance
      setPitchData(res.data.pitches);
    } catch (error) {
      console.error("Error fetching pitch:", error.message);
    }
  };

  fetchPitch();
}, []);
  return (
   <div className="bg-white py-16 px-4 text-center flex justify-center items-center flex-col">
      <h2 className="text-3xl font-bold text-[#00df9a] mb-2">
        Looking for Pakistani investment opportunities?
      </h2>
      <p className="text-gray-400  font-semibold mb-10">
        Browse our latest startup pitches from around Pakistan and connect with
        entrepreneurs
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-[1200px]">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl shadow hover:shadow-lg transition duration-300 relative overflow-hidden"
          >
            <div className="relative">
              <img src={card.image} alt={card.title} className="w-full h-40 object-cover" />
              <span className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-xs font-semibold rounded-bl-xl">
                {card.tag}
              </span>
              <img
                src={card.logo}
                alt="logo"
                className="w-24 h-24 rounded-lg absolute top-3 left-3"
              />
            </div>
            <div className="p-5 text-left">
              <h3 className="text-lg font-semibold text-black">{card.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-3">
                {/* <FaMapMarkerAlt className="mr-1" /> */}
                {card.location}
              </div>
              <p className="text-gray-700 text-sm mb-3">{card.description}</p>
              <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
                {card.points.map((point, i) => (
                  <li key={i} className="mb-1">{point}</li>
                ))}
              </ul>
              <div className="flex justify-between items-center font-semibold text-sm mb-4">
                <div>
                  <div className="text-gray-700">Total Required</div>
                  
                  <div className="text-gray-700">{card.total}</div>
                </div>
                <div>
                  <div className="text-gray-700">Min per Investor</div>
                  <div className="text-gray-700">{card.min}</div>
                </div>
              </div>
              <button className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-200">
                Find out more
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PitchCards;
