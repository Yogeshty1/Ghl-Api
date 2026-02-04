const express = require("express");
const router = express.Router();


// for taking code from the url 
router.get("/", (req, res) => {
const url = `https://marketplace.gohighlevel.com/oauth/chooselocation` +`?response_type=code`
+`&client_id=${process.env.CLIENT_ID}` +
`&scope=contacts.readonly contacts.write` +
`&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}` +`&version_id=${process.env.VERSION_ID}`;

return res.redirect(url);
});

module.exports = router;
