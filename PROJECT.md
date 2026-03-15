# Ekadash Server — Project Overview

## At a glance

- **What:** Backend API for the Ekadash mobile app (Ekadashi calendar, users, cities, push reminders).
- **Run:** `npm run dev` (needs `.env` with MongoDB and optional OneSignal vars).
- **Base URL:** All API routes live under `/ekadash_api/v1`.
- **Auth:** Every protected request needs `X-API-KEY` + `Authorization: Bearer <deviceId>`.

---

## Architecture (quick view)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  index.js  →  app.js  →  routes/index.js  →  middlewares  →  controllers    │
│     │           │              │                  │                │        │
│  dayjs     Express app    /health (no auth)   checkXApiKey      auth, user  │
│  dbConnect /ekadash_api   /logs (no auth)     checkAuth         ekadash     │
│  cron      /v1            /auth, /user,       → res.locals      city, logs  │
│                         /ekadash, /city              .deviceId             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  models (Mongoose)          config              Background (cron)            │
│  User, City, Ekadashi,      config.js           shedule/notifications.*      │
│  EkadashInfo, Moon          .env → mongoUrl,    Every minute: push check     │
│  ← MongoDB                  serverKey, OneSignal  Daily 00:00: reset flags  │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Request path for a protected route:**

1. Request hits Express → `app.js` (CORS, helmet, rate limit, body parsing).
2. Router under `/ekadash_api/v1`: `/health` and `/logs` skip auth; everything else goes through `checkXApiKey` then `checkAuth`.
3. `checkAuth` reads `Authorization: Bearer <deviceId>` and sets `res.locals.deviceId`.
4. Controller uses `res.locals.deviceId` and models to do the work.
5. Response is JSON.

---

## Key concepts

| Concept | Explanation |
|--------|-------------|
| **Device-based auth** | There is no password. The client sends a stable `deviceId` in the Bearer token. Sign up/sign in create or find a user by that `deviceId`. |
| **Two gates** | Protected routes require (1) `X-API-KEY` header matching server config, (2) `Authorization: Bearer <deviceId>`. Public: `/health`, `/logs` (logs still need to be mounted before the API-key middleware). |
| **Ekadashi data** | Calendar entries live in **Ekadashi** (year, month, day, name, exit time). Long text is in **EkadashInfo** (multilingual names/descriptions). Day endpoint populates `description_data` from EkadashInfo. |
| **Push reminders** | A cron job runs every minute. For each user with `daysRemindPush > 0` and not yet notified today, it checks if it’s 11:11 in the user’s timezone and if an Ekadashi falls in the next N days; if so, it sends a OneSignal push and sets `notifiedToday`. Another job at midnight resets `notifiedToday`. |

---

## Where things live

| Layer | Location | Role |
|-------|----------|------|
| **Entry** | `index.js` | Load app, dayjs plugins, `serverListen`, `dbConnect`, `cronScheduleInit`. |
| **App** | `app.js` | Express setup, middleware stack, mount routes at `/ekadash_api/v1`. |
| **Routes** | `routes/index.js` | Define `/health`, mount `/logs`, then apply `checkXApiKey` + `checkAuth`, then mount auth, user, ekadash, city. |
| **Middlewares** | `middlewares/` | `checkXApiKey`, `checkAuth` (sets `res.locals.deviceId`). |
| **Controllers** | `controllers/` | Auth, user, ekadash, city, logs; push logic in `controllers/notifications/`. |
| **Models** | `models/` | User, City, Ekadashi, EkadashInfo, Moon; `seed.js` has static data for EkadashInfo. |
| **Config** | `config/config.js` | Reads `.env`, exports port, mongoUrl, serverKey, OneSignal, logLevel, env flags. |
| **DB** | `connections/connections.config.js` | `dbConnect()` to MongoDB, `serverListen(app)`. |
| **Cron** | `shedule/` | Schedule definition and tasks (push sender, reset `notifiedToday`). |
| **Utils** | `utils/` | Logger, helpers (e.g. `getLocalIP`). |

---

## Purpose

Backend API for the **Ekadash** mobile application. The server provides:

- **Ekadashi calendar** — Sacred fasting days (Hindu lunar calendar) by year, month, or single day, with names and localized descriptions.
- **User accounts** — Device-based authentication (`deviceId`), language, timezone, optional email/telegram, and push reminder settings.
- **Cities** — Timezone lookup and search by name or slug for location selection.
- **Push notifications** — Scheduled reminders (via OneSignal) before Ekadashi days, localized in Russian and English.
- **Client logging** — Endpoint for the app to send log messages to the server.

---

## Features

| Feature | Description |
|--------|-------------|
| Ekadashi data | Query calendar by year, month, or exact day; day endpoint includes populated description (multilingual). |
| Auth | Sign up / sign in by `deviceId`; optional language and timezone on first use. |
| User profile | Get and update user (language, timezone, email, tg, `daysRemindPush`). |
| City search | Search cities by name or slug, limit 20 results. |
| Push reminders | Cron every minute; at 11:11 user local time, if Ekadashi in next N days → send push, set `notifiedToday`; midnight job resets `notifiedToday`. |
| Health & logs | `GET /health` for liveness; `POST /logs` to submit client log messages. |

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js (ES modules) |
| Framework | Express 4.x |
| Database | MongoDB (Mongoose 8.x) |
| Auth | Bearer token (`Authorization: Bearer <deviceId>`) + `X-API-KEY` header |
| Push | OneSignal REST API |
| Scheduling | node-cron |
| Security | helmet, cors, express-rate-limit (500 req/15 min), express-mongo-sanitize, compression |
| Logging | winston; morgan in development |
| Date/time | dayjs + utc + timezone plugins |
| Tests | Jest |
| Dev | nodemon, Prettier |

---

## API summary (base path: `/ekadash_api/v1`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | — | Liveness; returns status and time. |
| POST | `/logs` | — | Submit client log message (body: `logMessage`). |
| POST | `/auth/signUp` | X-API-KEY + Bearer | Sign up by deviceId; optional language, timezone. |
| POST | `/auth/signIn` | X-API-KEY + Bearer | Sign in by deviceId. |
| GET | `/user` | X-API-KEY + Bearer | Get current user by deviceId. |
| PATCH | `/user/update` | X-API-KEY + Bearer | Update current user. |
| GET | `/ekadash/year?year=` | X-API-KEY + Bearer | Ekadashi days for a year. |
| GET | `/ekadash/month?year=&month=` | X-API-KEY + Bearer | Ekadashi days for a month. |
| GET | `/ekadash/day?year=&month=&day=` | X-API-KEY + Bearer | Single day with populated description. |
| GET | `/city?name=` | X-API-KEY + Bearer | Search cities by name/slug (limit 20). |

---

## Version

- **Package version:** 1.1.0
