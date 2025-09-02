
import express from "express";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Importing Routes
const staffRoutes = require('./routes/staffRoutes.js');
const leaveRoutes = require('./routes/leaveRoutes.js');
const loginRoute = require('./routes/loginRoutes.js');
const adminRoute = require('./routes/adminRoutes.js');

// Mounting routes
app.use('/staff', staffRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/auth', loginRoute);
app.use('/api/admin', adminRoute);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

//connect to database
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
