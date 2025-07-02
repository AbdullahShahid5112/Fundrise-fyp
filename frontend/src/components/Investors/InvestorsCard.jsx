import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Trash2, Edit3, RefreshCw, Phone, Building2, Star, Award } from 'lucide-react';
import { CreateInvestorModal } from './CreateInvestorModal';
import { useInvestorStore } from '../../store/useInvestorStore';

const Investor1 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { 
    investors, 
    isLoading, 
    isDeleting, 
    error,
    getInvestors, 
    deleteInvestor,
    clearError 
  } = useInvestorStore();

  // Fetch investors on component mount
  useEffect(() => {
    getInvestors();
  }, [getInvestors]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);



  const handleRefresh = () => {
    getInvestors();
  };

  const handleCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const formatInvestmentRange = (amount) => {
    if (!amount) return 'Not specified';
    
    if (amount >= 10000000) {
      return `₨${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₨${(amount / 100000).toFixed(1)} Lac`;
    } else if (amount >= 1000) {
      return `₨${(amount / 1000).toFixed(0)}K`;
    } else {
      return `₨${amount}`;
    }
  };

  const formatPhoneNumber = (number) => {
    if (!number) return 'Not provided';
    // Format: +92 300 1234567 -> +92 300 ****567
    if (number.length > 6) {
      const start = number.slice(0, -6);
      const end = number.slice(-3);
      return `${start}***${end}`;
    }
    return number;
  };

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-24 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-red-100">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 mt-24">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-6 relative">
          {/* Action Buttons - Top Right */}
          <div className="absolute top-6 right-6 flex gap-3">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 border border-gray-200 font-medium"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Investor
            </button>
          </div>

          {/* Title and Description */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Angel Investors Network
              </h1>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Connect with verified angel investors in{" "}
              <span className="font-semibold text-blue-600">Pakistan</span> and{" "}
              <span className="font-semibold text-indigo-600">globally</span>. 
              Find the perfect match for your startup funding needs.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>Verified Investors</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-500" />
                <span>Trusted Network</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Loading investors...</p>
              <p className="text-sm text-gray-500">This may take a moment</p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && investors.length === 0 && (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-8xl mb-6">🚀</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Investors Yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Be the pioneer! Create the first investor profile and start building our network.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg font-medium text-lg"
            >
              Create First Investor
            </button>
          </div>
        </div>
      )}

      {/* Investors Grid */}
      {!isLoading && investors.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Available Investors
                </h2>
                <p className="text-gray-600">
                  <span className="font-semibold text-blue-600">{investors.length}</span> verified investors ready to fund your ideas
                </p>
              </div>
              <div className="hidden md:flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {investors.map((investor) => (
              <div 
                key={investor._id} 
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 relative overflow-hidden"
              >
                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available
                  </div>
                </div>

           

                {/* Card Content */}
                <div className="p-6">
                  {/* Investor Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        {investor.location?.charAt(0)?.toUpperCase() || 'I'}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Award className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <h3 className="text-xl font-bold text-gray-800 truncate mb-1">
                        {investor.location || 'Anonymous Investor'}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                        <span className="truncate">{investor.location || 'Location not specified'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Investment Range */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <h4 className="text-sm font-semibold text-green-800 mb-1">Investment Range</h4>
                    <p className="text-2xl font-bold text-green-600">
                      {formatInvestmentRange(investor.investmentRange)}
                    </p>
                  </div>

                  {/* Introduction */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">About</h4>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {investor.intro || 'No introduction provided'}
                    </p>
                  </div>

                  {/* Areas of Expertise */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Expertise</h4>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {investor.expertise || 'No expertise specified'}
                    </p>
                  </div>

                  {/* Contact Info */}
                  {investor.number && (
                    <div className="mb-6 p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-blue-800">Contact</h4>
                          <p className="text-blue-600 text-sm font-mono">
                            {formatPhoneNumber(investor.number)}
                          </p>
                        </div>
                        <Phone className="w-5 h-5 text-blue-500" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="px-6 pb-6">
                  <div className="flex gap-3">
                    {investor.number ? (
                      <button 
                        onClick={() => handleCall(investor.number)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all font-medium shadow-lg"
                      >
                        <Phone className="w-4 h-4" />
                        Call Now
                      </button>
                    ) : (
                      <button className="flex-1 px-4 py-3 bg-gray-100 text-gray-500 rounded-xl cursor-not-allowed font-medium">
                        No Contact Info
                      </button>
                    )}
               
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Investor Modal */}
      <CreateInvestorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Investor1;