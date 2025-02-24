const express = require("express");
const { pdfGen } = require("../controllers/pdf.controller");
const router = express.Router();


router.get("/",pdfGen);
// router.get("/admit-card",);

module.exports = router;