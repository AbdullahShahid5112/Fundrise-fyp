import React from 'react';
import { FileUpload } from '../Form/inputfields';

const Documents = ({ formData, setFormData, onNext }) => {
  const handleChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

      <button type="submit" className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save & Continue
      </button>
    </form>
  );
};

export default Documents;
