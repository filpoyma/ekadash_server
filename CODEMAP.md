# Ekadash Server — Code Map

Folder structure, module responsibilities, and dependency flow.

---

## Module dependency flow

**Top-down (who imports whom):**

```
index.js
├── app.js
│   ├── routes/index.js
│   │   ├── routes/logs.js ──────────────► controllers/logs.js ──► models/user.js (unused)
│   │   │                                    └────────────────────► controllers/notifications/api.notifications.js (unused)
│   │   ├── routes/auth.js ───────────────► controllers/auth.js ──► models/user.js, utils/logger.js
│   │   ├── routes/user.js ───────────────► controllers/user.js ──► models/user.js, controllers/notifications/api.notifications.js
│   │   ├── routes/ekadash.js ────────────► controllers/ekadash.js ► models/ekadashi.js, utils/logger.js
│   │   ├── routes/city.js ───────────────► controllers/city.js ──► models/city.js, utils/logger.js
│   │   ├── middlewares/checkXApiKey.js ──► config/config.js
│   │   └── middlewares/checkAuth.js
│   ├── utils/logger.js ─────────────────► config/config.js
│   └── config/config.js ────────────────► dotenv
│
├── connections/connections.config.js
│   ├── config/config.js
│   ├── utils/logger.js
│   └── utils/helpers.js (getLocalIP)
│
└── shedule/notifications.shedule.js
    └── shedule/tasks.js
        ├── models/ekadashi.js ──────────► models/ekadashInfo.js
        ├── models/user.js
        ├── controllers/notifications/push.controller.js
        │   ├── models/ekadashInfo.js
        │   ├── constants/app.constants.js
        │   └── controllers/notifications/api.notifications.js
        │       ├── config/config.js
        │       └── utils/logger.js
        └── dayjs
```

**Layers (no circular deps):**

| Layer | Modules | Depends on |
|-------|---------|------------|
| 0 | `config/config.js` | dotenv (external) |
| 1 | `utils/logger.js`, `utils/helpers.js` | config (logger), os (helpers) |
| 2 | `models/*.js` | mongoose; `ekadashi.js` also → `ekadashInfo.js` |
| 3 | `constants/app.constants.js` | (none internal) |
| 4 | `middlewares/*.js` | config (checkXApiKey); checkAuth has no internal deps |
| 5 | `controllers/notifications/api.notifications.js` | config, logger |
| 6 | `controllers/auth.js`, `controllers/city.js`, `controllers/ekadash.js`, `controllers/logs.js`, `controllers/user.js` | models, logger (logs also has unused imports) |
| 7 | `controllers/notifications/push.controller.js` | EkadashInfo, app.constants, api.notifications |
| 8 | `routes/*.js` | express, controllers (and index → middlewares) |
| 9 | `app.js` | routes, logger, config, express + middleware libs |
| 10 | `connections/connections.config.js` | config, logger, helpers |
| 11 | `shedule/tasks.js` | Ekadashi, User, push.controller |
| 12 | `shedule/notifications.shedule.js` | node-cron, tasks |
| 13 | `index.js` | app, connections, shedule/notifications.shedule |

---

## Dependencies by module

| Module | Imports (project) | Imported by |
|--------|-------------------|-------------|
| **config/config.js** | — | app.js, connections.config.js, logger.js, checkXApiKey.js, api.notifications.js |
| **connections/connections.config.js** | config, logger, helpers | index.js |
| **constants/app.constants.js** | — | push.controller.js |
| **utils/logger.js** | config | app.js, connections.config.js, auth.js, city.js, ekadash.js, api.notifications.js |
| **utils/helpers.js** | — | connections.config.js |
| **models/user.js** | — | auth.js, user.js, logs.js (unused), tasks.js |
| **models/city.js** | — | city.js |
| **models/ekadashi.js** | ekadashInfo | ekadash.js, tasks.js |
| **models/ekadashInfo.js** | — | ekadashi.js, push.controller.js |
| **models/moon.js** | — | (none) |
| **models/seed.js** | — | (none; data only) |
| **middlewares/checkXApiKey.js** | config | routes/index.js |
| **middlewares/checkAuth.js** | — | routes/index.js |
| **middlewares/checkNewVersion.js** | package.json | (not in route stack) |
| **controllers/auth.js** | User, logger | routes/auth.js |
| **controllers/user.js** | User, api.notifications | routes/user.js |
| **controllers/ekadash.js** | Ekadashi, logger | routes/ekadash.js |
| **controllers/city.js** | City, logger | routes/city.js |
| **controllers/logs.js** | User, api.notifications (both unused) | routes/logs.js |
| **controllers/notifications/push.controller.js** | EkadashInfo, app.constants, api.notifications | tasks.js |
| **controllers/notifications/api.notifications.js** | config, logger | user.js, push.controller.js, logs.js (unused) |
| **routes/index.js** | checkXApiKey, checkAuth, logs, auth, user, ekadash, city | app.js |
| **routes/auth.js** | controllers/auth | routes/index.js |
| **routes/user.js** | controllers/user | routes/index.js |
| **routes/ekadash.js** | controllers/ekadash | routes/index.js |
| **routes/city.js** | controllers/city | routes/index.js |
| **routes/logs.js** | controllers/logs | routes/index.js |
| **shedule/notifications.shedule.js** | tasks | index.js |
| **shedule/tasks.js** | Ekadashi, push.controller, User | notifications.shedule.js |
| **app.js** | routes, logger, config | index.js |
| **index.js** | app, connections, shedule | (entry) |

---

## Root

| File | Responsibility |
|------|----------------|
| `index.js` | Entry point: imports app, `dbConnect`, `serverListen`, `cronScheduleInit`; extends dayjs with utc and timezone; starts server, DB connection, and cron. |
| `app.js` | Express app setup: trust proxy, CORS, helmet, rate limit, body parsers, mongo-sanitize, compression, request logger; mounts routes at `/ekadash_api/v1`. |
| `package.json` | Project metadata; `type: "module"`; scripts: `dev` (nodemon), `start`, `test` (jest); dependencies and devDependencies. |

---

## config/

| File | Responsibility |
|------|----------------|
| `config.js` | Loads dotenv; exports `env`, `port`, `isDev`/`isProd`/`isTest`, `mongoUrl`, `mongoCloudUri`, `serverKey`, OneSignal ids/keys, `logLevel`. |

---

## connections/

| File | Responsibility |
|------|----------------|
| `connections.config.js` | `dbConnect()` — mongoose connect to `config.mongoUrl`; `serverListen(app)` — listen on `config.port`; logs and optional `getLocalIP` for dev. |

---

## constants/

| File | Responsibility |
|------|----------------|
| `app.constants.js` | Push notification message variants (ru/en); `getNotificationsVariants(locale, date, name)` returns title/message with placeholders (e.g. EKADASHINAME, DATE) replaced. |

---

## routes/

| File | Responsibility |
|------|----------------|
| `index.js` | Main router: GET `/health`; mounts `/logs` (no auth); then `checkXApiKey`, `checkAuth`; mounts `/auth`, `/user`, `/ekadash`, `/city`. |
| `auth.js` | POST `/signUp`, POST `/signIn`. |
| `user.js` | GET `/` (get user), PATCH `/update`. |
| `ekadash.js` | GET `/year`, `/month`, `/day` with query params. |
| `city.js` | GET `/` with query `name` (search). |
| `logs.js` | POST `/` (submit log message). |
| `index_old.js` | Legacy router; other routes commented out — consider removal or archiving. |

---

## middlewares/

| File | Responsibility |
|------|----------------|
| `checkXApiKey.js` | Returns 404 if `req.headers['x-api-key'] !== config.serverKey`; otherwise `next()`. |
| `checkAuth.js` | Returns 401 if no `Authorization` header; if header starts with `Bearer `, sets `res.locals.deviceId` from token; then `next()`. |
| `checkNewVersion.js` | Reads `clientVersion` from body; currently always calls `next()` (version check logic commented). Not used in route stack. |

---

## controllers/

| File | Responsibility |
|------|----------------|
| `index.js` | Placeholder "Server Status - OK" (e.g. for root or legacy). |
| `auth.js` | `signUp` — find or create user by deviceId; `signIn` — find user by deviceId. |
| `user.js` | `getUser` — find user (currently uses `req.params.deviceId`; should use `res.locals.deviceId`); `updateUser` — update by `res.locals.deviceId`. |
| `ekadash.js` | `getByYear`, `getByMonth`, `getByDay`; `getByDay` populates `description_data` (EkadashInfo). |
| `city.js` | `getByName` — regex search on name/slug, limit 20. |
| `logs.js` | `setLogs` — logs `req.body.logMessage`, returns acknowledgment. |
| `notifications/push.controller.js` | `sendNotification` — loads EkadashInfo, splits users by language, calls `sendPushNotification` (ru/en) with message variants. |
| `notifications/api.notifications.js` | `sendPushNotification(deviceIds, dataMessage)` — calls OneSignal REST API. |

---

## models/

| File | Responsibility |
|------|----------------|
| `user.js` | User: deviceId, language, timezone, email, tg, daysRemindPush, notifiedToday, timestamps. (Schema variable is `citySchema` — naming inconsistency.) |
| `city.js` | City: id, name, slug, zone. |
| `ekadashi.js` | Ekadashi: year, month, day, ekadasi_name, description_data (ref EkadashInfo), exit_time. |
| `ekadashInfo.js` | EkadashInfo: name (unique), name_hi/ru/en, description_ru/hi/en. |
| `moon.js` | Moon: datetime, sunrise, sunset, moonphase, moonrise, moonset. Not used by any route or controller. |
| `seed.js` | Static array (e.g. `ekNames`) for seeding EkadashInfo; no dedicated script to run it. |

---

## shedule/ (schedule — folder name typo)

| File | Responsibility |
|------|----------------|
| `notifications.shedule.js` | `cronScheduleInit`: every minute → `ekadashiPushNotificationsSender`; daily at 00:00 → `clearNotifiedToday`. |
| `tasks.js` | `ekadashiPushNotificationsSender` — users with `daysRemindPush > 0`, `!notifiedToday`; at 11:11 user local time, if Ekadashi in next N days → send push, set `notifiedToday`; `clearNotifiedToday` — reset `notifiedToday` for all users. |

---

## utils/

| File | Responsibility |
|------|----------------|
| `logger.js` | Winston logger (level from config; console + file in production). |
| `helpers.js` | `clearArray`, `getMonthStrByNum`, `getLocalIP`. |
| `performance.js` | Small performance snippet (e.g. perf_hooks); not wired into handlers. |

---

## tests/

| File | Responsibility |
|------|----------------|
| `getEnglishText.test.js` | Single test; imports from `../../front/src/` and hits `/englishText` — path and endpoint not part of current server API; likely obsolete. |

---

## Other

| Item | Note |
|------|------|
| `.gitignore` | node_modules, *.log, .env, .DS_Store, package-lock.json, .idea/ |
| `.prettierrc` | semi, singleQuote, trailingComma none, printWidth 100 |
| `.idea/` | IDE config; not part of application logic |
