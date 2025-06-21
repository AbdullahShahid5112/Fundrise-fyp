import React from 'react';
import { FormInput, TextArea, SelectInput } from '../Form/inputfields';

const CompanyInfoForm = ({ formData, setFormData, onNext }) => {
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
      'companyName', 'pitchTitle', 'location', 'mobileNumber', 
      'stageCurrent', 'idealInvestorRole', 'marketSize', 'target', 
      'minPerInvestor', 'yourStake'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }
    
    onNext(); // Pass control to parent
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md space-y-4">
      <FormInput 
        label="Company Name *" 
        name="companyName" 
        value={formData.companyName || ''} 
        onChange={handleChange} 
        required
      />
      
      <FormInput 
        label="Pitch Title *" 
        name="pitchTitle" 
        value={formData.pitchTitle || ''} 
        onChange={handleChange} 
        required
      />
      
      <FormInput 
        label="Location *" 
        name="location" 
        value={formData.location || ''} 
        onChange={handleChange} 
        required
      />
      
      <FormInput 
        label="Mobile Number *" 
        name="mobileNumber" 
        type="tel" 
        value={formData.mobileNumber || ''} 
        onChange={handleChange} 
        required
      />
      
      <SelectInput
        label="Stage Current *"
        name="stageCurrent"
        value={formData.stageCurrent || ''}
        onChange={handleChange}
        options={["", "Idea", "Prototype", "Revenue", "Scaling"]}
        required
      />
      
       <SelectInput
        label="Ideal Investor Role *"
        name="idealInvestorRole"
        value={formData.idealInvestorRole || ''}
        onChange={handleChange}
        options={["", "Silent", "Active", "Mentor"]}
        required
      />
      
      <FormInput 
        label="Market Size *" 
        name="marketSize" 
        type="number" 
        value={formData.marketSize || ''} 
        onChange={handleChange} 
        required
        min="1"
      />
      
      <FormInput 
        label="Target *" 
        name="target" 
        type="number" 
        value={formData.target || ''} 
        onChange={handleChange} 
        required
        min="1"
      />
      
      <FormInput 
        label="Min Per Investor *" 
        name="minPerInvestor" 
        type="number" 
        value={formData.minPerInvestor || ''} 
        onChange={handleChange} 
        required
        min="1"
      />
     
      <FormInput 
        label="Your Stake *" 
        name="yourStake" 
        value={formData.yourStake || ''} 
        onChange={handleChange} 
        required
      />

      <button type="submit" className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Next
      </button>
    </form>
  );
};

export default CompanyInfoForm;