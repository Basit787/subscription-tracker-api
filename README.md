# Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (v22 or later)
- pnpm
- MongoDB
- Redis
- Docker & Docker Compose (optional)

---

# Installation

Clone the repository and install the dependencies.

```bash
git clone https://github.com/Basit787/subscription-tracker-api.git
cd subscription-tracker-api

pnpm install
```

---

# Environment Variables

This project includes two example environment files.

### 1. Local Development

Copy the local environment file:

```bash
cp .env.example .env
```

This configuration expects:

- MongoDB running on `localhost:27017`
- Redis running on `localhost:6379`

> **Note:** Ensure both MongoDB and Redis are running before starting the application.

---

### 2. Docker

Copy the Docker environment file:

```bash
cp .env.docker.example .env
```

This configuration uses the Docker service names:

- MongoDB → `mongodb`
- Redis → `redis`

No additional configuration is required.
---

# Running the Application

## Local Development

Start the development server:

```bash
pnpm dev
```

The API will be available at:

```text
http://localhost:3000
```

---

## Production

Build the application:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

The API will be available at:

```text
http://localhost:3000
```

---

# Database Seeding

Populate the database with sample users and subscriptions.

Run:

```bash
pnpm seed
```

The seed script will:

- Create sample users
- Create sample subscriptions
- Remove existing seed data before inserting fresh data

---

# API Documentation

Interactive Swagger documentation is available after starting the application.

Open:

```text
http://localhost:3000/api/docs
```

You can explore all available endpoints, request bodies, and responses directly from the browser.

---

# Running Tests

Run tests in watch mode:

```bash
pnpm test
```

Run all tests once:

```bash
pnpm test:run
```

Generate a coverage report:

```bash
pnpm test:coverage
```

---

# Running with Docker

Start all services:

```bash
docker compose up -d
```

Stop all services:

```bash
docker compose down
```

View logs:

```bash
docker compose logs -f
```

The API will be available at:

```text
http://localhost:3000
```

Swagger documentation:

```text
http://localhost:3000/api/docs
```