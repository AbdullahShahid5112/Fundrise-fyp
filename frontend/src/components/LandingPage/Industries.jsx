import React from 'react'

const Industries = () => {

    
  const industries = [
    { label: "Technology", icon: "🧬" },
    { label: "Energy & Natural Resources", icon: "⚡" },
    { label: "Software", icon: "🧩" },
    { label: "Property", icon: "🏠" },
    { label: "Medical & Sciences", icon: "🧪" },
    { label: "Food & Beverage", icon: "🍔" },
    { label: "Finance", icon: "💵" },
    { label: "Retail", icon: "💎" },
    { label: "Manufacturing & Engineering", icon: "👷‍♂️" },
    { label: "Entertainment & Leisure", icon: "⚽" },
    { label: "Products & Inventions", icon: "🔬" },
    { label: "Business Services", icon: "💼" },
    { label: "Media", icon: "🎥" },
    { label: "Transportation", icon: "🚆" },
    { label: "Transportation", icon: "🚆" },
  ];
    
  return (
     <section className="py-12 px-4 md:px-12 bg-white text-center flex justify-center items-center flex-col ">
        <div className='max-w-[1200px] '>

    
      <h2 className="text-3xl font-bold mb-4 text-[#00df9a]">Our Industries</h2>
      <p className="text-gray-600 mb-10">
        We connect investors with startups and businesses from all sectors to ensure the relationship is valuable to both parties.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
        {industries.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 hover:bg-gray-100 p-6 rounded-xl shadow-sm w-full flex flex-col items-center transition-all"
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <p className="text-sm font-medium text-gray-800 text-center">{item.label}</p>
          </div>
        ))}
      </div>
          </div>
    </section>
  )
}

export default Industries