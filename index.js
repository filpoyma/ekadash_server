import app from './app.js';
import { dbConnect, serverListen } from './connections/connections.config.js';
import cronScheduleInit from './shedule/notifications.shedule.js';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
dayjs.extend(utc);
dayjs.extend(timezone);

serverListen(app);
dbConnect();
cronScheduleInit();
