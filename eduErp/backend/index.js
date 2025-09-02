import express from "express";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use(express.urlencoded({ extended: true }));

// Importing Routes
import staffRoutes from "./routes/staffRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import loginRoute from "./routes/loginRoutes.js";
import adminRoute from "./routes/adminRoutes.js";

// Mounting routes
app.use('/staff', staffRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/auth', loginRoute);
app.use('/api/admin', adminRoute);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

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
        
    });
