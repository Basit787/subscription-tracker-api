# Subscription Module

## Overview

The Subscription module allows authenticated users to manage their subscriptions.

Each user can have **only one active subscription record**, ensuring a one-to-one relationship between a user and their subscription.

The module supports:

- Creating a subscription
- Retrieving all subscriptions
- Retrieving a subscription by ID
- Updating the subscription status
- Automatic subscription expiration using a background job

---

# Subscription Lifecycle

```text
Create Subscription
        │
        ▼
Validate Request
        │
        ▼
Calculate Amount
        │
        ▼
Save Subscription
        │
        ▼
Status: ACTIVE
        │
        ▼
30 Days Elapsed
        │
        ▼
Background Job
        │
        ▼
Status: EXPIRED
```

---

# Subscription Schema

Each subscription contains the following fields:

| Field | Description |
|--------|-------------|
| `userId` | Reference to the subscribed user |
| `planName` | Selected subscription plan |
| `amount` | Price calculated from the selected plan |
| `status` | Current subscription status |
| `startDate` | Date the subscription starts |
| `createdAt` | Record creation timestamp |
| `updatedAt` | Record update timestamp |

---

# Subscription Plans

The application supports predefined subscription plans.

Each plan has a fixed price configured on the server.

The subscription amount is **calculated automatically** based on the selected plan instead of being provided by the client.

This prevents users from modifying subscription prices.

---

# Subscription Status

A subscription can be in one of the following states:

- **ACTIVE** – The subscription is currently valid.
- **EXPIRED** – The subscription has expired after 30 days.

---

# Creating a Subscription

Workflow:

```text
Authenticated User
        │
        ▼
Validate Request
        │
        ▼
Check Existing Subscription
        │
        ▼
Calculate Amount
        │
        ▼
Save Subscription
        │
        ▼
Return Created Subscription
```

During creation:

- The user must be authenticated.
- Request data is validated using Zod.
- The amount is calculated automatically.
- Only one subscription is allowed per user.

---

# Retrieving Subscriptions

The module supports:

- Retrieving all subscriptions
- Retrieving a subscription by its ID

The list endpoint supports pagination to efficiently handle large datasets.

Pagination response includes:

- Current page
- Items per page
- Total records
- Total pages

---

# Updating a Subscription

The update endpoint allows changing the subscription status.

Workflow:

```text
Validate Request
        │
        ▼
Find Subscription
        │
        ▼
Update Status
        │
        ▼
Return Updated Subscription
```

---

# Automatic Expiration

Subscription expiration is handled automatically by a BullMQ background job.

Every **5 minutes**, the worker checks for subscriptions that have been active for more than **30 days**.

Matching subscriptions are automatically updated from:

```text
ACTIVE
    │
    ▼
EXPIRED
```

This process runs independently of user requests and requires no manual intervention.

---

# Validation

Incoming requests are validated using Zod before reaching the business logic.

Validation includes:

- Valid subscription plan
- Valid subscription status
- Valid ObjectId parameters
- Valid dates

Invalid requests are rejected before any database operation is performed.

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/subscriptions` | Create a subscription |
| GET | `/subscriptions` | Get all subscriptions |
| GET | `/subscriptions/:id` | Get a subscription by ID |
| PATCH | `/subscriptions/:id` | Update subscription status |