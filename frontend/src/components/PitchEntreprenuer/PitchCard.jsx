import React from "react";
import { Link } from "react-router-dom";

const PitchCard = ({ pitch }) => {
  const company = pitch.companyInfo;
  const deal = pitch.pitchDeal;

  return (
    <Link
      to={`/pitch/${pitch._id}`}
      className="flex border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:bg-gray-50 bg-white"
    >
      {/* Banner Image with Logo Overlay */}
      <div className="relative w-48 h-32 flex-shrink-0 bg-gray-200 flex items-center justify-center">
        {pitch.images?.banner ? (
          <img
            src={pitch.images.banner}
            alt={`${company.name} banner`}
            className="w-full h-full object-cover rounded-l-lg"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QkE0IiBmb250LXNpemU9IjE0Ij5ObyBCYW5uZXI8L3RleHQ+Cjwvc3ZnPg==";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-l-lg flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {company?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Logo Overlay */}
        <div className="absolute top-2 left-2">
          {pitch.images?.logo ? (
            <img
              src={pitch.images.logo}
              alt={`${company.name} logo`}
              className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-md bg-white"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}

          <div
            className={`w-12 h-12 bg-white rounded-full border-2 border-white shadow-md flex items-center justify-center text-gray-700 font-bold text-sm ${
              pitch.images?.logo ? "hidden" : "flex"
            }`}
          >
            {company?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          {/* Pitch Title */}
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-1 flex-1 mr-4">
            {company?.pitch_title}
          </h2>

          {/* Target Investment */}
          <div className="text-right text-sm text-gray-500 flex-shrink-0">
            <div className="font-medium text-blue-600">
              PKR{company?.target?.toLocaleString() || "N/A"}
            </div>
            <div className="text-xs">Target</div>
          </div>
        </div>

        {/* Location */}
        <p className="text-sm text-gray-500 mb-2">
          📍 {company?.location.slice(0, 10) || "Unknown"}
        </p>

        {/* Problem / Summary */}
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 mb-3">
          {deal?.problem_statement.slice(0, 30) ||
            "No description available."}
        </p>

        {/* Bottom Info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
              pkr {company?.min_per_investor?.toLocaleString() || "N/A"} min
            </span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {company?.stage_current || "Unknown"}
            </span>
            <span className="text-orange-600">
              {company?.ideal_investor_role || "Any"} Investor
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PitchCard;