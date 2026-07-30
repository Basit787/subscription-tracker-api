# Prerequisites

- Node.js (v22 or later)
- pnpm
- MongoDB
- Redis
- Docker & Docker Compose (optional)

---

# Installation

```bash
git clone https://github.com/Basit787/subscription-tracker-api.git
cd subscription-tracker-api

pnpm install
```

---

# Environment Variables

This project includes two example environment files.

## Local Development

```bash
cp .env.example .env
```

This configuration expects:

- MongoDB running on `localhost:27017`
- Redis running on `localhost:6379`

> Ensure both MongoDB and Redis are running before starting the application.

## Docker

```bash
cp .env.docker.example .env
```

This configuration uses:

- MongoDB → `mongodb`
- Redis → `redis`

---

# Running the Application

## Development

```bash
pnpm dev
```

API:

```text
http://localhost:3000
```

## Production

```bash
pnpm build
pnpm start
```

API:

```text
http://localhost:3000
```

---

# Database Seeding

Populate the database with sample users and subscriptions.

```bash
pnpm seed
```

The seed script will:

- Create sample users
- Create sample subscriptions
- Remove existing seed data before inserting fresh data

---

# API Documentation

After starting the application, open:

```text
http://localhost:3000/api/docs
```

Swagger UI allows you to explore and test all available endpoints.

---

# Testing

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

## Test Coverage

Integration tests cover:

- Authentication APIs
- Subscription CRUD APIs
- Request validation
- Authentication middleware
- Error scenarios

Coverage reports are generated in the `coverage/` directory.

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

Swagger UI:

```text
http://localhost:3000/api/docs
```