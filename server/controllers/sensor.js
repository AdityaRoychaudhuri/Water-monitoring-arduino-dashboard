import Sensor from "../models/sensorData.js";

export const getSensorData = async(req, res) => {
    const apiKey = req.headers["api-key"];
    if(apiKey != process.env.API_KEY ){
        return res.status(401).json({ error: "unauthorized" })
    }
    try {
        const { temperature, pH, turbidity, tds } = req.body;
        const sample = new Sensor({
            temperature: temperature,
            pH: pH,
            turbidity: turbidity,
            tds: tds
        })
        await sample.save();
        res.status(201).json({ message: "Sensor data saved" })
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}

export const getAllSensorData = async(req, res) => {
    try {
        const data = await Sensor.find().sort({ createdAt: -1 }).limit(30)
        res.status(200).json([...data])
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error })
    }
}