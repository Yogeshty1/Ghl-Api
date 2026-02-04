# GHL OAuth API

A Node.js application for integrating with GoHighLevel (GHL) API using OAuth 2.0 authentication with automatic token refresh functionality.

## Features

- **OAuth 2.0 Authentication** - Secure authentication flow with GHL
- **Automatic Token Refresh** - Seamlessly handles expired access tokens
- **MVC Architecture** - Clean separation of concerns
- **MySQL Database** - Persistent token storage
- **Middleware Protection** - Easy route protection with automatic auth

## Project Structure

```
├── controllers/
│   └── oauthController.js    # OAuth callback logic
├── middleware/
│   └── authMiddleware.js     # Automatic token refresh middleware
├── models/
│   ├── oauthModel.js         # Token database operations
│   └── tokens_model.js       # Database connection
├── routes/
│   ├── api_routes.js         # Protected API routes
│   ├── callback_routes.js    # OAuth callback route
│   └── codes_routes.js       # OAuth initiation route
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Dependencies
└── server.js                # Main application file
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Yogeshty1/Ghl-Api.git
cd Ghl-Api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your GHL credentials:
```env
# GHL OAuth Configuration
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=http://localhost:3000/oauth
VERSION_ID=your_version_id

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ghl

# Server Configuration
PORT=3000
```

4. Set up MySQL database:
```sql
CREATE DATABASE ghl;
USE ghl;

CREATE TABLE ghl_tokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    access_token TEXT,
    refresh_token TEXT,
    expires_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (id)
);
```

5. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication

1. **Initiate OAuth Flow**
```
GET /login
```
Redirects user to GHL authorization page.

2. **OAuth Callback**
```
GET /oauth?code=authorization_code
```
Handles OAuth callback, exchanges code for tokens, and stores them.

### Protected API Routes

1. **Get Contacts**
```
GET /api/contacts
```
Requires valid authentication. Automatically refreshes tokens if expired.

## Usage

### Basic Authentication Flow

1. Send user to `/login` to initiate OAuth
2. User authorizes your application
3. GHL redirects to `/oauth` with authorization code
4. Application exchanges code for access/refresh tokens
5. Tokens are stored in database for future use

### Using Protected Routes

Any route protected with `authMiddleware` will automatically:
- Check for valid tokens
- Refresh expired tokens
- Attach access token to request as `req.accessToken`

Example of adding a new protected route:

```javascript
const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/custom-endpoint", authMiddleware, async (req, res) => {
    // Access token is available as req.accessToken
    const response = await axios.get("https://services.leadconnectorhq.com/some-endpoint", {
        headers: {
            "Authorization": `Bearer ${req.accessToken}`,
            "Version": process.env.VERSION_ID
        }
    });
    
    res.json(response.data);
});
```

## Automatic Token Refresh

The system automatically handles token expiration:

1. **Middleware Check**: Each protected request checks token expiration
2. **Auto Refresh**: If expired, uses refresh token to get new access token
3. **Update Storage**: New tokens are saved to database
4. **Continue Request**: Request proceeds with fresh token

No manual intervention required - the system handles everything transparently.

## Dependencies

- **express** - Web framework
- **axios** - HTTP client for API calls
- **mysql2** - MySQL database driver
- **dotenv** - Environment variable management
- **qs** - Query string parsing

## Development

Start with nodemon for auto-restart:
```bash
npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on the GitHub repository.