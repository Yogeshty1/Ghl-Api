const pool = require("./tokens_model.js");

const saveTokens = async (access_token, refresh_token, expiresAt) => {
    await pool.query(
        `INSERT INTO ghl_tokens (access_token, refresh_token, expires_at)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
        access_token = VALUES(access_token),
        refresh_token = VALUES(refresh_token),
        expires_at = VALUES(expires_at)`,
        [access_token, refresh_token, expiresAt]
    );
};

module.exports = {
    saveTokens
};
