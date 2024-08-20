import express from "express"
import { GoogleLogin } from "../controllers/AuthController.js"

const router = express.Router()

router.post("/signin", GoogleLogin)

export default router