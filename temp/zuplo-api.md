# Zuplo API - Express.js API Proxy/Middleware

## Repository Info
- **GitHub:** Uday-461/zuplo-api
- **Language:** TypeScript (backend), JavaScript (frontend)
- **Status:** Public, Active
- **Last Updated:** September 2025
- **Type:** Full-Stack API Application

## Overview
Simple Express.js API server that acts as a proxy/middleware between a frontend client and an external API. Demonstrates clean API architecture with CORS handling, environment configuration, and separation of concerns between frontend and backend.

## Purpose
Provide a proxy layer between frontend applications and external APIs, enabling:
- CORS policy management
- API request/response transformation
- Authentication handling at the server level
- Rate limiting and caching (extensible)
- API versioning and routing

## Technology Stack

### Backend
- **Express.js:** Web application framework
- **Node.js:** JavaScript runtime
- **CORS:** Cross-origin resource sharing
- **dotenv:** Environment variable management
- **ES Modules:** Modern JavaScript module system

### Frontend
- **Vanilla JavaScript:** No framework dependencies
- **HTML5:** Semantic markup
- **Fetch API:** HTTP client
- **DOM Manipulation:** Dynamic table rendering

### Development Tools
- **nodemon:** Auto-reload development server
- **npm:** Package management

## Architecture Overview

### Request Flow
```
Frontend (http://127.0.0.1:5500)
    ↓
Express Server (localhost:5000)
    ↓
External API (process.env.API_BASE_URL)
    ↓
Response back through proxy
    ↓
Frontend renders data
```

### Component Separation
```
zuplo-api/
├── server.js              # Express server entry point
├── routes/
│   └── usersRoutes.js     # API route definitions
├── javascript/
│   └── app.js             # Frontend client code
├── docs/                  # Documentation
├── packages/              # Shared utilities
└── .env                   # Environment configuration
```

## Key Features

### Backend Server (server.js)

#### Express Configuration
- **CORS Setup:** Configured for `http://127.0.0.1:5500` origin
- **JSON Parsing:** Built-in JSON body parser
- **Route Mounting:** Modular route organization
- **Error Handling:** Graceful error responses
- **Port Configuration:** Environment-based port selection

#### Security Features
- CORS policy enforcement
- Environment variable protection
- No API keys exposed to frontend
- Server-side request validation

### API Routes (routes/usersRoutes.js)

#### GET /users Endpoint
- Fetches user data from external API
- Proxies request to `${process.env.API_BASE_URL}/users`
- Returns JSON response to client
- Error handling and logging

#### Extensibility
- Easy to add new routes
- Consistent error handling
- Modular route organization
- Middleware support

### Frontend Client (javascript/app.js)

#### User Interface
- Fetch data from proxy server
- Display in HTML table
- Dynamic DOM manipulation
- Error handling and display

#### Features
- Async/await pattern
- Fetch API usage
- Table generation
- User-friendly error messages

## Technical Implementation

### Server Setup (server.js)
```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRoutes from './routes/usersRoutes.js';

dotenv.config();
const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));

// JSON parsing
app.use(express.json());

// Route mounting
app.use('/users', usersRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

### Route Implementation (usersRoutes.js)
```javascript
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/users`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;
```

### Frontend Client (app.js)
```javascript
async function fetchUsers() {
  try {
    const response = await fetch(
      'https://zuplo-test.onrender.com/users'
    );
    const users = await response.json();
    displayUsersInTable(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
```

## Environment Configuration

### Environment Variables
```env
PORT=5000
API_BASE_URL=https://external-api.com
```

### Configuration Benefits
- No hardcoded URLs
- Easy environment switching
- Secure credential management
- Development vs production configs

## Development Workflow

### Development Commands
```bash
# Install dependencies
npm install

# Start development server (auto-reload)
npm run dev

# Start production server
npm start
```

### Development Experience
- **nodemon:** Automatic server restart on file changes
- **ES Modules:** Modern JavaScript syntax
- **Hot Reload:** Fast development iteration
- **Console Logging:** Request/response debugging

## Use Cases

### API Proxy Layer
- Hide external API URLs from frontend
- Centralize API access
- Add authentication tokens server-side
- Transform API responses

### CORS Workaround
- Bypass browser CORS restrictions
- Enable local development
- Proxy to CORS-restricted APIs
- Control allowed origins

### Middleware Platform
- Add rate limiting
- Implement caching
- Log requests
- Transform data
- Add authentication

### Microservices Gateway
- Route to multiple backends
- Aggregate responses
- Load balancing
- Circuit breaking

## Portfolio Value

Demonstrates:
- **Full-Stack Development:** Backend and frontend integration
- **Express.js Expertise:** Clean server architecture
- **API Design:** RESTful patterns and proxy patterns
- **CORS Understanding:** Cross-origin security
- **Environment Management:** Configuration best practices
- **ES Modules:** Modern JavaScript
- **Error Handling:** Graceful degradation
- **Separation of Concerns:** Modular code organization
- **Development Tools:** nodemon, npm scripts
- **Clean Code:** Well-documented with CLAUDE.md

## Best Practices Demonstrated

### Code Organization
- Separate route files
- Modular architecture
- Clear file structure
- Consistent naming

### Security
- Environment variables for secrets
- CORS configuration
- No API keys in frontend
- Error message sanitization

### Documentation
- **CLAUDE.md:** Development guide for AI assistants
- Clear architecture overview
- Development commands
- Project structure explanation

## Extension Possibilities

### Easy Additions
1. **Authentication:** Add JWT middleware
2. **Rate Limiting:** Implement rate limits
3. **Caching:** Add Redis caching layer
4. **Logging:** Winston or Morgan logging
5. **Validation:** Request/response validation
6. **Testing:** Unit and integration tests
7. **Database:** Add database integration
8. **WebSockets:** Real-time features

### Scalability
- Add load balancer
- Implement clustering
- Database connection pooling
- Horizontal scaling ready

## Real-World Applications

- **Development Proxy:** Local development CORS proxy
- **API Gateway:** Microservices routing
- **Legacy API Wrapper:** Modernize old APIs
- **Third-Party Integration:** Proxy external services
- **Rate Limit Enforcer:** Control API usage

## Documentation Highlights

### CLAUDE.md File
Provides guidance for AI assistants including:
- Development commands
- Architecture overview
- Key components explanation
- Environment variables
- Project structure

This demonstrates:
- Developer-friendly documentation
- AI-assisted development support
- Clear project onboarding
- Maintainability focus
