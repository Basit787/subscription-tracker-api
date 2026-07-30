# Authentication

## Overview

The application uses **JWT-based authentication** with **Access Tokens** and **Refresh Tokens** to securely authenticate users.

- **Access Token**
  - Short-lived JWT used to access protected APIs.
  - Sent in the `Authorization` header.

- **Refresh Token**
  - Long-lived JWT used to generate new access tokens.
  - Stored as an **HTTP-only cookie**.
  - The hashed refresh token is stored in the database for additional security.

---

# Authentication Flow

```text
Register
      │
      ▼
Validate Request
      │
      ▼
Hash Password (bcrypt)
      │
      ▼
Save User
```

```text
Login
      │
      ▼
Validate Credentials
      │
      ▼
Generate Access Token
      │
      ▼
Generate Refresh Token
      │
      ▼
Hash Refresh Token
      │
      ▼
Store Hash in Database
      │
      ▼
Return Access Token
      │
      ▼
Set Refresh Token as HTTP-only Cookie
```

---

# Registration

When a user registers:

1. The request is validated using Zod.
2. The password is hashed using bcrypt.
3. The user is saved in MongoDB.
4. The password is never stored in plain text.

---

# Login

When a user logs in:

1. The email and password are validated.
2. The hashed password is compared using bcrypt.
3. An Access Token is generated.
4. A Refresh Token is generated.
5. The Refresh Token is hashed.
6. The hashed Refresh Token is stored in the database.
7. The original Refresh Token is sent as an HTTP-only cookie.
8. The Access Token is returned in the response body.

---

# Access Token

The Access Token is used to authenticate requests to protected endpoints.

Example:

```http
Authorization: Bearer <access_token>
```

Characteristics:

- Short-lived
- Signed using JWT
- Stateless
- Not stored in the database

---

# Refresh Token

The Refresh Token is responsible for generating new Access Tokens after the current Access Token expires.

Characteristics:

- Long-lived
- Stored as an HTTP-only cookie
- Hashed before being stored in MongoDB
- Verified before issuing a new Access Token

---

# Refresh Token Flow

```text
Client
      │
Expired Access Token
      │
      ▼
POST /auth/refresh
      │
      ▼
Read Refresh Token Cookie
      │
      ▼
Verify JWT
      │
      ▼
Compare Hashed Token
      │
      ▼
Generate New Access Token
      │
      ▼
Return New Access Token
```

---

# Logout

When a user logs out:

1. The Refresh Token cookie is cleared.
2. The stored hashed Refresh Token is removed from the database.
3. The Refresh Token can no longer be used to obtain new Access Tokens.

---

# Protected Routes

Protected endpoints require a valid Access Token.

Authentication flow:

```text
Client
      │
Authorization Header
      │
      ▼
Authentication Middleware
      │
Verify JWT
      │
      ▼
User Attached to res.locals
      │
      ▼
Controller
```

If the Access Token is invalid or expired, the request is rejected with an authentication error.

---

# Security Measures

The authentication system follows several security best practices:

- Passwords are hashed using bcrypt.
- Refresh Tokens are hashed before being stored.
- Refresh Tokens are stored as HTTP-only cookies.
- Access Tokens are short-lived.
- Protected routes require JWT authentication.
- Invalid or expired tokens are rejected.
- Passwords are excluded from query results by default.

---

# Authentication Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Authenticate a user |
| POST | `/auth/refresh` | Generate a new Access Token |
| POST | `/auth/logout` | Logout the current user |