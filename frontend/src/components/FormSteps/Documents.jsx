import React from 'react';
import { FileUpload } from '../Form/inputfields';

const Documents = ({ formData, setFormData, onNext }) => {
  const handleChange = (e) => {
    const { name, files } = e.target;
    // Update the specific document in the formData
    setFormData({
      ...formData,
      [name]: files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Documents being submitted:", formData);
    onNext(); 
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md text-black">
      <h2 className="text-lg font-semibold mb-4">Upload Required Documents</h2>

      <FileUpload
        label="Business Plan"
        name="businessPlan"
        onChange={handleChange}
        accept=".pdf,.doc,.docx"
        note="Accepted formats: PDF, DOC, DOCX"
      />

      <FileUpload
        label="Team Members Details"
        name="teamDetails"
        onChange={handleChange}
        accept=".pdf,.doc,.docx,.xls,.xlsx"
        note="Include roles, bios, and contact info if available"
      />

      <FileUpload
        label="Financials"
        name="financials"
        onChange={handleChange}
        accept=".pdf,.xls,.xlsx"
        note="Upload your financial statements or projections"
      />

      <FileUpload
        label="Additional Documents (optional)"
        name="additionalDocs"
        onChange={handleChange}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
        note="Any extra files or supporting documents"
      />

      {/* Debug info */}
      <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
        <strong>Debug - Current documents:</strong>
        <pre>{JSON.stringify(Object.keys(formData).filter(key => formData[key]), null, 2)}</pre>
      </div>

      <button type="submit" className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
        Submit Complete Pitch
      </button>
    </form>
  );
};

export default Documents;