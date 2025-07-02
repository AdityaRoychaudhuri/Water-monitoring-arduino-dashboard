import express from 'express';
import { getAllSensorData, getSensorData } from '../controllers/sensor.js';

const router = express.Router();

router.post("/post", getSensorData);
router.get("/data", getAllSensorData);

export default router;