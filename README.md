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

## Local Development

Copy the local environment file:

```bash
cp .env.example .env
```

This configuration expects:

- MongoDB running on `localhost:27017`
- Redis running on `localhost:6379`

> **Note:** Make sure both MongoDB and Redis are running before starting the application.

---

## Docker

Copy the Docker environment file:

```bash
cp .env.docker.example .env
```

This configuration uses the Docker service names:

- MongoDB → `mongodb`
- Redis → `redis`

No additional changes are required.

---

# Running the Application

## Local Development

Start the development server:

```bash
pnpm dev
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