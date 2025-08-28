import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';

const app = express();

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
        
    })