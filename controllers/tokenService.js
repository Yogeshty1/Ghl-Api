const { saveTokens, getonlyToken } = require("../models/oauthModel");
const refreshAccessToken = require("./refreshToken");

async function getValidAccessToken() {
  const token = await getonlyToken();


// checking token expiry
   const now = Date.now();
   const expiresAt = new Date(token.expires_at).getTime();
   const timeLeft = expiresAt - now;

    // 1 min buffer
   if (timeLeft > 60 * 1000) {
      return token.access_token;
   }

    // token expired or expiring soon
   const refreshed = await refreshAccessToken(token.refresh_token);

   const newExpiresAt = new Date(
    Date.now() + refreshed.expires_in * 1000
  );

  await saveTokens(
    refreshed.access_token,
    refreshed.refresh_token,
    newExpiresAt
  );

  return refreshed.access_token;
}

module.exports = { getValidAccessToken };
