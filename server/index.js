import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

// Routes imports
import SensorData from "./routes/sensorRoute.js"

// Configurations
dotenv.config() 
const app = express()
app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

// Routes
app.use("/api", SensorData)

const port = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(port, () => console.log(`Listening at port ${port}`))

})
.catch((err) => console.log(`Cannot connect to mongo due to ${err}`))