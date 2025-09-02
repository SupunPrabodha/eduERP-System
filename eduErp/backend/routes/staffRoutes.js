

const express = require("express");
const { getAllStaff, addStaff, deleteStaff, updateStaff } = require("../controllers/staffController.js");

const router = express.Router();


router.get("/", getAllStaff);
router.post("/", addStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

module.exports = router;
