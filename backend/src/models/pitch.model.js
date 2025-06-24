import mongoose from "mongoose";

const PitchSchema = new mongoose.Schema(
  {
    companyInfo: {
      name: { type: String, required: true, trim: true },
      location: { type: String, required: true, trim: true },
      market_size: { type: Number, required: true, min: 0 },
      target: { type: Number, required: true, min: 0 },
      min_per_investor: { type: Number, required: true, min: 0 },
      pitch_title: { type: String, required: true, trim: true },
      mobile_number: { type: Number, required: true },
      stage_current: {
        type: String,
        enum: ["Idea", "Prototype", "Revenue", "Scaling"],
        required: true,
      },
      ideal_investor_role: {
        type: String,
        enum: ["Silent", "Active", "Mentor"],
        required: true,
      },
      your_stake: { type: String, required: true, trim: true },
    },

    pitchDeal: {
      summary: { type: String, required: true, trim: true },
      about_business: { type: String, required: true },
      problem_statement: { type: String, required: true },
      total_cost_to_date: { type: Number, min: 0 },
      deal_type: { type: String },
    },

    images: {
      logo: { type: String }, // file path/URL
      banner: { type: String }, // file path/URL
      productImage: { type: String }, // file path/URL
    },

    videos: {
      videoType: {
        type: String,
        enum: ["YouTube", "Vimeo", "Upload"],
        required: false,
      },
      videoID: { 
        type: String, 
        trim: true,
        validate: {
          validator: function(v) {
            // If videoType is YouTube or Vimeo, videoID is required
            if (this.videos && (this.videos.videoType === "YouTube" || this.videos.videoType === "Vimeo")) {
              return v && v.length > 0;
            }
            return true;
          },
          message: "Video ID is required for YouTube and Vimeo videos"
        }
      },
      videoFile: { 
        type: String, // file path/URL
        // Only allowed if videoType is Upload
        validate: {
          validator: function(v) {
            // If videoType is Upload, videoFile should be provided
            // If videoType is YouTube or Vimeo, videoFile should not be provided
            if (this.videos && this.videos.videoType === "Upload") {
              return v && v.length > 0;
            } else if (this.videos && (this.videos.videoType === "YouTube" || this.videos.videoType === "Vimeo")) {
              return !v; // Should be empty for YouTube/Vimeo
            }
            return true;
          },
          message: "Video file is only allowed for Upload type videos"
        }
      },
    },

    documents: {
      businessPlan: { 
        type: String, // file path/URL
        validate: {
          validator: function(v) {
            if (!v) return true; // Optional field
            // Check file extension (assuming filename is stored)
            return /\.(pdf|doc|docx)$/i.test(v);
          },
          message: "Business plan must be a .pdf, .doc, or .docx file"
        }
      },
      teamDetails: { 
        type: String, // file path/URL
        validate: {
          validator: function(v) {
            if (!v) return true; // Optional field
            return /\.(pdf|doc|docx|xls|xlsx)$/i.test(v);
          },
          message: "Team details must be a .pdf, .doc, .docx, .xls, or .xlsx file"
        }
      },
      financials: { 
        type: String, // file path/URL
        validate: {
          validator: function(v) {
            if (!v) return true; // Optional field
            return /\.(pdf|xls|xlsx)$/i.test(v);
          },
          message: "Financials must be a .pdf, .xls, or .xlsx file"
        }
      },
      additionalDocs: { 
        type: String, // file path/URL
        validate: {
          validator: function(v) {
            if (!v) return true; // Optional field
            return /\.(pdf|doc|docx|xls|xlsx|zip)$/i.test(v);
          },
          message: "Additional documents must be a .pdf, .doc, .docx, .xls, .xlsx, or .zip file"
        }
      },
    },
  },
  { timestamps: true }
);

const Pitch = mongoose.model("Pitch", PitchSchema);
export default Pitch;