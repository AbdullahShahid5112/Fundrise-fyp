import express from "express"
import {createPitch, getAllPitches, getPitchById} from "../controllers/pitch.controller.js"
import {protectRoute} from "../middleware/auth.middleware.js"
const router = express.Router();


router.post("/info",protectRoute,createPitch)
router.get("/info",protectRoute,getAllPitches)
router.get("/info/:id",protectRoute,getPitchById)

export default router;