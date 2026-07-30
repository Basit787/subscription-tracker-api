# Architecture

## Overview

The Subscription Tracker API follows a layered architecture to separate responsibilities and keep the codebase maintainable, scalable, and easy to test.

Each layer has a single responsibility:

- **Routes** define the API endpoints.
- **Validators** validate incoming requests.
- **Controllers** handle HTTP requests and responses.
- **Services** contain business logic.
- **Models** interact with MongoDB.
- **Middleware** handles cross-cutting concerns such as authentication and error handling.
- **Jobs** execute background tasks using BullMQ.

---

# Project Structure

```text
src/
├── config/          # Application configuration
├── controllers/     # HTTP request handlers
├── jobs/            # BullMQ queues and workers
├── middleware/      # Authentication & error handling
├── models/          # Mongoose schemas
├── routes/          # Express routes
├── services/        # Business logic
├── types/           # Shared TypeScript types
├── utils/           # Helper functions
├── validators/      # Zod validation schemas
├── app.ts           # Express application
└── server.ts        # Application entry point
```

---

# Request Lifecycle

Every incoming request follows the same flow through the application.

```text
Client
   │
   ▼
Express Route
   │
   ▼
Request Validation (Zod)
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Mongoose Model
   │
   ▼
MongoDB
```

### 1. Route

Routes define the available API endpoints and map each endpoint to its corresponding controller.

Example:

```text
POST /auth/login
        │
        ▼
AuthController.login()
```

---

### 2. Validation

Incoming request bodies, query parameters, and route parameters are validated using **Zod** before reaching the controller.

Invalid requests immediately return a validation error.

---

### 3. Controller

Controllers handle HTTP-specific logic.

Responsibilities include:

- Reading request data
- Calling service methods
- Returning HTTP responses

Controllers do **not** contain business logic.

---

### 4. Service

Services contain the application's business logic.

Examples include:

- Registering users
- Authenticating users
- Creating subscriptions
- Updating subscription status

Services interact directly with the database through Mongoose models.

---

### 5. Database

Mongoose models communicate with MongoDB to perform database operations such as:

- Create
- Read
- Update
- Delete

---

# Authentication Flow

Protected routes are secured using JWT authentication.

```text
Client
   │
Access Token
   │
   ▼
Authentication Middleware
   │
Verify JWT
   │
   ▼
Controller
```

If the token is valid, the authenticated user is attached to `res.locals` and made available to downstream controllers.

---

# Error Handling

The application uses a centralized global error handler.

Errors from controllers and services are automatically forwarded to the error middleware.

Supported error types include:

- Custom API errors
- Zod validation errors
- Mongoose validation errors
- MongoDB duplicate key errors
- Invalid ObjectId errors
- Unexpected server errors

This ensures consistent error responses throughout the application.

---

# Background Jobs

BullMQ is used to execute scheduled background tasks.

Current background job:

- Automatically expires subscriptions that have been active for more than **30 days**.

Workflow:

```text
Application Starts
        │
        ▼
BullMQ Queue Created
        │
        ▼
Worker Started
        │
        ▼
Scheduler Registered
        │
        ▼
Runs Every 5 Minutes
        │
        ▼
Update Expired Subscriptions
```

Running subscription expiration in the background prevents long-running database operations from affecting API response times.

---

# Design Principles

This project follows several architectural principles:

- Separation of concerns
- Layered architecture
- Centralized error handling
- Reusable validation
- Stateless JWT authentication
- Background processing for scheduled tasks
- Clear project structure for maintainability and scalability