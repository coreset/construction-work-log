# Construction Work Log

A full-stack web application for construction site foremen to log daily work records.

## Quick Start

### Prerequisites
- Node.js 20+ and npm (for development)
- Docker and docker-compose (for containerized setup)
- Neon database connection string

### With Docker (recommended)

```bash
# 1. Create root .env file
echo "DATABASE_URL=<your-neon-connection-string>" > .env

# 2. Start all services
docker-compose up --build
```

The app will be available at **http://localhost:5173**

### Without Docker (development)

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend (new terminal):**
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/work-entries | List entries (supports `?from=&to=&sort=`) |
| POST | /api/work-entries | Create entry |
| PUT | /api/work-entries/:id | Update entry |
| DELETE | /api/work-entries/:id | Delete entry |
| GET | /api/work-types | List work type reference book |