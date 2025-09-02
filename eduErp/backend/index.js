import express from "express";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import loginRoute from './routes/loginRoutes.js';
import adminRoute from './routes/adminRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', loginRoute);
app.use('/api/admin', adminRoute);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Connect to database
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })