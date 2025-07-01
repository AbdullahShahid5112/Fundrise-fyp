import { X } from "lucide-react";
import { useState } from "react";
import { useInvestorStore } from "../../store/useInvestorStore"; // Adjust path as needed

export const CreateInvestorModal = ({ isOpen, onClose }) => {
  const { createInvestor, isCreating } = useInvestorStore();
  
  const [formData, setFormData] = useState({
    investmentRange: '',
    location: '',
    intro: '',
    expertise: '',
    number: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.investmentRange || formData.investmentRange <= 0) {
      newErrors.investmentRange = 'Investment range is required and must be greater than 0';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.intro.trim()) {
      newErrors.intro = 'Introduction is required';
    }
    
    if (!formData.expertise.trim()) {
      newErrors.expertise = 'Areas of expertise is required';
    }

    if (!formData.number.trim()) {
      newErrors.number = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.number.trim())) {
      newErrors.number = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Convert investmentRange to number
      const submitData = {
        ...formData,
        investmentRange: Number(formData.investmentRange),
        location: formData.location.trim(),
        intro: formData.intro.trim(),
        expertise: formData.expertise.trim(),
        number: formData.number.trim()
      };
      
      await createInvestor(submitData);
      
      // Reset form and close modal on success
      setFormData({
        investmentRange: '',
        location: '',
        intro: '',
        expertise: '',
        number: ''
      });
      setErrors({});
      onClose();
    } catch (error) {
      // Error is already handled in the store with toast
      console.error('Failed to create investor:', error);
    }
  };

  const handleClose = () => {
    setFormData({
      investmentRange: '',
      location: '',
      intro: '',
      expertise: '',
      number: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 mt16">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-hidden border border-gray-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Create New Investor</h2>
            <p className="text-sm text-gray-600 mt-1">Add investor details to expand your network</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            disabled={isCreating}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Investment Range */}
            <div className="space-y-2">
              <label htmlFor="investmentRange" className="block text-sm font-semibold text-gray-700">
                Investment Range (Rs) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="investmentRange"
                  name="investmentRange"
                  value={formData.investmentRange}
                  onChange={handleChange}
                  disabled={isCreating}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.investmentRange ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="e.g., 500000"
                  min="1"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <span className="text-gray-400 text-sm">PKR</span>
                </div>
              </div>
              {errors.investmentRange && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="w-4 h-4 text-xs">⚠️</span>
                  {errors.investmentRange}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={isCreating}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.location ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="e.g., Karachi, Pakistan"
              />
              {errors.location && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="w-4 h-4 text-xs">⚠️</span>
                  {errors.location}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label htmlFor="number" className="block text-sm font-semibold text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                disabled={isCreating}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.number ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="e.g., +92 300 1234567"
              />
              {errors.number && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="w-4 h-4 text-xs">⚠️</span>
                  {errors.number}
                </p>
              )}
            </div>

            {/* Introduction */}
            <div className="space-y-2">
              <label htmlFor="intro" className="block text-sm font-semibold text-gray-700">
                Introduction *
              </label>
              <textarea
                id="intro"
                name="intro"
                value={formData.intro}
                onChange={handleChange}
                disabled={isCreating}
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all ${
                  errors.intro ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Brief introduction about yourself and investment philosophy..."
              />
              {errors.intro && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="w-4 h-4 text-xs">⚠️</span>
                  {errors.intro}
                </p>
              )}
            </div>

            {/* Expertise */}
            <div className="space-y-2">
              <label htmlFor="expertise" className="block text-sm font-semibold text-gray-700">
                Areas of Expertise *
              </label>
              <textarea
                id="expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                disabled={isCreating}
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all ${
                  errors.expertise ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Describe your areas of expertise, industries you focus on..."
              />
              {errors.expertise && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="w-4 h-4 text-xs">⚠️</span>
                  {errors.expertise}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="flex gap-3 p-2 bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            onClick={handleClose}
            disabled={isCreating}
            className="flex-1 px-6 py-3 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isCreating}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium shadow-lg"
          >
            {isCreating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              'Create Investor'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};