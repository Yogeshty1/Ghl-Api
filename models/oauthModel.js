const pool = require("./tokens_model.js");

const saveTokens = async (access_token, refresh_token, expiresAt) => {
    const query = `
        INSERT INTO ghl_tokens (id, access_token, refresh_token, expires_at)
        VALUES (1, '${access_token}', '${refresh_token}', '${expiresAt.toISOString().slice(0, 19).replace('T', ' ')}')
        ON DUPLICATE KEY UPDATE
        access_token = VALUES(access_token),
        refresh_token = VALUES(refresh_token),
        expires_at = VALUES(expires_at)
    `;
    await pool.query(query);
};


const getonlyToken = async () => {
    const [rows] = await pool.query("SELECT * FROM ghl_tokens WHERE id = 1");
    return rows[0];
};

module.exports = {
    saveTokens,
    getonlyToken
};
