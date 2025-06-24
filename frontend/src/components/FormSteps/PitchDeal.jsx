import React from 'react';
import { TextArea, FormInput } from '../Form/inputfields';

const PitchDeal = ({ formData, setFormData, onNext }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.shortSummary || !formData.theBusiness || !formData.problemStatement || !formData.theDeal || !formData.costTillNow) {
      alert('Please fill in all required fields');
      return;
    }
    
    console.log("PitchDeal data being submitted:", formData);
    // Call parent's onNext to save data and move to next step
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md space-y-4">
      <TextArea 
        label="Short Summary *" 
        name="shortSummary" 
        value={formData.shortSummary || ''} 
        onChange={handleChange} 
        required
      />
      
      <TextArea 
        label="The Business *" 
        name="theBusiness" 
        value={formData.theBusiness || ''} 
        onChange={handleChange} 
        required
      />
      
      <TextArea 
        label="The Problem Statement *" 
        name="problemStatement" 
        value={formData.problemStatement || ''} 
        onChange={handleChange} 
        required
      />

      <div className="text-black">
        <label className="block font-medium mb-1">The Deal *</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="theDeal"
              value="Equity"
              checked={formData.theDeal === 'Equity'}
              onChange={handleChange}
              className="mr-2"
            />
            Equity
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="theDeal"
              value="Loan"
              checked={formData.theDeal === 'Loan'}
              onChange={handleChange}
              className="mr-2"
            />
            Loan
          </label>
        </div>
        {/* Show current selection for debugging */}
        <p className="text-sm text-gray-500 mt-1">
          Current selection: {formData.theDeal || 'None selected'}
        </p>
      </div>
      
      <FormInput 
        label="Cost till now *" 
        name="costTillNow" 
        type="number" 
        value={formData.costTillNow || ''} 
        onChange={handleChange} 
        required
      />

      <button type="submit" className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save & Continue
      </button>
    </form>
  );
};

export default PitchDeal;