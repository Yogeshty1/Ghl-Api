const express = require("express");
const router = express.Router();
const handleCallback = require("../controllers/oauthController.js");

router.get("/", handleCallback);

module.exports = router;
