# NEXCORD - WIP - At this Time not Ready for USE

> **Where Communities Evolve.**

NEXCORD is a modern, open-source community & real-time communication platform. It is a fully independent platform built with its own design identity, featuring **Text Streams**, **Voice Rooms**, **Event Stages**, and a rich **Roles & Permissions** system.

---

## ✨ Features

| Feature | Status |
|---|---|
| Auth (JWT + Argon2) | ✅ |
| Spaces (community units) | ✅ |
| Text Streams (real-time chat via WebSocket) | ✅ |
| Voice Rooms (WebRTC-ready) | ✅ |
| Event Stage channels | ✅ |
| Roles & Permission matrix | ✅ |
| Member management | ✅ |
| Swagger API docs | ✅ |
| Docker Compose (self-hosted) | ✅ |
| nginx reverse proxy | ✅ |

---

## 🗂 Project Structure

```
NEXCORD/
├── backend/          # NestJS API (REST + WebSocket)
├── frontend/         # Next.js 15 App Router
├── nginx/            # Reverse proxy config
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)

### Option 1 — Docker (Recommended)

```bash
# Clone the repo
git clone https://github.com/QuantumShadex/NEXCORD.git
cd NEXCORD

# Copy and configure environment
cp .env.example .env
# Edit .env and set a strong JWT_SECRET

# Start all services
docker compose up -d

# Open in browser
open http://localhost
```

Services started:
| Service | URL |
|---|---|
| Frontend | http://localhost |
| Backend API | http://localhost/api |
| Swagger Docs | http://localhost/api/docs |
| MinIO Console | http://localhost:9001 |

### Option 2 — Local Development

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your local DB/Redis credentials

npm install
npm run start:dev
# API: http://localhost:4000/api
# Swagger: http://localhost:4000/api/docs
```

**Frontend:**
```bash
cd frontend
# .env.local is pre-configured for local dev

npm install
npm run dev
# App: http://localhost:3000
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `4000` | API server port |
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_USER` | `nexcord` | PostgreSQL user |
| `DB_PASSWORD` | `nexcord` | PostgreSQL password |
| `DB_NAME` | `nexcord` | Database name |
| `JWT_SECRET` | — | **Required.** JWT signing secret |
| `REDIS_URL` | `redis://localhost:6379` | Redis connection URL |
| `FRONTEND_URL` | `http://localhost:3000` | CORS allowed origin |

### Frontend (`frontend/.env.local`)

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000/api` | Backend API base URL |
| `NEXT_PUBLIC_WS_URL` | `http://localhost:4000` | WebSocket server URL |

---

## 🗄 Database Schema

```
users         → id, username, email, password_hash, avatar_url, verified
spaces        → id, name, description, icon_url, theme_color, is_private, owner_id
memberships   → id, user_id, space_id, role_id
roles         → id, space_id, name, color, position, permissions (JSONB)
streams       → id, space_id, type, name, topic, position, is_private
messages      → id, stream_id, author_id, content, reply_to, reactions, pinned
```

---

## 🏛 Architecture

```
                    ┌─────────┐
                    │  nginx  │  :80
                    └────┬────┘
              ┌──────────┴──────────┐
              ▼                     ▼
         ┌──────────┐         ┌──────────┐
         │ frontend │         │ backend  │
         │ Next.js  │         │ NestJS   │
         │  :3000   │         │  :4000   │
         └──────────┘         └────┬─────┘
                              ┌────┴─────────────┐
                              ▼                   ▼
                         ┌──────────┐       ┌──────────┐
                         │PostgreSQL│       │  Redis   │
                         │  :5432   │       │  :6379   │
                         └──────────┘       └──────────┘
```

---

## 🔐 Security

- Passwords hashed with **Argon2** (winner of the Password Hashing Competition)
- JWT tokens with 7-day expiry, signed with `JWT_SECRET`
- `class-validator` DTO validation on all API inputs
- XSS protection via strict input validation
- CORS restricted to configured `FRONTEND_URL`
- Rate limiting on nginx (30 req/s)

---

## 📡 API Reference

Full interactive API documentation is available at `/api/docs` (Swagger UI) when the backend is running.

Key endpoints:

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new account |
| `POST` | `/api/auth/login` | Login and get JWT |
| `GET` | `/api/users/@me` | Get current user profile |
| `GET` | `/api/spaces` | List your spaces |
| `POST` | `/api/spaces` | Create a space |
| `GET` | `/api/spaces/:id` | Get space details |
| `POST` | `/api/spaces/:id/join` | Join a public space |
| `GET` | `/api/spaces/:id/members` | List space members |
| `GET` | `/api/spaces/:id/streams` | List streams in a space |
| `POST` | `/api/spaces/:id/streams` | Create a stream |
| `GET` | `/api/streams/:id/messages` | Get messages |
| `POST` | `/api/streams/:id/messages` | Send a message |
| `GET` | `/api/spaces/:id/roles` | List roles |
| `POST` | `/api/spaces/:id/roles` | Create a role |

### WebSocket Events (Socket.IO)

| Event | Direction | Payload |
|---|---|---|
| `join_stream` | Client → Server | `{ streamId }` |
| `leave_stream` | Client → Server | `{ streamId }` |
| `send_message` | Client → Server | `{ streamId, content, authorId }` |
| `new_message` | Server → Client | Message object |

---

## 🎨 Design

NEXCORD uses its own design language:

- **Primary:** Neon Indigo `#6366f1`
- **Accent:** Cyber Mint `#06b6d4`
- **Background:** Deep Space `#0f0f1a`
- **Surface:** `#16162a`, `#1e1e35`, `#252540`
- **Typography:** Inter, system-ui

---

## 📜 License

MIT © NEXCORD Contributors
