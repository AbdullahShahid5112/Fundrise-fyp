import express from "express";
import multer from "multer";
import { createPitch, getAllPitches, getPitchById } from "../controllers/pitch.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit per file
    files: 10 // Maximum 10 files total
  },
  fileFilter: (req, file, cb) => {
    // Define allowed file types
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm'];
    const allowedDocTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain'
    ];

    const allAllowedTypes = [...allowedImageTypes, ...allowedVideoTypes, ...allowedDocTypes];

    if (allAllowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} is not allowed`), false);
    }
  }
});

// Define the fields that can accept file uploads
const uploadFields = upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
  { name: 'productImage', maxCount: 1 },
  { name: 'videoFile', maxCount: 1 },
  { name: 'businessPlan', maxCount: 1 },
  { name: 'teamDetails', maxCount: 1 },
  { name: 'financials', maxCount: 1 },
  { name: 'additionalDocs', maxCount: 1 }
]);

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        message: 'File too large. Maximum size allowed is 50MB per file.' 
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ 
        message: 'Too many files. Maximum 10 files allowed.' 
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ 
        message: 'Unexpected file field. Please check your form fields.' 
      });
    }
    return res.status(400).json({ 
      message: 'File upload error: ' + err.message 
    });
  }
  
  if (err.message.includes('File type')) {
    return res.status(400).json({ 
      message: err.message 
    });
  }
  
  next(err);
};

// Routes
router.post("/info", protectRoute, uploadFields, handleMulterError, createPitch);
router.get("/info", protectRoute, getAllPitches);
router.get("/info/:id", protectRoute, getPitchById);

export default router;