const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const leadController = require("../controllers/leadController");

/* PUBLIC */

router.post("/", leadController.createLead);

/* PROTECTED */

router.get("/", protect, leadController.getLeads);

router.put("/:id", protect, leadController.updateLeadStatus);

router.delete("/:id", protect, leadController.deleteLead);

module.exports = router;