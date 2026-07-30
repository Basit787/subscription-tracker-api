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

---

## Testing

Run tests in watch mode:

```bash
pnpm test
```

Run all tests once:

```bash
pnpm test:run
```

Generate a test coverage report:

```bash
pnpm test:coverage
```

### Test Coverage

The project includes integration tests for:

- Authentication APIs
- Subscription CRUD APIs
- Request validation
- Authentication middleware
- Error scenarios

Coverage reports are generated in the `coverage/` directory.