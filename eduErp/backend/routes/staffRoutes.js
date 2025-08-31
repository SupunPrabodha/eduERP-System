

const express = require("express");
const { getAllStaff, addStaff, deleteStaff } = require("../controllers/staffController.js");

const router = express.Router();



router.get("/", getAllStaff);
router.post("/", addStaff);
router.delete("/:id", deleteStaff);

module.exports = router;
