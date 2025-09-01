const express = require("express");
const { PORT, mongoDBURL } = require("./config.js");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


// Importing Routes
const staffRoutes = require('./routes/staffRoutes.js');
const leaveRoutes = require('./routes/leaveRoutes.js');


// Mounting routes
app.use('/staff', staffRoutes);
app.use('/api/leaves', leaveRoutes);

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