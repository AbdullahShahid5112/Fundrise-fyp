import React from 'react'
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
const HeroSection = () => {
  return (
      <div className="h-screen w-screen">
      <div className="flex h-full">
        {/* Left Section - 2/3 of the width */}
        <div className="sm:w-2/3 flex justify-center items-center">
          <div className="max-w-[700px] w-full text-center px-6">
            <p className="text-6xl sm:text-5xl font-bold py-4">
              FundRise
            </p>

            <TypeAnimation
              className="text-[#00df9a] text-5xl font-bold"
              sequence={[
                'Connect with Entrepreneurs',
                1000,
                'Connect with Investors',
                1000,
                'Connect with Trust',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />

            <p className="md:text-2xl text-xl font-bold text-gray-400 mt-6">
              Connect with Entrepreneurs, Investors, and Trusted Partners in Lahore.
              Build meaningful relationships and grow your network in a thriving
              community dedicated to innovation and success.
            </p>

            <Link to="/login">
              <button className="mt-8 bg-[#00df9a] w-2/3 rounded-full font-semibold py-3 text-black shadow-lg hover:shadow-xl hover:bg-[#00c488] transition-all duration-300 transform hover:scale-105 text-lg">
                <p>Get Started With Your Account</p>
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section - 1/3 of the width */}
        <div className="w-1/3 md:flex justify-center items-center hidden">
          <div className="w-[90%] text-center">
            <img
              src="23790661-removebg-preview.png"
              alt="My Image"
              className="w-[400px] h-auto mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection