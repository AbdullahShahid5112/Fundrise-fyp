import Pitch from "../models/pitch.model.js";
import cloudinary from "../lib/cloudinary.js"; 

const uploadToCloudinary = async (fileBuffer, originalName, folder = "pitches") => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: "auto",
          public_id: originalName ? originalName.split('.')[0] : undefined,
          use_filename: true,
          unique_filename: true
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );
      
      uploadStream.end(fileBuffer);
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

// POST /api/pitch/info
export const createPitch = async (req, res) => {
  console.log("🚀 ~ createPitch ~ req.body:", req.body);
  console.log("🚀 ~ createPitch ~ req.files:", req.files);
  
  try {
    const { 
      companyInfo,
      pitchDeal,
      videoType,
      videoID
    } = req.body;

    // Parse JSON strings if they come as strings from FormData
    const parsedCompanyInfo = typeof companyInfo === 'string' ? JSON.parse(companyInfo) : companyInfo;
    const parsedPitchDeal = typeof pitchDeal === 'string' ? JSON.parse(pitchDeal) : pitchDeal;

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
    } = parsedCompanyInfo || {};

    const {
      summary,
      about_business,
      problem_statement,
      total_cost_to_date,
      deal_type,
    } = parsedPitchDeal || {};

    // Validate required fields
    if (
      !name || !location  ||
      market_size == null || target == null || min_per_investor == null ||
      !pitch_title || !mobile_number || !stage_current || !ideal_investor_role || !your_stake 
      ||!summary || !about_business || !problem_statement || !total_cost_to_date ||!deal_type
    ) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Handle file uploads to Cloudinary from memory storage
    const uploadedImages = {};
    const uploadedVideos = {};
    const uploadedDocuments = {};

    // Upload images from req.files
    if (req.files) {
      // Upload logo
      if (req.files.logo && req.files.logo[0]) {
        uploadedImages.logo = await uploadToCloudinary(
          req.files.logo[0].buffer, 
          req.files.logo[0].originalname,
          "pitches/images"
        );
      }

      // Upload banner
      if (req.files.banner && req.files.banner[0]) {
        uploadedImages.banner = await uploadToCloudinary(
          req.files.banner[0].buffer, 
          req.files.banner[0].originalname,
          "pitches/images"
        );
      }

      // Upload product image
      if (req.files.productImage && req.files.productImage[0]) {
        uploadedImages.productImage = await uploadToCloudinary(
          req.files.productImage[0].buffer, 
          req.files.productImage[0].originalname,
          "pitches/images"
        );
      }

      // Upload video file (only if type is "Upload")
      if (videoType === "Upload" && req.files.videoFile && req.files.videoFile[0]) {
        uploadedVideos.videoType = "Upload";
        uploadedVideos.videoFile = await uploadToCloudinary(
          req.files.videoFile[0].buffer, 
          req.files.videoFile[0].originalname,
          "pitches/videos"
        );
      } else if (videoType === "YouTube" || videoType === "Vimeo") {
        uploadedVideos.videoType = videoType;
        uploadedVideos.videoID = videoID;
      }

      // Upload documents
      if (req.files.businessPlan && req.files.businessPlan[0]) {
        uploadedDocuments.businessPlan = await uploadToCloudinary(
          req.files.businessPlan[0].buffer, 
          req.files.businessPlan[0].originalname,
          "pitches/documents"
        );
      }

      if (req.files.teamDetails && req.files.teamDetails[0]) {
        uploadedDocuments.teamDetails = await uploadToCloudinary(
          req.files.teamDetails[0].buffer, 
          req.files.teamDetails[0].originalname,
          "pitches/documents"
        );
      }

      if (req.files.financials && req.files.financials[0]) {
        uploadedDocuments.financials = await uploadToCloudinary(
          req.files.financials[0].buffer, 
          req.files.financials[0].originalname,
          "pitches/documents"
        );
      }

      if (req.files.additionalDocs && req.files.additionalDocs[0]) {
        uploadedDocuments.additionalDocs = await uploadToCloudinary(
          req.files.additionalDocs[0].buffer, 
          req.files.additionalDocs[0].originalname,
          "pitches/documents"
        );
      }
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
      },
      images: uploadedImages,
      videos: uploadedVideos,
      documents: uploadedDocuments
    });
   
    console.log("🚀 ~ createPitch ~ newPitch:", newPitch);

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