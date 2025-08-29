import './env.js';
import express from 'express'
import projectRoutes from './routes/index.js'
import appConfig from './config/app.config.js';
import errorHandler from "./middlewares/ErrorHandler.js";
import './models/associations.js';
import cors from "cors";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use("/api", projectRoutes);
app.use(errorHandler);

app.listen(appConfig.PORT, () => console.log("SERVER STARTED ON PORT " + appConfig.PORT));
