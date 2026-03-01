# Simple CRUD

A CRUD application built with Spring Boot (backend) and React (frontend).

## Stack

- **Backend:** Java 21, Spring Boot 3.4, Spring Data JPA, PostgreSQL, Lombok
- **Frontend:** React, Vite, TanStack Query, shadcn/ui, Tailwind CSS
- **Database:** PostgreSQL 16
- **Infrastructure:** Docker, Docker Compose

## Running the app

### Docker — production build

Requirements: [Docker](https://www.docker.com/)

```bash
docker compose up --build
```

- Frontend: http://localhost
- Backend API: http://localhost:8080/api/items

### Docker — development (live reload)

Frontend reflects code changes instantly without rebuilding the container.

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api/items

### Locally

Requirements: Java 21+, Maven, Node.js 20+, PostgreSQL

**1. Start the database via Docker:**
```bash
docker compose up postgres
```

**2. Backend** (terminal 1):
```bash
cd backend
mvn spring-boot:run
```

**3. Frontend** (terminal 2):
```bash
cd frontend
npm install
npm run dev
```

Vite starts at **http://localhost:5173**, backend API at **http://localhost:8080/api/items**.

## API

| Method | Endpoint          | Description       |
|--------|-------------------|-------------------|
| GET    | /api/items        | Get all items     |
| GET    | /api/items/{id}   | Get item by ID    |
| POST   | /api/items        | Create item       |
| PUT    | /api/items/{id}   | Update item       |
| DELETE | /api/items/{id}   | Delete item       |

### Example (POST /api/items)

```json
{
  "name": "Example item",
  "description": "Item description"
}
```
