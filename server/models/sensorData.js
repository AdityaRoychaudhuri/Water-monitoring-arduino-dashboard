import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema(
    {
        temperature: Number,
        pH: Number,
        turbidity: Number,
        tds: Number
    },
    {timestamps: true}
)

const Sensor = mongoose.model("Sensor", sensorSchema)

export default Sensor;