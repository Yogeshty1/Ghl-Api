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
│   ├── contact_controllers.js  # Contact management endpoints
│   ├── oauthController.js      # OAuth callback handler
│   ├── refreshToken.js         # Token refresh logic
│   └── tokenService.js         # Token validation service
├── middleware/
│   └── ghlAuthMiddleware.js     # GHL authentication middleware
├── models/
│   ├── oauthModel.js           # Token database operations
│   └── tokens_model.js          # MySQL database connection
├── routes/
│   ├── contact_routes.js       # Contact management routes
│   ├── callback_routes.js       # OAuth callback route
│   └── codes_routes.js          # OAuth initiation route
├── .env                         # Environment variables
├── .gitignore                  # Git ignore file
├── package.json                # Dependencies and scripts
└── server.js                   # Main application entry point
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

### Contact Management

1. **Create Contact**
```
POST /contacts/create
```
Creates a new contact. Requires valid GHL authentication. Currently returns a placeholder response.

### Authentication

1. **Initiate OAuth Flow**
```
GET /login
```
Redirects user to GHL authorization page with proper scopes (contacts.readonly, contacts.write).

2. **OAuth Callback**
```
GET /oauth?code=authorization_code
```
Handles OAuth callback, exchanges code for tokens, and stores them in MySQL database.

### Protected API Routes

The application currently has the contact creation endpoint as the main protected route. Additional protected routes can be added following the same pattern.

## Usage

### Basic Authentication Flow

1. Send user to `/login` to initiate OAuth
2. User authorizes your application
3. GHL redirects to `/oauth` with authorization code
4. Application exchanges code for access/refresh tokens
5. Tokens are stored in database for future use

### Using Protected Routes

Any route protected with `ghlAuthMiddleware` will automatically:
- Check for valid tokens from database
- Refresh expired tokens using refresh token
- Attach access token to request as `req.ghlAccessToken`
- Use 1-minute buffer before token expiration

Example of the current contact creation endpoint:

```javascript
const ghlAuthMiddleware = require("../middleware/ghlAuthMiddleware.js");

router.post("/create", ghlAuthMiddleware, async (req, res) => {
    // Access token is available as req.ghlAccessToken
    // TODO: Implement actual GHL API call
    res.json({ message: "Create contact endpoint" });
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

- **express** (v5.2.1) - Web framework
- **axios** (v1.13.4) - HTTP client for API calls
- **mysql2** (v3.16.3) - MySQL database driver
- **dotenv** (v17.2.3) - Environment variable management
- **qs** (v6.14.1) - Query string parsing
- **nodemon** (v3.1.11) - Development auto-restart

## Development

Start with nodemon for auto-restart:
```bash
npm run dev
```

Note: The project currently uses `npm test` as a placeholder. Update package.json scripts for proper development commands.

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