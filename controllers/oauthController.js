const axios = require("axios");
const qs = require("qs");
const oauthModel = require("../models/oauthModel.js");

const handleCallback = async (req, res) => {
    const code = req.query.code;

    const response = await axios.post(
        "https://services.leadconnectorhq.com/oauth/token",
        qs.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.REDIRECT_URI
        }),
        {
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        }
        }
    );

    const { access_token, refresh_token, expires_in } = response.data;
    const expiresAt = new Date(Date.now() + expires_in * 1000);

    await oauthModel.saveTokens(access_token, refresh_token, expiresAt);

    res.json({
        success: true,
        message: "Tokens saved successfully",
        tokens: response.data
    });
};

module.exports = handleCallback;
