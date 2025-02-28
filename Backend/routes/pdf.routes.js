const express = require("express");
const { admitCardHandler, sheetQrHandler, attendanceSheetPdfHandler, StudentSheetLinkPdfHandler } = require("../controllers/pdf.controller");
const router = express.Router();


router.get("/admit-card",admitCardHandler);
router.post("/sheet-qrs",sheetQrHandler);
router.get("/attendance-sheet",attendanceSheetPdfHandler);
router.get("/student-sheet-link",StudentSheetLinkPdfHandler);

module.exports = router;