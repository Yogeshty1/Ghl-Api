const express = require("express");
const router = express.Router();
const contact_routes= require("../controllers/contact_controllers");
 
router.post("/contacts", contact_routes);
 
module.exports = router;