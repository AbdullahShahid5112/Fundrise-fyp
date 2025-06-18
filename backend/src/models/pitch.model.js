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

    // imagesVideos: {
    //   images: [{ type: String }],
    //   videos: [{ type: String }],
    // },

    // documents: {
    //   pitch_deck: { type: String },
    //   business_plan: { type: String },
    //   financials: { type: String },
    // },
  },
  { timestamps: true }
);

const Pitch = mongoose.model("Pitch", PitchSchema);
export default Pitch;
