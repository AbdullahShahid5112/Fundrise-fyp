import React from "react";
import { Link } from "react-router-dom";

const PitchCard = ({ pitch }) => {
  const company = pitch.companyInfo;
  const deal = pitch.pitchDeal;

  return (
    <Link
      to={`/pitch/${pitch._id}`}
      className="group block transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden backdrop-blur-sm bg-white/90 hover:bg-white">
        <div className="flex">
          {/* Enhanced Banner Image with Logo Overlay */}
          <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden">
            {pitch.images?.banner ? (
              <div className="relative w-full h-full">
                <img
                  src={pitch.images.banner}
                  alt={`${company.name} banner`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QkE0IiBmb250LXNpemU9IjE0Ij5ObyBCYW5uZXI8L3RleHQ+Cjwvc3ZnPg==";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-600/30"></div>
                <span className="text-white font-bold text-2xl relative z-10 drop-shadow-lg">
                  {company?.name?.charAt(0).toUpperCase()}
                </span>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
              </div>
            )}

            {/* Enhanced Logo Overlay */}
            <div className="absolute top-3 left-3 transition-transform duration-300 group-hover:scale-110">
              {pitch.images?.logo ? (
                <div className="relative">
                  <img
                    src={pitch.images.logo}
                    alt={`${company.name} logo`}
                    className="w-12 h-12 object-cover rounded-xl border-3 border-white shadow-lg bg-white transition-all duration-300 group-hover:shadow-xl"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>
              ) : null}

              <div
                className={`w-12 h-12 bg-gradient-to-br from-white to-slate-100 rounded-xl border-3 border-white shadow-lg flex items-center justify-center text-slate-700 font-bold text-sm transition-all duration-300 group-hover:shadow-xl ${
                  pitch.images?.logo ? "hidden" : "flex"
                }`}
              >
                {company?.name?.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* New indicator badge */}
            <div className="absolute top-3 right-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                Active
              </div>
            </div>
          </div>

          {/* Enhanced Content */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              {/* Header Section */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 mr-4">
                  <h2 className="text-xl font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                    {company?.pitch_title || company?.name}
                  </h2>
                  <div className="flex items-center mt-1 text-sm text-slate-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {company?.location?.slice(0, 20) || "Location not specified"}
                  </div>
                </div>

                {/* Enhanced Target Investment */}
                <div className="text-right flex-shrink-0">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-xl border border-blue-200">
                    <div className="font-bold text-blue-700 text-lg">
                      PKR {company?.target?.toLocaleString() || "N/A"}
                    </div>
                    <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">
                      Target
                    </div>
                  </div>
                </div>
              </div>

              {/* Problem Statement */}
              <div className="mb-4">
                <p className="text-slate-700 leading-relaxed line-clamp-2 text-sm">
                  {deal?.problem_statement?.slice(0, 120) || "Innovative solution addressing market needs with cutting-edge technology and proven business model."}
                  {(deal?.problem_statement?.length > 120) && "..."}
                </p>
              </div>
            </div>

            {/* Enhanced Bottom Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Minimum Investment */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-200 text-xs font-semibold flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  PKR {company?.min_per_investor?.toLocaleString() || "N/A"} min
                </div>

                {/* Stage */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-3 py-1.5 rounded-lg border border-purple-200 text-xs font-semibold">
                  {company?.stage_current || "Early Stage"}
                </div>

                {/* Investor Type */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-200 text-xs font-semibold">
                  {company?.ideal_investor_role || "Any"} Investor
                </div>
              </div>

              {/* View Details Arrow */}
              <div className="text-slate-400 group-hover:text-blue-500 transition-colors duration-200">
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle bottom border accent */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </Link>
  );
};

export default PitchCard;