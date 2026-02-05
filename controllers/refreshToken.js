const axios = require("axios");
const qs = require("qs");

async function refreshAccessToken(refreshToken) {
  const response = await axios.post(
    "https://services.leadconnectorhq.com/oauth/token",
    qs.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );

  return response.data;
}

module.exports = refreshAccessToken;

