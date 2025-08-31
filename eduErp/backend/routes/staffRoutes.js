

const express = require("express");
const { getAllStaff, addStaff } = require("../controllers/staffController.js");

const router = express.Router();


router.get("/", getAllStaff);
router.post("/", addStaff);

module.exports = router;
