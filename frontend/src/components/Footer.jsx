
import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram, FaBloggerB } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0d121c] text-white py-10 px-6 md:px-20">
      {/* Top section: Logo and Icons */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-8">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 w-60 h-60">
                  <img src="/logo-removebg.png" alt="main-logo"   />
            <div>
             
            </div>
          </div>
          {/* Verified Badge */}
        </div>
        {/* Social Icons */}
        <div className="flex space-x-4 mt-6 md:mt-0">
          <FaLinkedin className="w-9 h-9 bg-gray-800 p-2 rounded-full hover:text-blue-400" />
          <FaFacebook className="w-9 h-9 bg-gray-800 p-2 rounded-full hover:text-blue-500" />
          <FaTwitter className="w-9 h-9 bg-gray-800 p-2 rounded-full hover:text-blue-300" />
          <FaInstagram className="w-9 h-9 bg-gray-800 p-2 rounded-full hover:text-pink-400" />
          <FaBloggerB className="w-9 h-9 bg-gray-800 p-2 rounded-full hover:text-yellow-500" />
        </div>
      </div>

      {/* Bottom links */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10 text-sm">
        {/* Latest Blogs */}
        <div>
          <h3 className="font-bold mb-3">Latest Blogs</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Behind The Raise with Aura Funerals</li>
            <li>Insurtech firm Loxa secures £125,000...</li>
            <li>The Angel Investor’s playbook...</li>
            <li>Behind The Raise with LAT Water</li>
            <li>Taking charge of your mental health...</li>
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-bold mb-3">Navigation</h3>
          <ul className="space-y-2 text-gray-300">
            <li>How It Works</li>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Testimonials</li>
            <li>Funded Companies</li>
            <li>Company Info</li>
            <li>Partner Programme</li>
            <li>Refer a Friend</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Entrepreneur Pages */}
        <div>
          <h3 className="font-bold mb-3">Entrepreneur Pages</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Add a Pitch</li>
            <li>Rates</li>
            <li>Entrepreneur FAQs</li>
          </ul>
        </div>

        {/* Investor Pages */}
        <div>
          <h3 className="font-bold mb-3">Investor Pages</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Register</li>
            <li>Business Proposal</li>
            <li>Investor FAQs</li>
            <li>Investor App</li>
            <li>BrickTribe - Property Investments</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
