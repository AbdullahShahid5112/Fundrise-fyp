import Pitch from "../models/pitch.model.js";

// POST /api/pitch/info
export const createPitch = async (req, res) => {
  console.log("🚀 ~ createPitch ~ req:", req.body)
  
  try {
    const { companyInfo,
       pitchDeal
       } = req.body;

    const {
      name,
      location,
      market_size,
      target,
      min_per_investor,
      pitch_title,
      mobile_number,
      stage_current,
      ideal_investor_role,
      your_stake,
    } = companyInfo || {};

    const {
      summary,
      about_business,
      problem_statement,
      total_cost_to_date,
      deal_type,
    } = pitchDeal || {};

    // Validate required fields
    if (
      !name || !location  ||
      market_size == null || target == null || min_per_investor == null ||
      !pitch_title || !mobile_number || !stage_current || !ideal_investor_role || !your_stake 
      ||!summary || !about_business || !problem_statement || !total_cost_to_date ||!deal_type
    ) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    const newPitch = new Pitch({
      companyInfo: {
        name,
        location,
        market_size,
        target,
        min_per_investor,
        pitch_title,
        mobile_number,
        stage_current,
        ideal_investor_role,
        your_stake,
      },
      pitchDeal: {
        summary,
        about_business,
        problem_statement,
        total_cost_to_date,
        deal_type,
      }
    });
   console.log("🚀 ~ createPitch ~ newPitch:", newPitch)


    const savedPitch = await newPitch.save();
    res.status(201).json({ message: "Pitch created successfully.", pitch: savedPitch });
  } catch (error) {
    console.error("Error creating Pitch:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};




// GET /api/pitch/info
export const getAllPitches = async (req, res) => {
  try {
    const pitches = await Pitch.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Pitches fetched successfully", pitches });
  } catch (error) {
    console.error("Error fetching pitches:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// GET /api/pitch/:id
export const getPitchById = async (req, res) => {
  const { id } = req.params;

  try {
    const pitch = await Pitch.findById(id);
    if (!pitch) {
      return res.status(404).json({ message: "Pitch not found" });
    }

    res.status(200).json({ message: "Pitch fetched successfully", pitch });
  } catch (error) {
    console.error("Error fetching pitch by ID:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

