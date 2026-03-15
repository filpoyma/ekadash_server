# Ekadash Server — Tasks

Missing features, bugs, and technical improvements. No code changes were made; this is a documentation-only list.

---

## Bugs / Correctness

### 1. User controller — wrong deviceId source in getUser

**File:** `controllers/user.js`  
**Issue:** `getUser` uses `req.params.deviceId`, but the route is `GET /user` (no `:deviceId` param). After `checkAuth`, the deviceId is in `res.locals.deviceId`.  
**Change:** Use `res.locals.deviceId` in `getUser`, consistent with `updateUser`.

### 2. checkAuth can call next() without setting deviceId

**File:** `middlewares/checkAuth.js`  
**Issue:** If `Authorization` is present but does not start with `Bearer `, `res.locals.deviceId` is never set, yet `next()` is called. Handlers that rely on `res.locals.deviceId` may run with it undefined.  
**Change:** Only call `next()` when the header is valid Bearer and `deviceId` is set; otherwise respond with 401.

---

## Technical debt / Quality

### 3. Replace console.log / console.error with logger

**Files:** e.g. `controllers/user.js`, `controllers/logs.js`, `controllers/notifications/api.notifications.js`, and any cron/task code.  
**Change:** Use the project logger from `utils/logger.js` instead of `console.log` / `console.error` for consistency and log level control.

### 4. Fix folder typo: shedule → schedule

**Folder:** `shedule/`  
**Files:** `shedule/notifications.shedule.js`  
**Change:** Rename folder to `schedule` and file to `notifications.schedule.js`; update all imports (e.g. in `index.js`).

### 5. Fix or remove obsolete test

**File:** `tests/getEnglishText.test.js`  
**Issue:** Imports from `../../front/src/` and calls an endpoint (e.g. `/englishText`) that does not exist in current routes.  
**Change:** Update test to use current API and correct paths, or remove if no longer relevant.

### 6. checkNewVersion middleware unused

**File:** `middlewares/checkNewVersion.js`  
**Issue:** Imported in routes index but not used in the route stack; version check logic is commented.  
**Change:** Either wire it where needed (e.g. auth or version check) or remove the import and the middleware.

### 7. User model schema naming

**File:** `models/user.js`  
**Issue:** Schema variable is named `citySchema` while the model is User (likely copy-paste from City).  
**Change:** Rename to `userSchema` for clarity.

---

## Missing features / Unused code

### 8. Moon model has no routes or controllers

**File:** `models/moon.js`  
**Issue:** No route or controller uses the Moon model.  
**Change:** Either add moon-related endpoints (e.g. moon phase by date), or document/remove if intentionally unused.

### 9. Remove or archive index_old.js

**File:** `routes/index_old.js`  
**Issue:** Legacy router with commented routes; not used in app.  
**Change:** Remove or move to a legacy/archive folder.

### 10. performance.js not integrated

**File:** `utils/performance.js`  
**Issue:** Contains a small performance snippet but is not used in any handler.  
**Change:** Use it for key endpoints (e.g. timing) or remove to avoid dead code.

---

## Documentation and operations

### 11. Environment variables contract

**Issue:** No single place listing required env vars.  
**Change:** Add a short README section or `.env.example` with: `PORT`, `NODE_ENV`, `MONGODB_DEV_URI`, `MONGODB_PROD_URI`, `MONGODB_CLOUD_URI`, `SERVER_KEY`, `ONESIGNAL_APP_ID`, `ONESIGNAL_REST_API_KEY`, `LOG_LEVEL`.

### 12. Seed script entry point

**File:** `models/seed.js`  
**Issue:** Seed data for EkadashInfo exists but there is no npm script or entry (e.g. `scripts/seed.js`) to run it.  
**Change:** Add a script (e.g. `node scripts/seed.js`) that uses the seed data to populate EkadashInfo when needed.

---

## Optional improvements

- **Startup order:** `index.js` calls `serverListen(app)` before `dbConnect()`. If routes depend on DB at first request, consider awaiting DB connection before listening (e.g. `dbConnect()` returning a promise and awaiting it in a small bootstrap).
- **API versioning:** Base path is already `/ekadash_api/v1`; document versioning policy for future v2.
- **Validation:** Consider request validation (e.g. query/body schema) for ekadash and city endpoints.
- **Tests:** Add tests for auth, user, ekadash, and city endpoints using the current server code and no front path imports.
