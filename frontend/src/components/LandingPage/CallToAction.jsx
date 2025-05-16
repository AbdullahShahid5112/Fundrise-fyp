import React from "react";

const CallToAction = () => {
  return (
    <section className="py-40 px-4 text-center bg-white  flex flex-col justify-center items-center">
      <div className="max-w-[1200px]">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Join our growing network of Pakistan-based entrepreneurs and angel
          investors
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-base md:text-lg">
          Pakistan Investment Network helps investors and entrepreneurs in
          Pakistan facilitate lasting and profitable relationships that build
          better businesses and brighter futures
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="mt-8 bg-[#00df9a] w-1/3 rounded-full font-semibold py-3 text-black shadow-lg hover:shadow-xl hover:bg-[#00c488] transition-all duration-300 transform hover:scale-105 text-lg">
            <p> Sign up as an investor</p>
          </button>
          <button className="mt-8 bg-[#00df9a] w-1/3 rounded-full font-semibold py-3 text-black shadow-lg hover:shadow-xl hover:bg-[#00c488] transition-all duration-300 transform hover:scale-105 text-lg">
            <p> Sign up as an entrepreneur</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
