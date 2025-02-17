const express = require("express");
const router = express.Router();
const { allBlocksHandler, createBlockHandler, deleteBlockHandler, updateBlockHandler, singleBlockDetailsHandler } = require("../controllers/blocks.controller");


router.get("/",allBlocksHandler); //get all blocks
router.post("/create",createBlockHandler); // create block
router.delete("/delete/:id",deleteBlockHandler); // delete block
router.patch("/update/:id",updateBlockHandler); // update block
router.get("/:id",singleBlockDetailsHandler); // single block

module.exports = router;