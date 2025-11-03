---
title: 'Enterprise API Key Management System'
subtitle: "Production-ready FastAPI server with RBAC and security monitoring"
summary: "Built a comprehensive API key management system with role-based access control, multi-key support, and advanced security features including account protection and audit logging."
author: Uday
date: '2025-09-11'
slug: api-key-management
categories:
  - Backend
  - Security
  - API Development
tags:
  - FastAPI
  - PostgreSQL
  - RBAC
  - Security
  - Python
---

![](https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=400&fit=crop)

<div class="project-highlights">
  <div class="highlight-stat">
    <span class="stat-number">21+</span>
    <span class="stat-label">Granular permissions</span>
  </div>
  <div class="highlight-stat">
    <span class="stat-number">Multi-key</span>
    <span class="stat-label">API key management</span>
  </div>
  <div class="highlight-stat">
    <span class="stat-number">RBAC</span>
    <span class="stat-label">Role-based access control</span>
  </div>
</div>

## The Challenge

Enterprise APIs need robust security and access control:
- **Key sprawl**: Multiple API keys across teams without centralized management
- **No granular control**: All-or-nothing access instead of permission-based
- **Security gaps**: No tracking of failed attempts or suspicious activity
- **Audit requirements**: Compliance needs for usage logging and monitoring

## The Solution

Built a production-ready FastAPI server with comprehensive API key management featuring:
- **Multi-API key support** with secure hashing and database backing
- **Role-based access control (RBAC)** with 21+ default permissions across 8 categories
- **Security monitoring** with account locking, failed login tracking, and activity logging
- **Admin interface** for system management and user oversight

### Architecture

```python
[Client Request]
    ↓ (API Key in Header)
[Authentication Middleware]
    ↓ (Verify & Hash Check)
[Permission Validator]
    ↓ (Check RBAC Permissions)
[Rate Limiter / Usage Logger]
    ↓
[Protected Endpoint]
    ↓
[PostgreSQL Database]
```

**Tech Stack**: FastAPI, PostgreSQL, AsyncIO, SQLAlchemy, Alembic, Docker

## Key Features

### Multi-API Key Management
```python
class APIKey:
    id: UUID
    user_id: UUID
    key_hash: str  # Securely hashed
    name: str  # e.g., "Production API", "Dev Environment"
    permissions: JSONB  # Granular permission array
    last_used: timestamp
    expiration_date: Optional[date]
    is_active: bool
```

### Permission Categories (21+ Permissions)
- **User Management**: Create, read, update, delete users
- **API Key Operations**: Generate, revoke, list keys
- **Permissions Management**: Assign, revoke permissions
- **System Monitoring**: Health checks, diagnostics
- **Logs Management**: View, export audit logs
- **System Administration**: System configuration
- **Analytics**: Usage reports, metrics
- **Protected Operations**: Sensitive operations

### Security Features

**Account Protection**:
```python
class SecurityMonitor:
    def track_login_attempt(self, api_key: str, success: bool):
        if not success:
            failed_attempts[api_key] += 1
            if failed_attempts[api_key] >= MAX_ATTEMPTS:
                lock_account(api_key)
                trigger_security_alert(api_key)
```

**Usage Tracking**:
- Every API call logged with timestamp, endpoint, user, result
- Security events detection (unusual patterns, brute force attempts)
- Real-time monitoring dashboard

### Database Schema

```sql
-- Core tables
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    api_key_hash VARCHAR(255) NOT NULL,
    subscription_tier VARCHAR(50),
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE api_keys (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    key_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    permissions JSONB NOT NULL,
    last_used TIMESTAMP,
    expiration_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE api_usage (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    api_key_id UUID REFERENCES api_keys(id),
    endpoint VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL,
    status_code INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## Implementation Highlights

### Async Permission Checker
```python
from fastapi import Header, HTTPException
from typing import List

async def check_permissions(
    required_permissions: List[str],
    api_key: str = Header(alias="X-API-Key")
) -> User:
    # Verify API key
    key_record = await db.get_api_key(api_key)
    if not key_record or not key_record.is_active:
        raise HTTPException(status_code=401, detail="Invalid API key")

    # Check if account is locked
    user = await db.get_user(key_record.user_id)
    if user.is_locked:
        raise HTTPException(status_code=403, detail="Account locked")

    # Verify permissions
    user_permissions = set(key_record.permissions)
    required = set(required_permissions)
    if not required.issubset(user_permissions):
        raise HTTPException(status_code=403, detail="Insufficient permissions")

    # Log usage
    await log_api_usage(user, key_record, request)

    return user
```

### Protected Endpoints
```python
@app.get("/api/v1/users")
async def list_users(
    user: User = Depends(check_permissions(["users:read"]))
):
    return await db.query_users()

@app.delete("/api/v1/users/{user_id}")
async def delete_user(
    user_id: UUID,
    user: User = Depends(check_permissions(["users:delete"]))
):
    return await db.delete_user(user_id)

@app.get("/api/v1/admin/analytics")
async def get_analytics(
    user: User = Depends(check_permissions(["admin", "analytics:read"]))
):
    return await analytics_service.generate_report()
```

### API Key Generation
```python
import secrets
import hashlib

def generate_api_key(user_id: UUID, name: str, permissions: List[str]):
    # Generate secure random key
    raw_key = secrets.token_urlsafe(32)

    # Hash for storage (never store plain text)
    key_hash = hashlib.sha256(raw_key.encode()).hexdigest()

    # Store in database
    api_key_record = await db.create_api_key(
        user_id=user_id,
        key_hash=key_hash,
        name=name,
        permissions=permissions
    )

    # Return raw key ONCE (user must save it)
    return {
        "api_key": raw_key,  # Only shown once
        "name": name,
        "permissions": permissions,
        "created_at": api_key_record.created_at
    }
```

## API Structure

### Public Endpoints
- `GET /health` - Health check
- `GET /status` - System status

### User Endpoints
- `GET /api/v1/profile` - User profile
- `GET /api/v1/orders` - User orders
- `POST /api/v1/api-keys` - Generate new API key
- `GET /api/v1/api-keys` - List user's API keys

### Admin Endpoints
- `GET /api/v1/admin/users` - User management
- `GET /api/v1/admin/analytics` - System analytics
- `POST /api/v1/admin/permissions` - Permission management
- `GET /api/v1/admin/logs` - Security audit logs

## DevOps & Infrastructure

### Docker Setup
```yaml
# docker-compose.yml
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - SECRET_KEY=${SECRET_KEY}
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=api_keys
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

### Database Migrations
- **Alembic** for version-controlled schema changes
- Automatic migration on deployment
- Rollback support for failed migrations

## Business Value

### Security Benefits
- **Zero plaintext keys stored** - All keys securely hashed
- **Granular access control** - 21+ permission levels
- **Audit trail** - Complete logging for compliance
- **Account protection** - Auto-locking on suspicious activity

### Operational Efficiency
- **Self-service key management** - Users generate own keys
- **Easy permission updates** - No code changes needed
- **Usage analytics** - Track API consumption patterns
- **Multi-environment support** - Separate keys for dev/staging/prod

### Scalability
- **Async architecture** - Handle thousands of concurrent requests
- **Connection pooling** - Efficient database usage
- **Horizontal scaling** - Stateless API design

## Technical Decisions

### Why FastAPI?
- **Async support** for high performance
- **Automatic API docs** (Swagger UI, ReDoc)
- **Type safety** with Pydantic models
- **Modern Python** (3.10+) with async/await

### Why PostgreSQL?
- **JSONB support** for flexible permission storage
- **ACID compliance** for security-critical operations
- **Mature ecosystem** with excellent Python support

---

*Enterprise-grade API security with developer-friendly management*
