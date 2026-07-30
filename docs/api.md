# API Reference

## Base URL

```text
http://localhost:3000
```

> Replace the port if you have configured a different value in your environment variables.

---

### Open Swagger UI

```
http://localhost:3000/api/docs
```

Swagger allows you to:

- View all available endpoints
- Execute API requests directly from the browser
- Inspect request/response schemas
- Test authenticated endpoints

---

# Health Endpoint

## Health Check

**Method**

```http
GET
```

**Route**

```text
/api/health
```

**Description**

Returns the current health status of the application.

**Authentication**

Not Required

---

# Authentication Endpoints

## Register

**Method**

```http
POST
```

**Route**

```text
/api/auth/register
```

**Description**

Creates a new user account.

**Authentication**

Not Required

---

## Login

**Method**

```http
POST
```

**Route**

```text
/api/auth/login
```

**Description**

Authenticates a user and issues authentication cookies.

**Authentication**

Not Required

---

## Refresh Token

**Method**

```http
POST
```

**Route**

```text
/api/auth/refresh
```

**Description**

Generates a new Access Token using the Refresh Token stored in the HTTP-only cookie.

**Authentication**

Refresh Token Cookie Required

---

## Logout

**Method**

```http
POST
```

**Route**

```text
/api/auth/logout
```

**Description**

Logs out the authenticated user by clearing authentication cookies and invalidating the stored Refresh Token.

**Authentication**

Required

---

## Get Current User

**Method**

```http
GET
```

**Route**

```text
/api/auth/me
```

**Description**

Returns the details of the currently authenticated user.

**Authentication**

Required

---

# Subscription Endpoints

## Create Subscription

**Method**

```http
POST
```

**Route**

```text
/api/subscriptions
```

**Description**

Creates a subscription for the authenticated user.

**Authentication**

Required

---

## Get All Subscriptions

**Method**

```http
GET
```

**Route**

```text
/api/subscriptions
```

**Description**

Returns a paginated list of subscriptions.

**Authentication**

Required

---

## Get Subscription by ID

**Method**

```http
GET
```

**Route**

```text
/api/subscriptions/:id
```

**Description**

Returns a subscription by its ID.

**Authentication**

Required

---

## Update Subscription Status

**Method**

```http
PATCH
```

**Route**

```text
/api/subscriptions/:id
```

**Description**

Updates the status of a subscription.

**Authentication**

Required

---

# Authentication Flow

This project uses **HTTP-only cookies** for authentication.

### Login

- Send a request to the Login endpoint.
- The server validates the credentials.
- Authentication cookies are returned automatically.

### Authenticated Requests

- Postman automatically stores the cookies.
- Cookies are included with subsequent requests.
- No manual configuration is required after logging in.

---

# HTTP Status Codes

| Code    | Description                    |
| ------- | ------------------------------ |
| **200** | Request completed successfully |
| **201** | Resource created successfully  |
| **400** | Validation failed              |
| **401** | Authentication failed          |
| **404** | Resource not found             |
| **409** | Resource already exists        |
| **500** | Internal server error          |

---

# Testing the API

A Postman collection is included with the project.

### Steps

1. Open **Postman**.
2. Click **Import**.
3. Import:

```text
postman/subscription-tracker-api.postman_collection.json
```

4. Start the application.
5. Execute the requests in the following order:

```text
Health
↓
Register (Optional)
↓
Login
↓
Subscription Endpoints
```

> **Note:** After logging in, Postman automatically stores the authentication cookies, so no additional authentication setup is required for subsequent requests.
