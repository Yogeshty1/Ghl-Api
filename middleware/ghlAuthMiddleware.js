const { getValidAccessToken } = require("../controllers/tokenService");

async function ghlAuthMiddleware(req, res, next) {
  req.ghlAccessToken = await getValidAccessToken();
  next();
  
}

module.exports = ghlAuthMiddleware;
