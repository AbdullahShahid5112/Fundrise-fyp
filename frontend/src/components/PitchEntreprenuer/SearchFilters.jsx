import React from 'react';

const filterButtons = [
  'Investment Range',
  'Investor Type',
  'Stages',
  'Location',
];

const SearchFilters = ({ filters, setFilters, handleApply, clearFilters }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-center pt-10">
      {filterButtons.map((label, idx) => (
        <button key={idx} className="px-4 py-2 border rounded text-black hover:bg-gray-100">
          {label}
        </button>
      ))}
      <button className="text-blue-500 underline" onClick={clearFilters}>
        Clear filters
      </button>

      <div className="w-full flex items-center justify-center mt-4">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="w-2/3 p-2 border rounded"
        />
        <button
          onClick={handleApply}
          className="ml-2 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Apply
        </button>
      </div>
  
    </div>
  );
};

export default SearchFilters;
