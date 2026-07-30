# Background Jobs

## Overview

The application uses **BullMQ** with **Redis** to execute scheduled background tasks asynchronously.

Background jobs run independently of API requests, allowing time-consuming or recurring tasks to be processed without affecting API response times.

The current implementation automatically expires subscriptions that have been active for more than **30 days**.

---

# Why Background Jobs?

Some operations do not need to run during an API request.

Instead of checking subscription expiration every time a user interacts with the application, a background worker periodically performs this task.

Benefits include:

- Improved API performance
- Reduced database operations during requests
- Automatic execution of scheduled tasks
- Better scalability

---

# BullMQ Components

The background job system consists of three main components.

## Queue

The queue stores jobs that need to be processed.

In this project, a subscription queue is responsible for handling subscription expiration tasks.

---

## Scheduler

The scheduler automatically adds a job to the queue at a fixed interval.

Current configuration:

- Interval: Every **5 minutes**
- Job: Check for expired subscriptions

---

## Worker

The worker listens for incoming jobs from the queue.

When a job is received, it:

1. Finds subscriptions that have been active for more than 30 days.
2. Updates their status from **ACTIVE** to **EXPIRED**.
3. Logs the number of updated subscriptions.

---

# Job Execution Flow

```text
Application Starts
        │
        ▼
Redis Connection Established
        │
        ▼
Queue Created
        │
        ▼
Worker Started
        │
        ▼
Scheduler Registered
        │
        ▼
Every 5 Minutes
        │
        ▼
Job Added to Queue
        │
        ▼
Worker Processes Job
        │
        ▼
Find Expired Subscriptions
        │
        ▼
Update Status to EXPIRED
        │
        ▼
Log Result
```

---

# Redis

BullMQ uses Redis as its message broker.

Redis is responsible for:

- Managing job queues
- Scheduling recurring jobs
- Delivering jobs to workers
- Tracking job execution

Without Redis, BullMQ cannot process background jobs.

---

# Subscription Expiration

The worker periodically checks for subscriptions that satisfy the following conditions:

- Status is **ACTIVE**
- Start date is older than **30 days**

Matching subscriptions are automatically updated to:

```text
ACTIVE
    │
    ▼
EXPIRED
```

No user interaction is required for this process.

---

# Error Handling

The worker listens for BullMQ events to improve monitoring.

Supported events include:

- Worker errors
- Job failures

These events are logged to help identify issues during background job execution.

---

# Logging

Pino is used to log background job activity.

Example information recorded includes:

- Number of subscriptions updated
- Worker failures
- Unexpected errors

This helps monitor the health and execution of scheduled jobs.

---

# Current Background Jobs

| Job | Schedule | Description |
|------|----------|-------------|
| Subscription Expiry | Every 5 minutes | Marks subscriptions older than 30 days as expired |